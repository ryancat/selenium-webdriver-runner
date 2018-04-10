
// testRunner.js
// This file can be used as a nodejs script inside your app.
// The file is separated from the actual app for two reasons:
// 1. It's easier to see just how the test part looks like
// 2. It's easier to add more demo apps

// Node packages
const {spawn} = require('child_process')
const glob = require('glob')
const fs = require('fs')
const path = require('path')

// Third party packages
// const chalk = require('chalk')
const shell = require('shelljs')
const program = require('commander')
const deepmerge = require('deepmerge')

// Selenium related
const {Browser, Builder} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const edge = require('selenium-webdriver/edge')
const firefox = require('selenium-webdriver/firefox')
const ie = require('selenium-webdriver/ie')
const safari = require('selenium-webdriver/safari')

// Self dependencies
const {log, infoLog, warnLog, errorLog} = require('./libs/logUtil')

// Mixins
// const {saucelabsMixin} = require('./mixins/testRunner')
const {mochaMixin, saucelabsMixin, nycMixin} = require('./mixins/forTestRunner')

// Parse progress.argv
program
  .version(require(path.resolve(__dirname, 'package.json')).version)
  .option('-c, --config <path>', 'Test config file path')
  .option('-b, --build-label [label]', 'Test config file path', `${Date.now()}`)
  .option('--no-remote-server', 'Do NOT Run any testing on remote server')
  .option('--use-reporter', 'Use test reporter instead of console output for test results')
  .option('--add-coverage-report', 'Add coverage report along with tests')
  .option('--in-chrome', 'Test with chrome')
  .option('--in-ie', 'Test with ie')
  .option('--in-firefox', 'Test with firefox')
  .option('--in-safari', 'Test with safari')
  .option('--in-all-browser', 'Test with all browser capabilities available')
  .parse(process.argv)

// Util functions
/**
 * Add mixin to instance object
 * 
 * @param {Object} instance 
 * @param {Object} mixinObj 
 */
const addMixin = (instance, mixinObj) => {
  for (let key in mixinObj) {
    if (mixinObj.hasOwnProperty(key)) {
      let val = mixinObj[key]
      if (val !== undefined && instance[key] === undefined) {
        instance[key] = val.bind ? val.bind(instance) : val
      }
    }
  }

  return instance
}

// Constant defaults
// How long we should wait to try start test instance
const TEST_THROTTLE_INTERVAL = 5000

/**
 * The test runner class
 */
class TestRunner {

  constructor (testConfig, options = {}) {
    // Add mixins
    addMixin(this, saucelabsMixin)
    addMixin(this, mochaMixin)
    addMixin(this, nycMixin)

    // Update test config with defaults
    if (!testConfig) {
      // When no test config given by process.argv, we are using
      // the default one ans warn user
      warnLog('No test config file found. Using the default config')
    }

    this.testConfig = Object.assign({}, require('./test.default.config'), testConfig)

    // Need to make sure some important properties are still available
    if (!this.testConfig.saucelabs.forCapabilities) {
      this.testConfig.saucelabs.forCapabilities = []
    }

    // Add program arguments into testConfig
    if (program.inChrome || program.inFirefox || program.inSafari || program.inIe || program.inAllBrowser) {
      const originalCapabilities = this.testConfig.capabilities,
            chromeConfig = Object.assign({ name: 'chrome' }, originalCapabilities.find((cap) => cap.name === 'chrome')),
            firefoxConfig = Object.assign({ name: 'firefox' }, originalCapabilities.find((cap) => cap.name === 'firefox')),
            safariConfig = Object.assign({ name: 'safari' }, originalCapabilities.find((cap) => cap.name === 'safari')),
            ieConfig = Object.assign({ name: 'ie' }, originalCapabilities.find((cap) => cap.name === 'ie'))
      
      this.testConfig.capabilities = []

      if (program.inAllBrowser) {
        this.testConfig.capabilities = [
          chromeConfig,
          firefoxConfig,
          safariConfig,
          ieConfig
        ]
      }
      else {
        if (program.inChrome) {
          this.testConfig.capabilities.push(chromeConfig)
        }
  
        if (program.inFirefox) {
          this.testConfig.capabilities.push(firefoxConfig)
        }
  
        if (program.inSafari) {
          this.testConfig.capabilities.push(safariConfig)
        }
  
        if (program.inIe) {
          this.testConfig.capabilities.push(ieConfig)
        }
      }
    }

    // Overwrite the file paths to based on root directory
    if (!Array.isArray(this.testConfig.specs)) {
      this.testConfig.specs = [this.testConfig.specs]
    }
    this.testConfig.specs = this.testConfig.specs
                          .map((spec) => TestRunner.getAbsPath(spec, this.testConfig.rootDir))
    
    if (this.testConfig.testFramework.reporter
      && this.testConfig.testFramework.reporter.name === 'mocha-junit-reporter'
      && this.testConfig.testFramework.reporter.options 
      && this.testConfig.testFramework.reporter.options.mochaFile) {
      this.testConfig.testFramework.reporter.options.mochaFile = TestRunner.getAbsPath(this.testConfig.testFramework.reporter.options.mochaFile, this.testConfig.rootDir)
    }

    if (this.testConfig.testFramework.coverage
      && this.testConfig.testFramework.coverage.reportDir) {
      this.testConfig.testFramework.coverage.reportDir = TestRunner.getAbsPath(this.testConfig.testFramework.coverage.reportDir, this.testConfig.rootDir)
    }

    this.testConfig.screenshot.baselineDir = TestRunner.getAbsPath(this.testConfig.screenshot.baselineDir, this.testConfig.rootDir)
    this.testConfig.screenshot.diffDir = TestRunner.getAbsPath(this.testConfig.screenshot.diffDir, this.testConfig.rootDir)
    this.testConfig.screenshot.screenshotDir = TestRunner.getAbsPath(this.testConfig.screenshot.screenshotDir, this.testConfig.rootDir)

    log('\n-------------------------')
    log('Execute test with config:')
    log(this.testConfig)
    log('-------------------------\n')

    // The array of concurrent test child processes
    this.testProcesses = []
    // All logs from child processes are surfaced to main process
    this.listenProcess()
  }

  /**
   * Get the absolute path within this project
   */
  static getAbsPath (somePath, rootPath = process.cwd()) {
    return path.resolve(rootPath, somePath)
  }

  /**
   * returns a flatten list of globed files
   *
   * @param  {String[]} filenames  list of files to glob
   * @return {String[]} list of files
   */
  static getFilePaths (patterns, omitWarnings = false) {
    let files = []

    if (typeof patterns === 'string') {
        patterns = [patterns]
    }

    if (!Array.isArray(patterns)) {
        throw new Error('specs or exclude property should be an array of strings')
    }

    for (let pattern of patterns) {
        let filenames = glob.sync(pattern)

        // filenames = filenames.filter(filename => FILE_EXTENSIONS.includes(path.extname(filename)))
        filenames = filenames.map(filename => TestRunner.getAbsPath(filename))

        if (filenames.length === 0 && !omitWarnings) {
          warnLog('pattern', pattern, 'did not match any file')
        }

        files = files.concat(filenames)
    }

    return files
  }

  /**
   * Function that triggers test runner to execute test
   */
  async run () {
    const testConfig = this.testConfig

    this.startTimestamp = Date.now()
    infoLog(`Start test runner at ${new Date(this.startTimestamp)}`)

    // Run test in parallel and bound by maxInstance
    const capabilities = testConfig.capabilities
    const specs = TestRunner.getFilePaths(testConfig.specs)

    if (capabilities.length === 0 || specs.length === 0) {
      // No browser or tests to test for. Do nothing.
      warnLog('No capability or tests to run against.\nPlease configure in test.config.js')
      return await this.processExit(0)
    }

    infoLog(`Will test against capabilities: ${capabilities.map((cap) => cap.name).join(', ')}`)

    if (testConfig.server.isLocal) {
      // Start test environment
      // We are configured to run a local server
      this.startLocalServer()
    }

    // When we need to test app with a local server, we need to
    // create tunnel to remote test environments.
    // Assuming we are using saucelabs.
    // TODO: considering other test environments platform
    const saucelabsCapabilities = testConfig.saucelabs.forCapabilities
    if (saucelabsCapabilities.length
      && capabilities.some((cap) => saucelabsCapabilities.includes(cap.name))) {
      await this.createSauceConnectProcess()
      this.sauceConnectProcess.on('exit', (code) => {
        console.log('sauce connect process exit', code)
      })
    }

    for (let capability of capabilities) {
      // Start a child process for each capability
      if (program.remoteServer && testConfig.saucelabs.forCapabilities.includes(capability.name)) {
        infoLog(`Start test against ${capability.name} remotely`)
        // This capability should run with saucelabs
        // When running on saucelabs, we are creating a session for each capability
        // with each spec, as long as we are within maxInstance limit.
        for (let spec of specs) {
          // Start a child process for test spec
          this.startTestProcessThrottled(capability, [spec])
        }
      }
      else {
        infoLog(`\nStart test against ${capability.name} locally`)
        // When running locally, we can only have the same capability
        // running for all specs due to the limitation of drivers
        this.startTestProcessThrottled(capability, testConfig.specs)
      }
    }
  }

  /**
   * Start the test process with throttle logic
   * 
   * @param {*} args 
   */
  startTestProcessThrottled (...args) {
    const activeProcesses = this.testProcesses.filter((proc) => proc.exitCode === null)
    const {maxInstance} = this.testConfig

    if (activeProcesses.length > maxInstance) {
      // Need to throttle as we are passing maximum allowed test instance number
      setTimeout(() => {
        this.startTestProcessThrottled(...args)
      }, TEST_THROTTLE_INTERVAL)
    }
    else {
      this.startTestProcess(...args)
    }
  }

  /**
   * 
   * @param {Object} capability 
   * @param {Array} specs 
   * @param {Object} options
   */
  startTestProcess (capability, specs) {
    // Prepare for the test environment variables
    // TODO: need to document this
    const capabilityArg = `${capability.name}:${capability.version}:${capability.platform}`.replace(/undefined/g, '')

    let testEnv = {
      // Note: Firefox has issue with undefined version or platform
      TEST_CAPABILITY: capabilityArg,
      // With nyc package, it will look for .nyc_output by default and there is no need to change that
      // See https://istanbul.js.org/docs/advanced/coverage-object-report/
      COVERAGE_REPORT_DIR: TestRunner.getAbsPath('.nyc_output/', this.testConfig.rootDir),
      COVERAGE_FILENAME: 'functional.coverage.[hash].json',
      SCREENSHOT_BASELINE_DIR: this.testConfig.screenshot.baselineDir,
      SCREENSHOT_DIFF_DIR: this.testConfig.screenshot.diffDir,
      SCREENSHOT_DIR: this.testConfig.screenshot.screenshotDir,
      BUILD_LABEL: program.buildLabel
    }

    if (this.testConfig.saucelabs.forCapabilities.includes(capability.name)) {
      // We are testing with saucelabs
      Object.assign(testEnv, {
        USE_SAUCELABS: true,
        SAUCELABS_USER: this.testConfig.saucelabs.user,
        SAUCELABS_APITOKEN: this.testConfig.saucelabs.token
      })
    }

    if (this.testConfig.server) {
      // Passing server information to test framework
      Object.assign(testEnv, {
        TEST_SERVER_PORT: this.testConfig.server.port,
        TEST_SERVER_BASE_URL: this.testConfig.server.baseUrl
      })
    }

    if (program.addCoverageReport) {
      // Passing server information to test framework
      Object.assign(testEnv, {
        ADD_COVERAGE_REPORT: true
      })
    }

    // Running child process with defined test framework
    const testProcess = this.runTestProcess(specs, {
      env: testEnv,
      useReporter: program.useReporter
    })
    testRunner.testProcesses.push(testProcess)
    testProcess.__processLabel = capabilityArg
    this.listenTestProcess(testProcess)

    infoLog('\n-------------------------')
    infoLog(`Running test process [${testProcess.pid}]: ${testProcess.spawnargs.join(' ')}`)
    infoLog('-------------------------\n')
  }

  /**
   * Listen to test process
   * 
   * @param {Child_Process} testProcess 
   */
  listenTestProcess (testProcess) {
    testProcess.stdout.on('data', (data) => {
      if (data.toString().trim()) {
        // Only log non-empty data
        log(`[${testProcess.pid}][${testProcess.__processLabel}] ${data}`)
      }
    })

    testProcess.stderr.on('data', (data) => {
      if (data.toString().trim()) {
        // Only log non-empty data
        errorLog(`[${testProcess.pid}][${testProcess.__processLabel}] ${data}`)
      }
    })

    testProcess.on('exit', (code) => {
      (code === 0 ? infoLog : errorLog)(`[${testProcess.pid}][${testProcess.__processLabel}] process exit with code ${code}`)
      this.exitCode = this.exitCode || code

      // Need to remove this test process from main process
      this.testProcesses.splice(this.testProcesses.indexOf(testProcess), 1)
      
      if (this.testProcesses.length === 0) {
        // If there is no more test processes available, all tests have been finished.
        if (program.addCoverageReport) {
          // Running coverage report with nyc package
          this.startCoverageReportProcess()
        }
        else {
          this.processExit(this.exitCode)
        }
      }
    })
  }

  /**
   * Listen main process events
   */
  listenProcess () {
    process.stdout.on('data', (data) => {
      log(data)
    })

    process.stdout.on('exit', (data) => {
      errorLog(data)
    })

    process
    .on('message', (message) => {
      log(message)
    })
    .on('SIGINT', () => {
      // ctrl+c event
      this.processExit(1, 'Interrupted by user. Some processes may not exit properly.')
    })
    .on('exit', (code, err) => {
      (code === 0 ? infoLog : errorLog)(`Test runner exit with code ${code} in ${Date.now() - this.startTimestamp} ms`)
    })
  }

  async processExit (code, err) {
    // Kill the local server, if there is any
    if (this.serverProcess) {
      process.kill(this.serverProcess.pid)
    }

    if (this.sauceConnectProcess) {
      // Close the sauce connect process
      infoLog('Closing sauce connect...')
      await this.closeSauceConnectProcess()
    }

    if (err) {
      errorLog(err)
    }

    process.exit(code)
  }

  /**
   * Start a local http server
   */
  startLocalServer () {
    const port = this.testConfig.server.port
    infoLog(`Starting local server at port ${port}...`)

    this.serverProcess = spawn(
      `${path.resolve(process.cwd(), 'node_modules/.bin/http-server')} ${this.testConfig.rootDir} -p ${port} --silent`, {
        stdio: 'inherit',
        shell: true,
        // Detach the server process so that it's not affecting current process
        detached: true
      })
  }

  /**
   * Start the nyc test coverage process
   */
  async startCoverageReportProcess () {
    infoLog('Starting coverage report process...')
    
    // 'nyc report --reporter=text --cwd=./demoApps/todoApp/'
    this.runCoverageReportProcess()
    .on('exit', (code) => {
      (code === 0 ? infoLog : errorLog)(`Coverage report process exit with code ${code}`)
      this.exitCode = this.exitCode || code
      this.processExit(this.exitCode)
    })
  }
}

const testRunner = new TestRunner(require(TestRunner.getAbsPath(program.config)))
testRunner.run()

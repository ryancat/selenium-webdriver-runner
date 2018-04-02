
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
const {mochaMixin, saucelabsMixin} = require('./mixins/forTestRunner')

// Parse progress.argv
program
  .version(require(path.resolve(__dirname, 'package.json')).version)
  .option('-c, --config <path>', 'Test config file path')
  .option('--no-saucelabs', 'Do NOT use saucelabs for testing environment')
  .option('--no-coverage', 'Do NOT create coverage report')
  .option('--use-reporter', 'Use test reporter instead of console output for test results')
  .parse(process.argv)

// Get the config file
const testConfig = require(program.config)
const testDefaultConfig = require('./test.default.config')

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

    // Update test config with defaults
    if (!testConfig) {
      // When no test config given by process.argv, we are using
      // the default one ans warn user
      warnLog('No test config file found. Using the default config')
    }

    this.testConfig = Object.assign({}, testDefaultConfig, testConfig)

    // Need to make sure some important properties are still available
    if (!this.testConfig.saucelabs.forCapabilities) {
      this.testConfig.saucelabs.forCapabilities = []
    }

    // Add program arguments into testConfig

    // Overwrite the file paths to based on root directory
    if (!Array.isArray(this.testConfig.specs)) {
      this.testConfig.specs = [this.testConfig.specs]
    }
    this.testConfig.specs = this.testConfig.specs
                          .map((spec) => this.getAbsPath(spec, this.testConfig.rootDir))
    
    this.testConfig.coverage.outputDir = this.getAbsPath(this.testConfig.coverage.outputDir, this.testConfig.rootDir)

    if (this.testConfig.testFramework.reporter
      && this.testConfig.testFramework.reporter.name === 'mocha-junit-reporter'
      && this.testConfig.testFramework.reporter.options 
      && this.testConfig.testFramework.reporter.options.mochaFile) {
      this.testConfig.testFramework.reporter.options.mochaFile = this.getAbsPath(this.testConfig.testFramework.reporter.options.mochaFile, this.testConfig.rootDir)
    }

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
   * Function that triggers test runner to execute test
   */
  async run () {
    const testConfig = this.testConfig

    this.startTimestamp = Date.now()
    infoLog(`Start test runner at ${new Date(this.startTimestamp)}`)

    // Run test in parallel and bound by maxInstance
    const capabilities = testConfig.capabilities
    const specs = this.getFilePaths(testConfig.specs)

    if (capabilities.length === 0 || specs.length === 0) {
      // No browser or tests to test for. Do nothing.
      warnLog('No capability or tests to run against.\nPlease configure in test.config.js')
      process.exit(0)
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
    if (program.saucelabs 
      && saucelabsCapabilities.length
      && capabilities.some((cap) => saucelabsCapabilities.includes(cap))) {
      this.sauceConnectProcess = await this.createSauceConnectProcess()
    }

    for (let capability of capabilities) {
      // Start a child process for each capability
      if (program.saucelabs && testConfig.saucelabs.forCapabilities.includes(capability.name)) {
        infoLog(`Start test against ${capability.name} locally`)
        // This capability should run with saucelabs
        // When running on saucelabs, we are creating a session for each capability
        // with each spec, as long as we are within maxInstance limit.
        for (let spec of specs) {
          // Start a child process for test spec
          this.startTestProcessThrottled(capability, [spec])
        }
      }
      else {
        infoLog(`\nStart test against ${capability.name} remotely`)
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
        this.startTestProcessThrottled(...args);
      }, TEST_THROTTLE_INTERVAL);
    }
    else {
      this.startTestProcess(...args);
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
      TEST_CAPABILITY: capabilityArg
    };

    if (program.saucelabs && this.testConfig.saucelabs.forCapabilities.includes(capability.name)) {
      // We are testing with saucelabs
      Object.assign(testEnv, {
        USE_SAUCELABS: true,
        SAUCELABS_USER: this.testConfig.saucelabs.user,
        SAUCELABS_APITOKEN: this.testConfig.saucelabs.token
      });
    }

    if (this.testConfig.server) {
      // Passing server information to test framework
      Object.assign(testEnv, {
        TEST_SERVER_PORT: this.testConfig.server.port,
        TEST_SERVER_BASE_URL: this.testConfig.server.baseUrl
      });
    }

    if (program.coverage) {
      // Passing coverage report information to test framework
      Object.assign(testEnv, {
        COVERAGE_REPORT_DIR: this.getAbsPath(this.testConfig.coverage.outputDir),
        COVERAGE_FILENAME: this.testConfig.coverage.filename
      });
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
   * Get the absolute path within this project
   */
  getAbsPath (somePath, rootPath = process.cwd()) {
    return path.resolve(rootPath, somePath)
  }

  /**
   * returns a flatten list of globed files
   *
   * @param  {String[]} filenames  list of files to glob
   * @return {String[]} list of files
   */
  getFilePaths (patterns, omitWarnings = false) {
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
        filenames = filenames.map(filename => this.getAbsPath(filename))

        if (filenames.length === 0 && !omitWarnings) {
          warnLog('pattern', pattern, 'did not match any file')
        }

        files = files.concat(filenames);
    }

    return files
  }

  /**
   * Listen to test process
   * 
   * @param {Child_Process} testProcess 
   */
  listenTestProcess (testProcess) {
    testProcess.on('exit', (code) => {
      (code === 0 ? infoLog : errorLog)(`[${testProcess.pid}][${testProcess.__processLabel}] process exit with code ${code}`)
      this.exitCode = this.exitCode || code

      // Need to remove this test process from main process
      this.testProcesses.splice(this.testProcesses.indexOf(testProcess), 1)
      
      // If there is no more test processes available, the main process will exit
      if (this.testProcesses.length === 0) {
        process.exit(this.exitCode)
      }
    })

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
      log(message);
    })
    .on('SIGINT', () => {
      // ctrl+c event
      warnLog('Interrupted by user.')
      process.exit(1)
    })
    .on('exit', async (code, err) => {
      // Kill the local server, if there is any
      if (this.serverProcess) {
        process.kill(this.serverProcess.pid);
      }
      
      if (this.sauceConnectProcess) {
        // Close the sauce connect process
        infoLog('Closing sauce connect...')
        await this.closeSauceConnectProcess()
      }

      // TODO: Kill test processes, if there is any (there shouldn't be any)
      // log(`Tests finish in ${testRunner.getDuration()} ms.`)
      (code === 0 ? infoLog : errorLog)(`Test runner exit with code ${code} in ${Date.now() - this.startTimestamp} ms`)
    });
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
      });
  }

}

const testRunner = new TestRunner(testConfig)
testRunner.run()

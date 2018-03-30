
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
const chalk = require('chalk')
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

// Mixins
const saucelabsMixin = require('./mixins/saucelabsMixin')
const mochaMixin = require('./mixins/mochaMixin')

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
};

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
    if (this.testConfig.specs) {
      if (!Array.isArray(this.testConfig.specs)) {
        this.testConfig.specs = [this.testConfig.specs]
      }

      this.testConfig.specs = this.testConfig.specs
                              .map((spec) => path.resolve(this.testConfig.rootDir, spec))

      this.testConfig.coverage.outputDir = path.resolve(this.testConfig.rootDir, this.testConfig.coverage.outputDir)
    }

    this.infoLog('\n-------------------------')
    this.infoLog('Execute test with config:')
    this.log(this.testConfig)
    this.infoLog('-------------------------\n')

    // The array of concurrent test child processes
    this.testProcesses = []
    // All logs from child processes are surfaced to main process
    this.listenProcess()
  }

  log (...args) {
    console.log(...args)
  } 

  infoLog (...args) {
    console.info(chalk.green(...args))
  }

  warnLog (...args) {
    console.warn(chalk.yellow(...args))
  }

  errorLog (...args) {
    console.error(chalk.red(...args))
  }

  /**
   * Function that triggers test runner to execute test
   */
  async run () {
    const testConfig = this.testConfig

    this.startTimestamp = Date.now()
    this.infoLog(`Start test runner at ${new Date(this.startTimestamp)}`)

    // Run test in parallel and bound by maxInstance
    const capabilities = testConfig.capabilities
    const specs = this.getFilePaths(testConfig.specs)

    if (capabilities.length === 0 || specs.length === 0) {
      // No browser or tests to test for. Do nothing.
      this.warnLog('No capability or tests to run against.\nPlease configure in test.config.js')
      process.exit(0)
    }

    if (testConfig.server.isLocal) {
      // Start test environment
      // We are configured to run a local server
      this.startLocalServer()
    }

    // When we need to test app with a local server, we need to
    // create tunnel to remote test environments.
    // Assuming we are using saucelabs.
    // TODO: considering other test environments platform
    if (program.saucelabs && testConfig.saucelabs.forCapabilities.length) {
      this.sauceConnectProcess = await this.createSauceConnectProcess()
    }

    for (let capability of capabilities) {
      // Start a child process for each capability
      if (program.saucelabs && testConfig.saucelabs.forCapabilities.includes(capability.name)) {
        // This capability should run with saucelabs
        // When running on saucelabs, we are creating a session for each capability
        // with each spec, as long as we are within maxInstance limit.
        for (let spec of specs) {
          // Start a child process for test spec
          this.startTestProcessThrottled(capability, [spec])
        }
      }
      else {
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

    if (this.testConfig.server) {
      // Passing server information to test framework
      Object.assign(testEnv, {
        TEST_SERVER_PORT: this.testConfig.server.port,
        TEST_SERVER_BASE_URL: this.testConfig.server.baseUrl
      });
    }

    if (program.converage) {
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
    this.infoLog(`Running test process: ${testProcess.spawnargs.join(' ')}`)
  }

  /**
   * Get the absolute path within this project
   */
  getAbsPath (somePath) {
    return path.isAbsolute(somePath) ? path.normalize(somePath) : path.resolve(process.cwd(), somePath)
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
          this.warnLog('pattern', pattern, 'did not match any file')
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
      (code === 0 ? this.infoLog : this.errorLog)(`[${testProcess.pid}] process exit with code ${code}`)
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
        this.log(`[${testProcess.pid}][${testProcess.__processLabel}] ${data}`)
      }
    })
  }

  /**
   * Listen main process events
   */
  listenProcess () {
    process.stdout.on('data', (data) => {
      this.log(data)
    })

    process.stdout.on('exit', (data) => {
      this.errorLog(data)
    })

    process
    .on('message', (message) => {
      this.log(message);
    })
    .on('SIGINT', () => {
      // ctrl+c event
      this.warnLog('Interrupted by user.')
      process.exit(1)
    })
    .on('exit', async (code, err) => {
      // Kill the local server, if there is any
      if (this.serverProcess) {
        process.kill(this.serverProcess.pid);
      }
      
      if (this.sauceConnectProcess) {
        // Close the sauce connect process
        this.infoLog('Closing sauce connect...')
        await this.closeSauceConnectProcess()
      }

      // TODO: Kill test processes, if there is any (there shouldn't be any)
      // log(`Tests finish in ${testRunner.getDuration()} ms.`)
      (code === 0 ? infoLog : errorLog)(`Test runner exit with code ${code}.`)
    });
  }

  /**
   * Start a local http server
   */
  startLocalServer () {
    const port = this.testConfig.server.port
    this.infoLog(`Starting local server at port ${port}...`)

    this.serverProcess = spawn(
      `${path.resolve(process.cwd(), 'node_modules/.bin/http-server')} ${this.testConfig.rootDir} -p ${port} --silent`, {
        stdio: 'inherit',
        shell: true,
        // Detach the server process so that it's not affecting current process
        detached: true
      });
  }

}

// Object.assign(TestRunner.prototype, saucelabsMixin)
// Object.assign(TestRunner.prototype, mochaMixin)

const testRunner = new TestRunner(testConfig)
testRunner.run()



// // This is a custom setup for running mocha tests in parallel for aurora
// // Note: We will always using saucelabs to test IE 
// const envUseIe = process.argv.indexOf('--env.ie') !== -1 || process.argv.indexOf('--env.all') !== -1;
// const envUseSaucelabs = process.env.USE_SAUCELABS || envUseIe;
// const envAddJunitReport = process.env.ADD_JUNIT_REPORT;
// const envAddCoverageReport = process.env.ADD_COVERAGE_REPORT;

// const {spawn} = require('child_process');
// const glob = require('glob');
// const fs = require('fs');
// const path = require('path');
// const chalk = require('chalk');

// const shell = require('shelljs');

// const {Browser, Builder} = require('selenium-webdriver');
// // Browser utils
// const chrome = require('selenium-webdriver/chrome');
// const edge = require('selenium-webdriver/edge');
// const firefox = require('selenium-webdriver/firefox');
// const ie = require('selenium-webdriver/ie');
// const safari = require('selenium-webdriver/safari');

// const testConfig = require('../../test.config');
// const saucelabsUtil = require('../utils/saucelabsUtil');
// const driverUtil = require('../utils/driverUtil');

// // Filter for test specs
// // TODO: Move default values into a default config object/file
// const FILE_EXTENSIONS = ['.js'];
// const DEFAULT_SERVER_PORT = 8000;
// const DEFAULT_SERVER_BASE_URL = 'http://localhost';
// const DEFAULT_MAX_INSTANCE = 10;
// const DEFAULT_COVERAGE_OUTPUT_DIR = '.nyc_output/';
// const DEFAULT_COVERAGE_FILENAME = 'coverage.[hash].json';
// const TEST_THROTTLE_INTERVAL = 5000;

// // utils
// function infoLog(msg) { console.info(chalk.green(msg)); }
// function warnLog(msg) { console.warn(chalk.yellow(msg)); }
// function errorLog(msg) { console.warn(chalk.red(msg)); }

// // metrics
// let startTimestamp;

// const testRunner = {

//   // Test processes
//   processes: [],

//   // Server process for the local test environment
//   serverProcess: null,

//   // Start running tests with given config
//   run: (config) => {
//     startTimestamp = Date.now();

//     // Start test environment
//     // In our case, we are running a local static server to host the gallery page
//     if (config.server && config.server.isLocal) {
//       testRunner.startLocalServer(config);
//     }

//     // Run test in parallel
//     testRunner.runInParallel(config);
//   },

//   // Get duration in ms from when test starts
//   getDuration: () => {
//     return Date.now() - startTimestamp;
//   },

//   startLocalServer: (config) => {
//     const port = config.server.port || DEFAULT_SERVER_PORT;
//     infoLog(`Starting local server at port ${port}...`);

//     const serverProcess = spawn(
//       `${path.resolve(process.cwd(), 'node_modules/.bin/http-server')} ${process.cwd()} -p ${port} --silent`, {
//         // TODO: how to preserve colors for child process and the child process identifier?
//         // stdio: 'inherit',
//         shell: true,
//         // Detach the server process so that it's not affecting current process
//         detached: true
//       });

//     serverProcess.stdout.on('data', (data) => console.log(`[local server] LOG: ${data}`));
//     serverProcess.stderr.on('data', (data) => errorLog(`[local server] ERROR: ${data}`));
//     serverProcess.once('exit', (code) => infoLog(`[local server] INFO: Local server has stopped with error code ${code}.`));

//     testRunner.serverProcess = serverProcess;
//   },

//   /**
//    * Get the browsers available for testing on this system.
//    * TODO: this function fails at finding IE and safari drivers! fix before using this;
//    */
//   getAvailableBrowsers: () => {
//     errorLog('testRunner.getAvailableBrowsers fails at finding IE and safari drivers! Need to fix before using this.')
//     return [];

//     infoLog(`Searching for WebDriver executables installed on the current system...`);

//     let targets = [
//       [chrome.locateSynchronously, Browser.CHROME],
//       [edge.locateSynchronously, Browser.EDGE],
//       [firefox.locateSynchronously, Browser.FIREFOX],
//       [ie.locateSynchronously, Browser.IE],
//       [safari.locateSynchronously, Browser.SAFARI],
//     ];

//     let availableBrowsers = [];
//     for (let pair of targets) {
//       const fn = pair[0];
//       const name = pair[1];
//       if (fn()) {
//         infoLog(`... located ${name}`);
//         availableBrowsers.push({name});
//       }
//     }

//     if (availableBrowsers.length === 0) {
//       warnLog(`Unable to locate any WebDriver executables for testing`);
//     }

//     return availableBrowsers;
//   },

//   /**
//    * Get the absolute path within this project
//    */
//   getAbsPath: (somePath) => {
//     return path.isAbsolute(somePath) ? path.normalize(somePath) : path.resolve(process.cwd(), somePath)
//   },

//   /**
//    * returns a flatten list of globed files
//    *
//    * @param  {String[]} filenames  list of files to glob
//    * @return {String[]} list of files
//    */
//   getFilePaths: (patterns, omitWarnings = false) => {
//     let files = []

//     if (typeof patterns === 'string') {
//         patterns = [patterns]
//     }

//     if (!Array.isArray(patterns)) {
//         throw new Error('specs or exclude property should be an array of strings')
//     }

//     for (let pattern of patterns) {
//         let filenames = glob.sync(pattern)

//         filenames = filenames.filter(filename => FILE_EXTENSIONS.includes(path.extname(filename)))
//         filenames = filenames.map(filename => testRunner.getAbsPath(filename))

//         if (filenames.length === 0 && !omitWarnings) {
//             warnLog('pattern', pattern, 'did not match any file')
//         }

//         files = files.concat(filenames);
//     }

//     return files
//   },

//   /**
//    * Run the specs in parallel by spawning new child processes
//    */
//   runInParallel: async (config) => {
//     const capabilities = config.capabilities || [];
//     const specs = testRunner.getFilePaths(config.specs) || [];
//     // const availableBrowsers = testRunner.getAvailableBrowsers();

//     if (capabilities.length === 0 || specs.length === 0) {
//       // No browser or tests to test for. Do nothing.
//       warnLog('No browser or tests to run against.\nPlease configure in test.config.js, or add arguments like "--env.chrome"')
//       process.exit(0);
//     }

//     if (envUseSaucelabs) {
//       infoLog('Starting sauce connect...');
//       await saucelabsUtil.createSauceConnectProcess();
//     }

//     // Log capabilities to be tested
//     infoLog(`Configured to test capabilities: ${capabilities.map((cap) => cap.name).join(', ')}.`)

//     for (let capability of capabilities) {
//       // Start a child process for each capability
//       // if (!availableBrowsers.map((browser) => browser.name).includes(capability.name)) {
//       //   // When the current system has no supporting driver for the
//       //   // browser that configured to be tested, we warn and continue
//       //   warnLog(`Will skip capability: ${capability.name}, as no driver located for it.`);
//       //   continue;
//       // }

//       if (envUseSaucelabs) {
//         // When running on saucelabs, we are creating a session for each capability
//         // with each spec, as long as we are within maxInstance limit.
//         for (let spec of specs) {
//           testRunner.startTestProcessThrottled({
//             config,
//             capability,
//             specs: spec
//           });
//         }
//       }
//       else {
//         // When running locally, we can only have the same capability
//         // running for all specs due to the limitation of drivers
//         testRunner.startTestProcessThrottled({
//           config,
//           capability,
//           specs: config.specs
//         });
//       }
//     }
//   },

//   startTestProcessThrottled: (...args) => {
//     const activeProcesses = testRunner.processes.filter((proc) => proc.exitCode === null);
//     const {maxInstance} = args;

//     if (activeProcesses.length > (maxInstance || DEFAULT_MAX_INSTANCE)) {
//       // Need to throttle as we are passing maximum allowed test instance number
//       setTimeout(() => {
//         testRunner.startTestProcessThrottled(...args);
//       }, TEST_THROTTLE_INTERVAL);
//     }
//     else {
//       testRunner.startTestProcess(...args);
//     }
//   },

//   /**
//    * Start a new child process to run tests
//    */
//   startTestProcess: ({config, capability, specs}) => {
//     let testEnv = {
//       // Note: Firefox has issue with undefined version or platform
//       TEST_CAPABILITY: `${capability.name}:${capability.version}:${capability.platform}`.replace(/undefined/g, '')
//     };

//     if (config.server) {
//       Object.assign(testEnv, {
//         TEST_SERVER_PORT: config.server.port || DEFAULT_SERVER_PORT,
//         TEST_SERVER_BASE_URL: config.server.baseUrl || DEFAULT_SERVER_BASE_URL,
//       });
//     }

//     if (envAddCoverageReport) {
//       Object.assign(testEnv, {
//         COVERAGE_REPORT_DIR: testRunner.getAbsPath(config.coverage ? config.coverage.outputDir : DEFAULT_COVERAGE_OUTPUT_DIR),
//         COVERAGE_FILENAME: config.coverage ? config.coverage.filename : DEFAULT_COVERAGE_FILENAME
//       });
//     }

//     const reporterArgs = testRunner.getTestReporterArgs(config, capability);
//     const mochaProcess = spawn(
//       path.resolve(process.cwd(), 'node_modules/.bin/mocha')
//       + ` ${specs}`
//       + ' --timeout=0'
//       + ` ${reporterArgs}`, {
//         // TODO: how to preserve colors for child process and the child process identifier?
//         // stdio: 'inherit',
//         shell: true,
//         env: Object.assign({}, process.env, testEnv)
//       });
//     infoLog(`Running child process: ${mochaProcess.spawnargs.join(' ')}`);

//     testRunner.listenProcess(mochaProcess, testEnv);
//     testRunner.processes.push(mochaProcess);
//   },

//   getTestReporterArgs: (config, capability) => {
//     if (!config.reporter || !envAddJunitReport) {
//       return '';
//     }

//     let reporterName = config.reporter.name,
//         reporterOptions = '';

//     if (config.reporter.options) {
//       for (let reporterOption in (config.reporter.options || {})) {
//         switch (reporterOption) {
//           case 'mochaFile':
//             reporterOptions += `,${reporterOption}=${testRunner.getAbsPath(config.reporter.options[reporterOption])}`;
//             break;
//           default:
//             reporterOptions += `,${reporterOption}=${config.reporter.options[reporterOption].toString().replace(/\s/g, '_')}`
//         }
//       }

//       // Add capability information into test report
//       reporterOptions = `--reporter-options ${reporterOptions.slice(1)}`;
//     }

//     return `--reporter ${reporterName} ${reporterOptions}`;
//   },

//   /**
//    * Listen to the test process and calling handle functions
//    */
//   listenProcess: (testProcess, testEnv) => {
//     // testProcess.stdout.on('data', testRunner.handleStdoutData.bind(testRunner, testEnv));
//     testProcess.stdout.on('data', (data) => console.log(`[${testProcess.pid}|${testEnv.TEST_CAPABILITY}] ${data}`));
//     testProcess.stderr.on('data', (data) => errorLog(`[${testProcess.pid}|${testEnv.TEST_CAPABILITY}] ERROR: ${data}`));
//     testProcess.once('exit', testRunner.handleExit.bind(testRunner, testProcess, testEnv));
//   },

//   handleExit: async (testProcess, testEnv, code, err) => {
//     console.log(`[${testProcess.pid}|${testEnv.TEST_CAPABILITY}] test exited with code ${code}${err ? ' and error: ' + err : ''}`);

//     if (testRunner.processes.some((proc) => proc.exitCode === null)) {
//       // Some child processes are not finished yet. Do nothing
//       return;
//     }

//     // All child processes are finished
//     if (envUseSaucelabs) {
//       // Need to close saucelabs connection
//       infoLog('Closing sauce connect...');
//       await saucelabsUtil.closeSauceConnectProcess();
//     }

//     process.exit(testRunner.processes.every((proc) => proc.exitCode === 0) ? 0 : 1);
//   }
// };

// testRunner.run(testConfig);

// // Surface child process message
// process
// .on('message', (message) => {
//   console.log(message);
// })
// .on('exit', (code) => {
//   // Kill the local server, if there is any
//   if (testRunner.serverProcess) {
//     process.kill(testRunner.serverProcess.pid);
//   }

//   console.log(`Tests finish in ${testRunner.getDuration()} ms.`)
//   code === 0 ? infoLog('All tests finished successfully!') : errorLog('Something wrong!');
// });

// // Read process arguments
// const ALL_BROWSER_MODE = process.argv.indexOf('--env.all') !== -1,
//       // TODO: debug mode not used. Maybe we can just establish a sauce connection
//       DEBUG_MODE = process.argv.indexOf('--env.debug') !== -1;

// let CHROME_MODE = process.argv.indexOf('--env.chrome') !== -1,
//     FIREFOX_MODE = process.argv.indexOf('--env.firefox') !== -1,
//     IE_MODE = process.argv.indexOf('--env.ie') !== -1,
//     SAFARI_MODE = process.argv.indexOf('--env.safari') !== -1;

// if (ALL_BROWSER_MODE) {
//   CHROME_MODE = true;
//   FIREFOX_MODE = true;
//   IE_MODE = true;
//   SAFARI_MODE = true;
// }

// Configuration for test runner
const config = {
  rootDir: __dirname,

  // Max number of runner instances allowed to run in parallel
  maxInstance: 5,

  // Array of specs file path to run tests
  specs: [
    'tests/*.test.js'
  ],

  testFramework: {
    script: 'mocha',
    reporter: {
      name: 'mocha-junit-reporter',
      options: {
        // Options for mocha-junit-reporter
        // Add hash to mochaFile to handle parallel running reports
        mochaFile: '.reports/junit/test-results.[hash].xml'
      }
    },
    // Test timeout is zero for unlimited timeout
    timeout: 0,
    coverage: {
      reportDir: '.reports/coverage/',
      reporters: ['text', 'html']
    }
  },

  // Config for server that host app to be tested
  server: {
    isLocal: true,
    baseUrl: 'http://localhost',
    port: 8000
  },

  // Target browser environments
  capabilities: [
    { name: 'chrome', version: '65.0', platform: 'Windows 10' },
    { name: 'chrome', version: '64.0', platform: 'Windows 10' },
    { name: 'chrome', version: '48.0', platform: 'Linux' },
    { name: 'chrome', version: '65.0', platform: 'macOS 10.13' },
    { name: 'chrome', version: '64.0', platform: 'macOS 10.13' },
    { name: 'chrome', version: '65.0', platform: 'macOS 10.12' },
    { name: 'chrome', version: '64.0', platform: 'macOS 10.12' },
    { name: 'firefox', version: '59.0', platform: 'Windows 10' },
    { name: 'firefox', version: '58.0', platform: 'Windows 10' },
    { name: 'firefox', version: '45.0', platform: 'Linux' },
    { name: 'firefox', version: '59.0', platform: 'macOS 10.13' },
    { name: 'firefox', version: '58.0', platform: 'macOS 10.13' },
    { name: 'firefox', version: '59.0', platform: 'macOS 10.12' },
    { name: 'firefox', version: '58.0', platform: 'macOS 10.12' },
    // Safari test in version 11.0 has issue start virtual machine
    // { name: 'safari', version: '11.0', platform: 'macOS 10.13' },
    // { name: 'safari', version: '11.0', platform: 'macOS 10.12' },
    { name: 'safari', version: '10.1', platform: 'macOS 10.12' },
    { name: 'internet explorer', version: '10.0', platform: 'Windows 7' },
    { name: 'internet explorer', version: '11.0', platform: 'Windows 7' },
    { name: 'MicrosoftEdge', version: '16.16299', platform: 'Windows 10' },
    { name: 'MicrosoftEdge', version: '14.14393', platform: 'Windows 10' }
  ],

  // Config saucelabs connection
  saucelabs: {
    forCapabilities: ['chrome', 'firefox', 'safari', 'internet explorer', 'MicrosoftEdge'],
    user: process.env.SAUCELABS_USER,
    token: process.env.SAUCELABS_APITOKEN
  },

  // Screenshot for visual regression test
  screenshot: {
    baselineDir: 'tests/baseline/',
    diffDir: '.reports/screenshots/diff/',
    screenshotDir: '.reports/screenshots/shots/'
  },

  // Retry times
  retry: 2,

  // Using headless browser when run test locally
  useHeadlessBrowser: true
};

module.exports = config;
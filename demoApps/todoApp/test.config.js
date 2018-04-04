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
  maxInstance: 10,

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
    { name: 'chrome', /* version: '65', platform: 'MAC' */ },
    { name: 'firefox', /* version: '59', platform: 'MAC' */ },
    { name: 'safari' },
    { name: 'ie' }
  ],

  // Config saucelabs connection
  saucelabs: {
    forCapabilities: ['ie', 'safari'],
    user: process.env.SAUCELABS_USER,
    token: process.env.SAUCELABS_APITOKEN
  },

  // Screenshot for visual regression test
  screenshot: {
    baselineDir: 'tests/baseline/',
    diffDir: '.reports/screenshots/diff/',
    screenshotDir: '.reports/screenshots/shots/'
  }
};

module.exports = config;
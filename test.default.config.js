
// Default configuration for test runner
const config = {
  rootDir: __dirname,

  // Max number of runner instances allowed to run in parallel
  // Configure maxInstance to 1 if the test should be run in order
  maxInstance: 10,

  // Array of specs file path to run tests
  specs: [
    'tests/*.test.js'
  ],

  testFramework: {
    script: 'mocha',
    // The reporter that used other than mocha default.
    // Need to pass in argument --use-reporter to take effect
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
    // { name: 'safari' },
    // { name: 'ie' }
  ],

  // Config saucelabs connection
  saucelabs: {
    forCapabilities: [],
    user: process.env.SAUCELABS_USER,
    token: process.env.SAUCELABS_TOKEN
  },

  // Screenshot for visual regression test
  screenshot: {
    baselineDir: 'tests/baseline/',
    diffDir: '.reports/screenshots/diff/',
    screenshotDir: '.reports/screenshots/shots/'
  }
};

module.exports = config;
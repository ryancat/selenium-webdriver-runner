
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
    script: 'mocha'
  },

  // Config for server that host app to be tested
  server: {
    isLocal: true,
    baseUrl: 'http://localhost',
    port: 8000
  },

  // Config saucelabs connection
  saucelabs: {
    forCapabilities: [],
    user: process.env.SAUCELABS_USER,
    token: process.env.SAUCELABS_TOKEN
  },

  // Target browser environments
  capabilities: [
    { name: 'chrome', /* version: '65', platform: 'MAC' */ },
    { name: 'firefox', /* version: '59', platform: 'MAC' */ },
    // { name: 'safari' },
    // { name: 'ie' }
  ],

  // For coverage report information
  coverage: {
    outputDir: '.nyc_output/',
    filename: 'coverage.[hash].json'
  }
};

module.exports = config;
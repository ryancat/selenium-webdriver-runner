// Mixin for test runner
const {spawn} = require('child_process')
const path = require('path')

module.exports = {
  /**
   * Get the mocha test framework reporter arguments
   */
  getTestReporterArgs: function () {
    let testReporterConfig = this.testConfig.testFramework.reporter
    if (!testReporterConfig) {
      return ''
    }

    let reporterName = testReporterConfig.name,
        reporterOptions = ''

    for (let reporterOption in (testReporterConfig.options || {})) {
      switch (reporterOption) {
        case 'mochaFile':
          reporterOptions += `,${reporterOption}=${this.getAbsPath(testReporterConfig.options[reporterOption])}`
          break;
        default:
          reporterOptions += `,${reporterOption}=${testReporterConfig.options[reporterOption].toString().replace(/\s/g, '_')}`
      }
    }

    // Add capability information into test report
    reporterOptions = `--reporter-options ${reporterOptions.slice(1)}`

    return `--reporter ${reporterName} ${reporterOptions}`;
  },

  /**
   * Run test process against given specs
   * 
   * @param {Array} specs
   * @param {Object} testEnv
   */
  runTestProcess: function (specs = [], options = {}) {
    return spawn(
      path.resolve(process.cwd(), 'node_modules/.bin/mocha')
      + ` ${specs.join(' ')}`
      // Do not have timeout for mocha tests to reduce flakyness
      + ` --timeout=${this.testConfig.testFramework.timeout || 0}`
      + ` ${options.useReporter ? this.getTestReporterArgs() : ''}`, {
        // stdio: 'inherit',
        shell: true,
        env: Object.assign({}, process.env, options.env)
      })
  }
}

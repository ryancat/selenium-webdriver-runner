// Mixin for test runner
const {spawn} = require('child_process')
const path = require('path')

module.exports = {
  /**
   * Get the nyc package coverage report arguments
   */
  getCoverageReportArgs: function () {
    let coverageReportArgs = '',
        coverageReportConfig = this.testConfig.testFramework.coverage

    if (!coverageReportConfig) {
      return ''
    }

    for (let configKey in coverageReportConfig) {
      switch (configKey) {
        case 'reporters':
          for (let reporter of coverageReportConfig.reporters) {
            coverageReportArgs += ` --reporter=${reporter}`
          }
          break
        default:
          coverageReportArgs += ` --${configKey.replace(/[A-Z]/g, (matched) => `-${matched.toLowerCase()}`)}=${coverageReportConfig[configKey].toString().replace(/\s/g, '_')}`
      }
    }

    return coverageReportArgs
  },

  /**
   * Run coverage report with nyc package
   */
  runCoverageReportProcess: function () {
    return spawn(
      `${path.resolve(process.cwd(), 'node_modules/.bin/nyc')} report ${this.getCoverageReportArgs()}`, {
        cwd: this.testConfig.rootDir,
        stdio: 'inherit',
        shell: true
      })
  }
}

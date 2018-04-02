// Assumptions
// process.env.TEST_CAPABILITY: 'browser:version:platform'
// process.env.USE_SAUCELABS: 'true'
// process.env.SAUCELABS_USER: 'someuser'
// process.env.SAUCELABS_APITOKEN: 'sometoken'
// process.env.TEST_SERVER_BASE_URL: 'http://localhost'
// process.env.TEST_SERVER_PORT: '8000'
// process.env.COVERAGE_REPORT_DIR: './.nyc'
// process.env.COVERAGE_FILENAME: 'coverage.[hash].json'

// Nodejs native
const crypto = require('crypto')
const fs = require('fs')

// Thrid party packages
const {Builder, Browser} = require('selenium-webdriver')
const shell = require('shelljs')
const Saucelabs = require('saucelabs')
const saucelabs = new Saucelabs({
  username: process.env.SAUCELABS_USER,
  password: process.env.SAUCELABS_APITOKEN
})

// Self dependencies
const {log, infoLog, warnLog, errorLog} = require('../libs/logUtil')

// Defaults
const DEFAULT_BROWSER_WIDTH = 800
const DEFAULT_BROWSER_HEIGHT = 800

module.exports = {
  /***** Utils *****/
  /**
   * Get the capability based on current test context
   */
  getCapability () {
    let capability = process.env['TEST_CAPABILITY']
    if (!capability) {
      return null
    }

    const parts = capability.split(/:/, 3)
    let name = parts[0]
    if (name === 'ie') {
      name = Browser.IE
    } else if (name === 'edge') {
      name = Browser.EDGE
    }
    let version = parts[1]
    let platform = parts[2]
    return {name, version, platform}
  },

  /***** Driver start/quit *****/
  /**
   * Start a driver with context
   */
  startDriver: async function (browserOptions = {}) {

    const capability = this.getCapability()

    if (!capability) {
      warnLog('No capability to test against.')
      process.exit(0)
    }

    if (process.env.USE_SAUCELABS) {
      this.driver = await this.setupDriverWithSaucelabs(browserOptions)
      return this.driver
    }

    this.driver = await (new Builder())
    .forBrowser(capability.name, capability.version, capability.platform)
    .build()

    await this._setupBrowser(browserOptions)
    return this.driver
  },

  setupDriverWithSaucelabs: async function (browserOptions = {}) {
    let sauceUsername = process.env.SAUCELABS_USER,
        sauceToken = process.env.SAUCELABS_APITOKEN

    if (!sauceUsername || !sauceToken) {
      throw new Error('saucelabs username or token not found in environment variable.\n'
      + 'Please set SAUCELABS_USER and SAUCELABS_APITOKEN.')
    }

    const capability = this.getCapability()

    if (!capability) {
      warnLog('No capability to test against.')
      process.exit(0)
    }

    // Node: at this time sauce connect should be established already
    this.driver = await (new Builder())
    .withCapabilities({
      browserName: capability.name,
      // platform or version could be empty string, but saucelabs doesn't like it
      platform: capability.platform || undefined,
      version: capability.version || undefined,
      username: sauceUsername,
      accessKey: sauceToken
    })
    .usingServer("http://" + sauceUsername + ":" + sauceToken + "@ondemand.saucelabs.com:80/wd/hub")
    .build()

    await this._setupBrowser(browserOptions)
    return this.driver
  },

  /**
   * Quit a driver with context
   */
  quitDriver: async function (testResult = {}) {
    const capability = this.getCapability()

    // TODO: IE has issue generating coverage report json. Need to fix this properly
    if (process.env.ADD_COVERAGE_REPORT && capability.name !== Browser.IE) {
      infoLog('Writing coverage report...')
      // We need to generate coverage report data
      // assume all javascripts are instrumented.
      const coverageObj = await this._getCoverageObj(),
            coverageReportDir = process.env.COVERAGE_REPORT_DIR,
            coverageReportName = process.env.COVERAGE_FILENAME

      if (!shell.test('-e', coverageReportDir)) {
        shell.mkdir('-p', coverageReportDir)
      }

      if (!coverageObj) {
        // No coverage object available. Warn user and do nothing.
        warnLog('Try generating coverage data but it\'s not available. Did you run the instrumented javascript?')
      }
      else {
        const coverageObjStr = JSON.stringify(coverageObj),
              hashed = crypto.createHash('md5').update(coverageObjStr).digest("hex")

        fs.writeFile(`${coverageReportDir}/${coverageReportName.replace(/\[hash\]/g, hashed)}`, coverageObjStr, function (err) {
          if (err) {
            throw err
          }
        })
      }
    }

    // Update test pass status
    const driverSessionId = (await this.driver.getSession()).getId(),
          {isPassed, testName} = testResult

    await new Promise((resolve, reject) => {
      saucelabs.updateJob(driverSessionId, {
        name: testName,
        passed: isPassed
      }, resolve)
    })

    infoLog('Driver will quit.')
    // Quit driver
    return this.driver.quit()
  },

  /***** Browser operations *****/
  /**
   * Open a path based on given base url
   */
  openPath: async function (pathToOpen = '/') {
    await this.driver.get(`${process.env.TEST_SERVER_BASE_URL}:${process.env.TEST_SERVER_PORT}${pathToOpen}`)
  },

  /**
   * Resize test browser with given width and height
   */
  resizeBrowser: async function (width, height) {
    await this.driver.manage().window().setRect({
      width: width || DEFAULT_BROWSER_WIDTH,
      height: height || DEFAULT_BROWSER_HEIGHT
    })
  },

  /***** Private methods *****/
  /**
   * Setup browser before tests with given options
   */
  _setupBrowser: async function (browserOptions = {}) {
    const {width, height} = browserOptions
    await this.resizeBrowser(width, height)
  },

  /**
   * Get the coverage object for coverage report
   */
  _getCoverageObj: async function () {
    return await this.driver.executeScript(function () { return window.__coverage__ })
  }
}
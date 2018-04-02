// Assumptions
// process.env.TEST_CAPABILITY: 'browser:version:platform'
// process.env.USE_SAUCELABS: 'true'
// process.env.SAUCELABS_USER: 'someuser'
// process.env.SAUCELABS_TOKEN: 'sometoken'
const {Builder} = require('selenium-webdriver')

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
        sauceToken = process.env.SAUCELABS_TOKEN

    if (!sauceUsername || !sauceToken) {
      throw new Error('saucelabs username or token not found in environment variable.\n'
      + 'Please set SAUCELABS_USER and SAUCELABS_TOKEN.')
    }

    const capability = driverUtil.getCapability()

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
  quitDriver: function () {
    
  },

  /***** Browser operations *****/
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
  }
}
// const driverUtil = require('../utils/driverUtil');

// const {
//   getScreenshotForCurrentViewport,
//   waitForNotChanged,
//   saveScreenshotFile
// } = require('../utils/screenshotUtil');

// const DEFAULT_SERVER_BASE_URL = 'http://localhost';
// const DEFAULT_SERVER_PORT = '8000';

// const CHECK_PAGE_CHANGE_TIMEOUT = 10000;

const {Browser} = require('selenium-webdriver')

// TODO: How to use pipe runner as a mixin?
module.exports = class BasePage {
  constructor (driver, path) {
    this.driver = driver;
    // The ports sauce labs allowed to connect to localhost are limited.
    // See https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy+FAQS#SauceConnectProxyFAQS-CanIAccessApplicationsonlocalhost?
    this.url = `${process.env.TEST_SERVER_BASE_URL || DEFAULT_SERVER_BASE_URL}:${process.env.TEST_SERVER_PORT || DEFAULT_SERVER_PORT}${path}`;
    this.capability = BasePage.getCapability()
  }

  /**
   * Get capability from environment
   */
  static getCapability () {
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
  }

  /**
   * Open the current page
   */
  async open () {
    await this.driver.get(this.url);
    return this;
  }

  /**
   * Scroll to the top of page
   */
  async scrollToTop () {
    await driverUtil.scrollToTop(this.driver);
    return this;
  }

  /**
   * Scroll to the top of page
   */
  async scrollToButtom () {
    await driverUtil.scrollToButtom(this.driver);
    return this;
  }

  /**
   * Scroll to the top of page
   */
  async scrollToButtomInStep () {
    await driverUtil.scrollToButtom(this.driver, this.waitForWindowNotChanged.bind(this));
    return this;
  }

  /**
   * Scroll to the given position 
   */
  async scrollToPosition (position) {
    await driverUtil.scrollToPosition(this.driver, position);
    return this;
  } 

  /**
   * Scroll to the element by the element css selector
   * 
   * @param {String} selector 
   */
  async scrollToElementBySelector (selector) {
    await driverUtil.scrollToElementBySelector(this.driver, selector);
    return this;
  }

  /**
   * Get the scroll position for current page
   */
  async getScrollPosition () {
    await driverUtil.getScrollPosition(this.driver);
  }

  /**
   * Check if the current window is not changed
   */
  async waitForWindowNotChanged () {
    const isNotChanged = await waitForNotChanged(this.driver, this.getScreenshotData.bind(this), CHECK_PAGE_CHANGE_TIMEOUT);

    if (!isNotChanged) {
      // We are running out retry and still not finish rendering
      throw new Error(`Page is not settle down in ${CHECK_PAGE_CHANGE_TIMEOUT} ms.`);
    }

    return this;
  }

  /**
   * Get screenshot data for current window
   */
  async getScreenshotData (isWaitForWindowNotChanged = false) {
    if (isWaitForWindowNotChanged) {
      // We will need to wait until chart finish renders
      await this.waitForWindowNotChanged();
    }

    await this.driver.sleep(3000);
    return await getScreenshotForCurrentViewport(this.driver);
  }


  // /**
  //  * Function to check for condition.
  //  * The function passed in should return boolean
  //  * 
  //  * @param {Function} fn 
  //  */
  // async waitForCondition (fn = () => true) {
  //   await this.driver.wait(() => {
  //     return new Condition(
  //       'for generic condition',
  //       async fn);
  //   });
  //   return this;
  // }
};
// Assumptions
// process.env.TEST_CAPABILITY: 'browser:version:platform'
// process.env.USE_SAUCELABS: 'true'
// process.env.SAUCELABS_USER: 'someuser'
// process.env.SAUCELABS_APITOKEN: 'sometoken'
// process.env.TEST_SERVER_BASE_URL: 'http://localhost'
// process.env.TEST_SERVER_PORT: '8000'
// process.env.COVERAGE_REPORT_DIR: './.nyc'
// process.env.COVERAGE_FILENAME: 'coverage.[hash].json'
// process.env.BUILD_LABEL: 'some-build-label'
// process.env.USE_HEADLESS_BROWSER: 'true'

// Nodejs native
const crypto = require('crypto')
const path = require('path');
const fs = require('fs')

// Thrid party packages
const {Builder, Browser, Platform, By} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')
const safari = require('selenium-webdriver/safari')
const compareImages = require('resemblejs/compareImages');
const Jimp = require("jimp");
const shell = require('shelljs');
const Saucelabs = require('saucelabs')
const saucelabs = new Saucelabs({
  username: process.env.SAUCELABS_USER,
  password: process.env.SAUCELABS_APITOKEN
})

// Self dependencies
const {log, infoLog, warnLog, errorLog} = require('../libs/logUtil')

// Defaults
const DEFAULT_BROWSER_WIDTH = 900
const DEFAULT_BROWSER_HEIGHT = 900
// TODO: update this part
const BASELINE_PATH = process.env.SCREENSHOT_BASELINE_DIR;
const SCREENSHOT_PATH = process.env.SCREENSHOT_DIR;
const SCREENSHOT_DIFF_PATH = process.env.SCREENSHOT_DIFF_DIR;
const DEFAULT_IMAGE_DIFF_OPTION = {
  output: {
    errorColor: {
      red: 255,
      green: 0,
      blue: 255
    },
    errorType: 'movement',
    transparency: 0.3,
    largeImageThreshold: 1200,
    useCrossOrigin: false,
    outputDiff: true
  },
  scaleToSameSize: true,
  ignore: ['nothing', 'less', 'antialiasing', 'colors', 'alpha'],
};
const DEFAULT_WAIT_TIMEOUT = 10000;
const DEFAULT_WAIT_INTERVAL = 100;

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
    } 
    else if (name === 'edge') {
      name = Browser.EDGE
    }
    let version = parts[1]
    let platform = parts[2]
    if (platform === 'mac') {
      platform = Platform.MAC
    }
    else if (platform === 'window') {
      platform = Platform.WINDOWS
    }
    else if (platform === 'linux') {
      platform = Platform.LINUX
    }
    return {name, version, platform}
  },

  /***** Driver start/quit *****/
  /**
   * Start a driver with context
   */
  startDriver: async function (testInfo = {}) {

    const capability = this.getCapability()

    if (!capability) {
      warnLog('No capability to test against.')
      process.exit(0)
    }

    if (process.env.USE_SAUCELABS) {
      this.driver = await this.setupDriverWithSaucelabs(testInfo)
      return this.driver
    }

    this.driver = await (new Builder())
    .forBrowser(capability.name, capability.version, capability.platform)
    .setChromeOptions(process.env.USE_HEADLESS_BROWSER ? new chrome.Options().headless() : null)
    .setFirefoxOptions(process.env.USE_HEADLESS_BROWSER ? new firefox.Options().headless() : null)
    .build()

    // Make sure we are on the first window handles
    // This is to fix safari nosuchwindowerror. See https://jira2.workday.com/browse/PRISM-16046
    const windowHandles = await this.driver.getAllWindowHandles()
    await this.driver.switchTo().window(windowHandles[0])

    return this.driver
  },

  setupDriverWithSaucelabs: async function (testInfo = {}) {
    let sauceUsername = process.env.SAUCELABS_USER,
        sauceToken = process.env.SAUCELABS_APITOKEN,
        buildLabel = process.env.BUILD_LABEL || `${Date.now()}`

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
      accessKey: sauceToken,
      build: buildLabel
    })
    .setSafariOptions(new safari.Options().setTechnologyPreview(true))
    .usingServer("http://" + sauceUsername + ":" + sauceToken + "@ondemand.saucelabs.com:80/wd/hub")
    .build()

    // Update test name
    const driverSessionId = (await this.driver.getSession()).getId(),
          testName = testInfo.testName

    await new Promise((resolve, reject) => {
      saucelabs.updateJob(driverSessionId, {
        name: testName
      }, resolve)
    })

    infoLog(`Start: ${testName}`)

    // Make sure we are on the first window handles
    // This is to fix safari nosuchwindowerror. See https://jira2.workday.com/browse/PRISM-16046
    const windowHandles = await this.driver.getAllWindowHandles()
    await this.driver.switchTo().window(windowHandles[0])

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
        passed: isPassed
      }, resolve)
    })

    isPassed ? infoLog(`Success: ${testName}`) : errorLog(`Failed: ${testName}`)
    // Quit driver
    return this.driver.quit()
  },

  /***** Screenshot related operations *****/
  // Get the screenshot data for given element and driver
  // TODO: this should be replaced by element.takeScreenshot when it's actually
  // working in saucelabs. See https://github.com/SeleniumHQ/selenium/issues/5136.
  getScreenshotForElement: async function (element) {
    // Store current browser scroll position
    let originalScrollPosition = await this.getScrollPosition(),
        elementRect = await element.getRect();

    if (!elementRect) {
      return '';
    }

    // Virtually scroll to element and take a screenshot, and crop the image
    // to get the element.
    await this.scrollToTop();
    await this.virtualScroll(elementRect.x, elementRect.y);

    let screenshot = await this.driver.takeScreenshot(),
        image = await Jimp.read(new Buffer(screenshot, 'base64')),
        // Retina screen pixel is more dense.
        devicePixelRatio = await this.getDevicePixelRatio();
    // The actual screenshot will have original scrolled part, we need to remove them
    image.crop(0, 0, elementRect.width * devicePixelRatio, elementRect.height * devicePixelRatio);
    
    // Restore the browser to original state
    await this.virtualScroll(0, 0);
    await this.scrollToPosition(originalScrollPosition);

    // Return the cropped image data
    return new Promise((resolve, reject) => {
      image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) {
          reject(err);
        }
        resolve(buffer.toString('base64'));
      });
    });
  },

  /**
   * Get screenshot for the current viewport
   */
  getScreenshotForCurrentViewport: async function () {
    return await this.driver.takeScreenshot();
  },

  /**
   * Get the screenshot diff from two given image data
   */
  getScreenshotDiff: async function (screenshot, baseline, options = DEFAULT_IMAGE_DIFF_OPTION) {
    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    return await compareImages(screenshot, baseline, options);
  },

  /**
   * Get the data diff from two given image file path
   */
  getScreenshotDiffFromFile: async function (screenshotFileName, options = DEFAULT_IMAGE_DIFF_OPTION) {
    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    return await compareImages(
      fs.readFileSync(`${SCREENSHOT_PATH}${screenshotFileName}`),
      fs.readFileSync(`${BASELINE_PATH}${screenshotFileName}`),
      options
    );
  },

  /**
   * Save a baseline file if not exist or forced
   */
  saveBaselineFileIfNotExist: function (baseline, baselineFileName = `${Date.now()}.png`, force = false) {
    // Create baseline directory if not exist
    if (!shell.test('-e', BASELINE_PATH)) {
      shell.mkdir('-p', BASELINE_PATH);
    }
    
    if (shell.test('-e', `${BASELINE_PATH}${baselineFileName}`) && !force) {
      return;
    }

    fs.writeFileSync(`${BASELINE_PATH}${baselineFileName}`, baseline, 'base64', (err) => {
      if (err) {
        throw err;
      }
    });
  },

  /**
   * Save a screenshot file
   */
  saveScreenshotFile: function (screenshot, screenshotFileName) {
    // Create screenshot directory if not exist
    if (!shell.test('-e', SCREENSHOT_PATH)) {
      shell.mkdir('-p', SCREENSHOT_PATH);
    }

    fs.writeFileSync(`${SCREENSHOT_PATH}${screenshotFileName}`, screenshot, 'base64', (err) => {
      if (err) {
        throw err;
      }
    });
  },

  /**
   * Save a screenshot diff file
   */
  saveScreenshotDiffFile: function (screenshotDiff, screenshotDiffFileName) {
    // Create screenshot diff directory if not exist
    if (!shell.test('-e', SCREENSHOT_DIFF_PATH)) {
      shell.mkdir('-p', SCREENSHOT_DIFF_PATH);
    }

    fs.writeFileSync(`${SCREENSHOT_DIFF_PATH}${screenshotDiffFileName}`, screenshotDiff, 'base64', (err) => {
      if (err) {
        throw err;
      }
    });
  },

  /**
   * Get the screenshot name based on environment
   */
  getScreenshotName: async function (testContext) {
    const capability = await this.driver.getCapabilities();
    // The pixel ratio difference matters to the result.
    const devicePixelRatio = await this.getDevicePixelRatio();
    
    return `${testContext.parent.title.replace(/\s/g, '_')}`
    + `-${testContext.title.replace(/\s/g, '_')}` 
    + `-${capability.getBrowserName()}`
    + `-v${capability.getBrowserVersion()}`
    + `-${capability.getPlatform()}`
    + `-dpr${devicePixelRatio}`
    + `-${process.env.USE_SAUCELABS ? 'saucelabs' : 'local'}.png`;
  },

  /**
   * Periodically check screenshot data and see if it's not changed. 
   * Return true if the screenshot is not changed within interval of time
   */
  waitForNotChanged: async function (getScreenshotData, timeout = DEFAULT_WAIT_TIMEOUT, interval = DEFAULT_WAIT_INTERVAL) {
    let duration = 0,
        screenshot = await getScreenshotData(),
        startTime = Date.now();

    while (duration < timeout) {
      await this.driver.sleep(interval);
      let newScreenshot = await getScreenshotData();
      if (newScreenshot === screenshot) {
        break;
      }
      screenshot = newScreenshot;
      duration = Date.now() - startTime;
    }

    if (duration >= timeout) {
      return false;
    }

    return true;
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

  /**
   * Get the browser window size
   */
  getWindowSize: async function () {
    return await this.driver.manage().window().getRect();
  },

  /**
   * Get scroll-able size for browser window
   */
  getWindowScrollSize: async function () {
    return await this.driver.executeScript(function () {
      var documentElement = window.document.documentElement;

      return {
        width: documentElement.scrollWidth,
        height: documentElement.scrollHeight
      };
    });
  },

  /**
   * Scroll to tht top of browser
   * 
   * @param {Function} stepCallback Callback function for stepped scroll
   */
  scrollToTop: async function (stepCallback) {
    if (!stepCallback) {
      await this.driver.executeScript(function () { return window.scrollTo(0, 0); });
    }
    else {
      const windowRect = await this.getWindowSize(),
            stepY = windowRect.height,
            scrollPosition = await this.getScrollPosition();

      let currentY = scrollPosition.y;
      while (currentY > 0) {
        currentY -= stepY;

        const currentPosition = {
          x: 0,
          y: currentY
        }
        await this.scrollToPosition(currentPosition);
        await stepCallback(currentPosition);
      }
    }
  },

  /**
   * Scroll to the buttom of browser
   * 
   * @param {Function} stepCallback Callback function for stepped scroll
   */
  scrollToButtom: async function (stepCallback) {
    const scrollSize = await this.getWindowScrollSize();
    
    if (!stepCallback) {
      await this.driver.executeScript(function (scrollSize) { return window.scrollTo(0, scrollSize.height); }, scrollSize);
    }
    else {
      // If stepCallback is defined, we will scroll in step and trigger the callback
      const windowRect = await this.getWindowSize(),
            stepY = windowRect.height,
            scrollPosition = await this.getScrollPosition();

      let currentY = scrollPosition.y;
      while (currentY + stepY < scrollSize.height) {
        currentY += stepY;

        const currentPosition = {
          x: 0,
          y: currentY
        }
        await this.scrollToPosition(currentPosition);
        await stepCallback(currentPosition);
      }
    }
  },

  /**
   * Scroll page to given position
   */
  scrollToPosition: async function (position) {
    if (!position) {
      return this;
    }

    await this.driver.executeScript(function (pos) {
      // To work around safari issue when scroll to position
      // after virtual scroll, the scroll bar is not restored
      // immediately.
      window.scrollTo(1, 1);
      return window.scrollTo(pos.x, pos.y);
    }, position);
  },

  scrollToElementBySelector: async function (selector) {
    let elementRect = await this.driver.findElement(By.css(selector)).getRect();
    await this.driver.executeScript(function (elementRect) {
      return window.scrollTo(elementRect.x, elementRect.y);
    }, elementRect);
  },

  /**
   * Get the scroll position for current page
   */
  getScrollPosition: async function () {
    return {
      x: await this.driver.executeScript(function () { return window.pageXOffset || window.document.documentElement.scrollLeft; }),
      y: await this.driver.executeScript(function () { return window.pageYOffset || window.document.documentElement.scrollTop; })
    };
  },

  /**
   * Get the pixel ratio for checking high ratio image or normal ratio image
   */
  getDevicePixelRatio: async function () {
    // If use string script the result is wrong (will be always 1).
    // See https://github.com/SeleniumHQ/selenium/issues/5632
    return await this.driver.executeScript(function () { return window.devicePixelRatio || 1; });
  },

  virtualScroll: async function (x = 0, y = 0, scrollPosition = {x: 0, y: 0}) {
    await this.driver.executeScript(
      this.command.virtualScrollCommand, 
      x - scrollPosition.x, 
      y - scrollPosition.y
    );
  },

  /**
   * Click at the given position
   * 
   * actions is NOT working for chromedriver or safaridriver
   * See https://github.com/SeleniumHQ/selenium/issues/5428
   */
  clickAt: async function (position) {
    const {x, y} = position;

    await this.driver.actions()
    .move({ x, y })
    .click()
    .perform();
  },

  /**
   * Click at given element and position
   * 
   * actions is NOT working for chromedriver or safaridriver
   * See https://github.com/SeleniumHQ/selenium/issues/5428
   */
  clickAtElement: async function (element, position) {
    if (!element) {
      console.error('No element provided');
      return;
    }

    if (position) {
      await this.driver.actions()
      .move({
        origin: element,
        x: position.x,
        y: position.y
      })
      .click()
      .perform();
    }
    else {
      await this.driver.actions()
      .click(element)
      .perform();
    }
  },

   /**
   * Check capability utils
   */
  isInSafari: function () { this.getCapability().name === Browser.SAFARI },
  isInChrome: function () { this.getCapability().name === Browser.CHROME },
  isInFirefox: function () { this.getCapability().name === Browser.FIREFOX },
  isInIe: function () { this.getCapability().name === Browser.IE },

  // Custom commands for executeScript
  command: {
    // Virtually move to the position at (x, y)
    virtualScrollCommand: function (x, y) {
      var translate = 'translate(' + -1 * x + 'px,' + -1 * y + 'px)';
      var html = window.document.documentElement;
    
      html.style.webkitTransform = translate;
      html.style.mozTransform = translate;
      html.style.msTransform = translate;
      html.style.oTransform = translate;
      html.style.transform = translate;
    },
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
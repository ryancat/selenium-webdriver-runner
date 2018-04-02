const fs = require('fs');
const crypto = require('crypto');
const shell = require('shelljs');
const {By, Builder, Browser} = require('selenium-webdriver');

const saucelabsUtil = require('./saucelabsUtil');
const Saucelabs = require('saucelabs');
const saucelabs = new Saucelabs({
  username: process.env.SAUCELABS_USER,
  password: process.env.SAUCELABS_APITOKEN
});

const DEFAULT_BROWSER_WIDTH = 900;
const DEFAULT_BROWSER_HEIGHT = 900;

const driverUtil = {
  // Setup browser for all tests
  _setupBrowser: async (driver) => {
    // Setup the browser size to default
    await driverUtil.resizeWindow(driver, DEFAULT_BROWSER_WIDTH, DEFAULT_BROWSER_HEIGHT);
  },

  /**
   * Extracts the browsers for a test suite to target from the `SELENIUM_BROWSER`
   * environment variable.
   */
  getCapabilityToTestFromEnv: () => {
    let browser = process.env['TEST_CAPABILITY'];
    if (!browser) {
      return null;
    }

    const parts = browser.split(/:/, 3);
    let name = parts[0];
    if (name === 'ie') {
      name = Browser.IE;
    } else if (name === 'edge') {
      name = Browser.EDGE;
    }
    let version = parts[1];
    let platform = parts[2];
    return {name, version, platform};
  },

  setupDriver: async (currentTest) => {
    const capability = driverUtil.getCapabilityToTestFromEnv();
    let driver;

    if (!capability) {
      console.log('No capability to test against.');
      process.exit(0);
    }

    // We are not going to test IE on local machine. Try using saucelabs to do it
    if (process.env.USE_SAUCELABS || capability.name === Browser.IE) {
      driver = await driverUtil.setupDriverWithSaucelabs(currentTest);
      return driver;
    }

    driver = await (new Builder())
    .forBrowser(capability.name, capability.version, capability.platform)
    .build();

    await driverUtil._setupBrowser(driver);
    return driver;
  },

  setupDriverWithSaucelabs: async (currentTest) => {
    let sauceUsername = process.env.SAUCELABS_USER,
        sauceApiToken = process.env.SAUCELABS_APITOKEN;

    if (!sauceUsername || !sauceApiToken) {
      throw new Error('saucelabs username or api token not found in environment variable.\n'
      + 'Please set SAUCELABS_USER and SAUCELABS_APITOKEN.');
    }

    const capability = driverUtil.getCapabilityToTestFromEnv();

    if (!capability) {
      console.log('No capability to test against.');
      process.exit(0);
    }

    // Node: at this time sauce connect should be established already
    let driver = await (new Builder())
    .withCapabilities({
      browserName: capability.name,
      // platform or version could be empty string, but saucelabs doesn't like it
      platform: capability.platform || undefined,
      version: capability.version || undefined,
      username: sauceUsername,
      accessKey: sauceApiToken,
      name: `${currentTest.parent.title} | ${currentTest.title}`
    })
    .usingServer("http://" + sauceUsername + ":" + sauceApiToken + "@ondemand.saucelabs.com:80/wd/hub")
    .build();

    await driverUtil._setupBrowser(driver);
    return driver;
  },

  quitDriver: async (driver, testContext) => {
    // console.log(process.env.ADD_COVERAGE_REPORT && capability.name !== Browser.IE);
    // console.log('try to quit driver', process.env.ADD_COVERAGE_REPORT && capability.name !== Browser.IE);
    const capability = driverUtil.getCapabilityToTestFromEnv();

    // TODO: IE has issue generating coverage report json. Need to fix this properly
    if (process.env.ADD_COVERAGE_REPORT && capability.name !== Browser.IE) {
      console.log('Writing coverage report...');
      // We need to generate coverage report data
      // assume all javascripts are instrumented.
      const coverageObj = await driverUtil.getCoverageObj(driver),
            nycOutputPath = process.env.COVERAGE_REPORT_DIR,
            nycFilename = process.env.COVERAGE_FILENAME;

      if (!shell.test('-e', nycOutputPath)) {
        shell.mkdir('-p', nycOutputPath);
      }

      if (!coverageObj) {
        // No coverage object available. Warn user and do nothing.
        console.log('Try generating coverage data but it\'s not available. Did you run the instrumented javascript?');
      }
      else {
        const coverageObjStr = JSON.stringify(coverageObj),
              hashed = crypto.createHash('md5').update(coverageObjStr).digest("hex");

        fs.writeFile(`${nycOutputPath}/${nycFilename.replace(/\[hash\]/g, hashed)}`, coverageObjStr, function (err) {
          if (err) {
            throw err;
          }
        });
      }
    }

    // Update test pass status
    const driverSessionId = (await driver.getSession()).getId();
    await new Promise((resolve, reject) => {
      saucelabs.updateJob(driverSessionId, {
        passed: (testContext.state === 'passed') ? true : false
      }, resolve);
    });

    console.log('Driver will quit.');
    // Quit driver
    return driver.quit();
  },

  /**
   * Resize the browser window
   */
  resizeWindow: async (driver, width, height) => {
    await driver.manage().window().setRect({
      width: width || DEFAULT_BROWSER_WIDTH,
      height: height || DEFAULT_BROWSER_HEIGHT
    });
  },

  /**
   * Get the browser window size
   */
  getWindowSize: async (driver) => {
    return await driver.manage().window().getRect();
  },

  getWindowScrollSize: async (driver) => {
    return await driver.executeScript(function () {
      var documentElement = window.document.documentElement;

      return {
        width: documentElement.scrollWidth,
        height: documentElement.scrollHeight
      };
    });
  },

  /**
   * Scroll to tht top of browser
   */
  scrollToTop: async (driver, inStep = false) => {
    if (!inStep) {
      await driver.executeScript(function () { return window.scrollTo(0, 0); });
    }
    else {
      // If inStep is true, we will scroll in step to make sure we passing all charts
      const windowRect = await driverUtil.getWindowSize(driver),
            stepY = windowRect.height,
            scrollPosition = await driverUtil.getScrollPosition(driver);

      let currentY = scrollPosition.y;
      while (currentY > 0) {
        currentY -= stepY;

        await driverUtil.scrollToPosition(driver, {
          x: 0,
          y: currentY
        });

        await driver.sleep(100);
      }
    }
  },

  scrollToButtom: async (driver, stepCallback) => {
    const scrollSize = await driverUtil.getWindowScrollSize(driver);
    
    if (!stepCallback) {
      await driver.executeScript(function (scrollSize) { return window.scrollTo(0, scrollSize.height); }, scrollSize);
    }
    else {
      // If stepCallback is defined, we will scroll in step and trigger the callback
      const windowRect = await driverUtil.getWindowSize(driver),
            stepY = windowRect.height,
            scrollPosition = await driverUtil.getScrollPosition(driver);

      let currentY = scrollPosition.y;
      while (currentY + stepY < scrollSize.height) {
        currentY += stepY;

        const currentPosition = {
          x: 0,
          y: currentY
        }
        await driverUtil.scrollToPosition(driver, currentPosition);
        await stepCallback(currentPosition);
      }
    }
  },

  /**
   * Scroll page to given position
   */
  scrollToPosition: async (driver, position) => {
    if (!position) {
      return this;
    }

    await driver.executeScript(function (pos) {
      // To work around safari issue when scroll to position
      // after virtual scroll, the scroll bar is not restored
      // immediately.
      window.scrollTo(1, 1);
      return window.scrollTo(pos.x, pos.y);
    }, position);
  },

  scrollToElementBySelector: async (driver, selector) => {
    let elementRect = await driver.findElement(By.css(selector)).getRect();
    await driver.executeScript(function (elementRect) {
      return window.scrollTo(elementRect.x, elementRect.y);
    }, elementRect);
  },

  /**
   * Get the scroll position for current page
   */
  getScrollPosition: async (driver) => {
    return {
      x: await driver.executeScript(function () { return window.pageXOffset || window.document.documentElement.scrollLeft; }),
      y: await driver.executeScript(function () { return window.pageYOffset || window.document.documentElement.scrollTop; })
    };
  },

  /**
   * Get the pixel ratio for checking high ratio image or normal ratio image
   */
  getDevicePixelRatio: async (driver) => {
    // If use string script the result is wrong (will be always 1).
    // See https://github.com/SeleniumHQ/selenium/issues/5632
    return await driver.executeScript(function () { return window.devicePixelRatio || 1; });
  },

  virtualScroll: async (driver, x = 0, y = 0, scrollPosition = {x: 0, y: 0}) => {
    await driver.executeScript(
      driverUtil.command.virtualScrollCommand, 
      x - scrollPosition.x, 
      y - scrollPosition.y
    );
  },

  /**
   * This is assuming the code is instrument and to get the coverage report data
   */
  getCoverageObj: async (driver) => {
    return await driver.executeScript(function () { return window.__coverage__; });
  },

  /**
   * Click at the given position
   * 
   * actions is NOT working for chromedriver or safaridriver
   * See https://github.com/SeleniumHQ/selenium/issues/5428
   */
  clickAt: async (driver, position) => {
    const {x, y} = position;

    await driver.actions()
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
  clickAtElement: async (driver, element, position) => {
    if (!element) {
      console.error('No element provided');
      return;
    }

    if (position) {
      await driver.actions()
      .move({
        origin: element,
        x: position.x,
        y: position.y
      })
      .click()
      .perform();
    }
    else {
      await driver.actions()
      .click(element)
      .perform();
    }
  },

  /**
   * Check capability utils
   */
  checkCapability: {
    isSafari: () => driverUtil.getCapabilityToTestFromEnv().name === Browser.SAFARI,
    isChrome: () => driverUtil.getCapabilityToTestFromEnv().name === Browser.CHROME,
    isFirefox: () => driverUtil.getCapabilityToTestFromEnv().name === Browser.FIREFOX,
    isIe: () => driverUtil.getCapabilityToTestFromEnv().name === Browser.IE,
  },

  // Custom commands
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
  }
};

module.exports = driverUtil;
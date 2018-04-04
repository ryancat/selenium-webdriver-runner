// Mixin for test runner
const sauceConnectLauncher = require('sauce-connect-launcher');
const {log, infoLog, warnLog, errorLog} = require('../libs/logUtil')

module.exports = {
  /**
   * Create a saucelabs connection
   */
  createSauceConnectProcess: async function () {
    if (this.sauceConnectProcess) {
      warnLog("Sauce connect process exists")
      return this.sauceConnectProcess
    }

    infoLog('Starting sauce connect...')

    await new Promise((resolve, reject) => {
      sauceConnectLauncher({
        username: this.testConfig.saucelabs.user,
        accessKey: this.testConfig.saucelabs.token
      }, async (err, sauceConnectProcess) => {
        if (err) {
          errorLog(err.message);
          reject(err);
        }

        infoLog("Sauce connect ready");
        this.sauceConnectProcess = sauceConnectProcess
        resolve(sauceConnectProcess);
      });
    });
  },

  closeSauceConnectProcess: async function () {
    if (!this.sauceConnectProcess) {
      warnLog('No sauce connect process found')
      return
    }

    await new Promise((resolve, reject) => {
      this.sauceConnectProcess.close(function (err) {
        if (err) {
          errorLog(err.message)
          reject(err)
        }
        
        log("Sauce connect process closed")
        this.sauceConnectProcess = null
        resolve(true)
      }); 

      // Closing sauce connect takes long time. Usually we actually don't care 
      // during the build and test time that if the sauce connect is closed. 
      // It will close eventually.
      // Comment this line out if want to wait for close
      resolve(true)
    });
  }
}

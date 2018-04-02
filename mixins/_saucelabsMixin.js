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



// // There should be only one saucelabs connection at all time
// const sauceConnectLauncher = require('sauce-connect-launcher');
// let _sauceConnectProcess;

// const saucelabsUtil = {
//   getSauceConnectProcess: () => {
//     return _sauceConnectProcess;
//   },

//   setSauceConnectProcess: (sauceConnectProcess) => {
//     _sauceConnectProcess = sauceConnectProcess;
//   },

//   isSauceConnectExist: () => {
//     return !!_sauceConnectProcess;
//   },

//   /**
//    * Create a sauce connect process if it hasn't been created
//    */
//   createSauceConnectProcess: async () => {
//     if (saucelabsUtil.isSauceConnectExist()) {
//       console.log("Sauce Connect exists");
//       return saucelabsUtil.getSauceConnectProcess()
//     }

//     return new Promise((resolve, reject) => {
//       sauceConnectLauncher({
//         username: process.env.SAUCELABS_USER,
//         accessKey: process.env.SAUCELABS_APITOKEN
//       }, async (err, sauceConnectProcess) => {
//         if (err) {
//           console.log(err.message);
//           reject(err);
//         }

//         console.log("Sauce Connect ready");
//         saucelabsUtil.setSauceConnectProcess(sauceConnectProcess);
//         resolve(saucelabsUtil.getSauceConnectProcess());
//       });
//     });
//   },

//   /**
//    * Close the current sauce connect process if it exists
//    */
//   closeSauceConnectProcess: async (force = false) => {
//     if (saucelabsUtil.isSauceConnectExist()) {
//       await new Promise((resolve, reject) => {
//         saucelabsUtil.getSauceConnectProcess().close(function (err) {
//           if (err) {
//             console.log(err.message);
//             reject(err);
//           }
          
//           console.log("Closed Sauce Connect process");
//           saucelabsUtil.setSauceConnectProcess(null);
//           resolve(true);
//         }); 

//         // TODO: closing sauce connect takes long time. We actually don't care 
//         // during the build and test time that if the sauce connect is closed. 
//         // It will close eventually.
//         // Comment this out if we actually want to wait.
//         resolve(true);
//       });
//     }
//   }
// };

// module.exports = saucelabsUtil;

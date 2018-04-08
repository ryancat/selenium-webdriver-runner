const sauceConnectLauncher = require('sauce-connect-launcher')

let mySauceConnectProcess
/**
 * Create a saucelabs connection
 */
const createSauceConnectProcess = async function () {
  if (mySauceConnectProcess) {
    console.warn("Sauce connect process exists")
    return mySauceConnectProcess
  }

  console.info('Starting sauce connect...')

  await new Promise((resolve, reject) => {
    sauceConnectLauncher({
      username: process.env.SAUCELABS_USER,
      accessKey: process.env.SAUCELABS_APITOKEN,
      verbose: true
    }, async (err, sauceConnectProcess) => {
      if (err) {
        console.error(err.message)
        reject(err)
      }

      console.info("Sauce connect ready")
      mySauceConnectProcess = sauceConnectProcess
      resolve(sauceConnectProcess)
    })
  })
}

const closeSauceConnectProcess = async function () {
  if (!mySauceConnectProcess) {
    warnLog('No sauce connect process found')
    return
  }

  await new Promise((resolve, reject) => {
    mySauceConnectProcess.close(function (err) {
      if (err) {
        errorLog(err.message)
        reject(err)
      }
      
      log("Sauce connect process closed")
      mySauceConnectProcess = null
      resolve(true)
    }) 

    // Closing sauce connect takes long time. Usually we actually don't care 
    // during the build and test time that if the sauce connect is closed. 
    // It will close eventually.
    // Comment this line out if want to wait for close
    resolve(true)
  })
}

createSauceConnectProcess()

process
.on('SIGINT', () => {
  // ctrl+c event
  console.warn('Interrupted by user.')
  process.exit(1)
})
.on('exit', async function (code) {
  if (mySauceConnectProcess) {
    await closeSauceConnectProcess()
  }
  
  if (code > 0) {
    console.error(`process exit with code ${code}`)
  }
  else {
    console.info(`process exit successfully`)
  }
})
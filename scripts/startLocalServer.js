const {spawn} = require('child_process')
const path = require('path')

let myServerProcess
/**
 * Start a local http server
 */
const startLocalServer = function () {
  const port = 8000
  console.info(`Starting local server at port ${port}...`)

  myServerProcess = spawn(
    `${path.resolve(process.cwd(), 'node_modules/.bin/http-server')} ${process.cwd()} -p ${port}`, {
      stdio: 'inherit',
      shell: true,
      // Detach the server process so that it's not affecting current process
      // detached: true
    })
}

startLocalServer()
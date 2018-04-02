const chalk = require('chalk')

module.exports = {
  log: (...args) => {
    console.log(...args)
  },

  infoLog: (...args) => {
    console.info(chalk.green(...args))
  },

  warnLog: (...args) => {
    console.warn(chalk.yellow(...args))
  },

  errorLog: (...args) => {
    console.error(chalk.red(...args))
  }
}
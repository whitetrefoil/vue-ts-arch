// Karma config file for IDEA use.

const path                   = require('path')
const { config, initialize } = require('../config')

if (config.isInitialized !== true) {
  initialize(path.join(__dirname, '../..'))
}

process.chdir(config.appRoot)

const karmaConfig = require('./coverage-config').karmaConfig

module.exports = function setupKarma(karma) {
  // karmaConfig.logLevel = karma.LOG_DEBUG
  karmaConfig.autoWatch = true
  karmaConfig.singleRun = false
  karma.set(karmaConfig)
}

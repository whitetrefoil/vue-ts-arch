// Karma config file for IDEA use.

const path = require('path')

require('ts-node').register({
  project: path.join(__dirname, '../tsconfig.json'),
  fast   : true,
  cache  : false,
})

const { config, initialize } = require('../config')

if (config.isInitialized !== true) { initialize() }

process.chdir(config.absRoot(''))

const karmaConfig = require('./ut-conf').karmaConfig

module.exports = function setupKarma(karma) {
  // karmaConfig.logLevel = karma.LOG_DEBUG
  karmaConfig.autoWatch = true
  karmaConfig.singleRun = false
  karma.set(karmaConfig)
}

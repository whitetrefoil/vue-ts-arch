// Karma config file for IDEA use.

// TODO: Need to rework when some known issue fixed.
// Refer:
// * [https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/webpack.test.js]()
// * [https://github.com/deepsweet/istanbul-instrumenter-loader/issues/35]()

const path = require('path')

require('ts-node').register({
  project: path.join(__dirname, '../tsconfig.json'),
  fast   : true,
  cache  : false,
})

const { config, initialize } = require('../config')

if (config.isInitialized !== true) { initialize() }

process.chdir(config.absRoot(''))

const karmaConfig = require('./cover-conf').karmaConfig

module.exports = function setupKarma(karma) {
  // karmaConfig.logLevel = karma.LOG_DEBUG
  karmaConfig.autoWatch = true
  karmaConfig.singleRun = false
  karma.set(karmaConfig)
}

// Karma config file for IDEA use.

// TODO: Need to rework when some known issue fixed.
// Refer:
// * [https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/webpack.test.js]()
// * [https://github.com/deepsweet/istanbul-instrumenter-loader/issues/35]()

const path                   = require('path')
const { config, initialize } = require('../config')

if (config.isInitialized !== true) {
  initialize(path.join(__dirname, '../..'))
}

process.chdir(config.appRoot)

const karmaConfig = require('./ut-config').karmaConfig

module.exports = function setupKarma(karma) {
  karmaConfig.autoWatch = true
  karmaConfig.singleRun = false
  karma.set(karmaConfig)
}

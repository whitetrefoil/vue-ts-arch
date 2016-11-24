// Karma config file for IDEA use.

// TODO: Need to rework when some known issue fixed.
// Refer:
// * [https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/webpack.test.js]()
// * [https://github.com/deepsweet/istanbul-instrumenter-loader/issues/35]()

'use strict'

const path = require('path')

require('ts-node').register({
  project: path.join(__dirname, '../../tsconfig.gulp.json'),
  cache: false,
  fast: true,
})

const c = require('../config')
c.initialize(path.join(__dirname, '../..'))
const config = c.config
process.chdir(config.appRoot)

const karmaConfig = require('./ut-config').karmaConfig

module.exports = function setupKarma(karma) {
  karmaConfig.logLevel = karma.LOG_DEBUG
  karmaConfig.autoWatch = true
  karmaConfig.singleRun = false
  karma.set(karmaConfig)
}

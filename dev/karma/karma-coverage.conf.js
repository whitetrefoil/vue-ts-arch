// Karma config file for IDEA use.

'use strict'

const path = require('path')

// require('ts-node').register({
//   project: path.join(__dirname, '../../tsconfig.gulp.json'),
//   cache: false,
//   fast: true,
// })
//
const c = require('../config')
c.initialize(path.join(__dirname, '../..'))
const config = c.config
process.chdir(config.appRoot)

const karmaConfig = require('./coverage-config').karmaConfig

module.exports = function setupKarma(karma) {
  // karmaConfig.logLevel = karma.LOG_DEBUG
  karmaConfig.autoWatch = true
  karmaConfig.singleRun = false
  karma.set(karmaConfig)
}

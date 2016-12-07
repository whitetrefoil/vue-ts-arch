'use strict'

const { config }   = require('../config')
const webpackConfig = require('../webpack/coverage')

module.exports.karmaConfig = {

  basePath: config.appRoot,

  browsers: ['Chrome'],

  colors: true,

  files: [
    { pattern: 'tests/webpack-entry.js', watched: false },
  ],

  frameworks: ['jasmine'],

  preprocessors: {
    'tests/webpack-entry.js': ['webpack', 'sourcemap'],
  },

  reporters: ['junit'],

  junitReporter: {
    outputDir : 'test_results/junit', // results will be saved as $outputDir/$browserName.xml
    outputFile: null, // if included, results will be saved as $outputDir/$browserName/$outputFile
    suite     : '', // suite will become the package name attribute in xml testsuite element
  },

  webpack: webpackConfig,

  plugins: [
    'karma-*',
  ],

  singleRun: true,

  autoWatch: false,
}

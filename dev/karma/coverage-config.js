'use strict'

const { config }   = require('../config')
const webpackConfig = require('../webpack/coverage')

module.exports.karmaConfig = {

  basePath: config.appRoot,

  browsers: ['Chrome'],

  colors: true,

  files: [
    // { pattern: 'src/**/*.(js|ts|map)', included: false, watched: false },
    { pattern: 'tests/webpack-entry.js', watched: false },
  ],

  frameworks: ['jasmine'],

  preprocessors: {
    'tests/webpack-entry.js': ['coverage', 'webpack', 'sourcemap'],
  },

  reporters: ['junit', 'coverage', 'remap-coverage'],

  junitReporter: {
    outputDir : 'test_results/junit', // results will be saved as $outputDir/$browserName.xml
    outputFile: null, // if included, results will be saved as $outputDir/$browserName/$outputFile
    suite     : '', // suite will become the package name attribute in xml testsuite element
  },

  coverageReporter: {
    type: 'in-memory',
  },

  remapCoverageReporter: {
    'text-summary': null,
    'html'        : './test_results/coverage/html',
    'clover'      : './test_results/coverage/clover.xml',
  },

  webpack: webpackConfig,

  plugins: [
    'karma-*',
    'istanbul-instrumenter-loader',
  ],

  singleRun: true,

  autoWatch: false,
}

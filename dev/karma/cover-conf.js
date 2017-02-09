const { config }    = require('../config')
const webpackConfig = require('../webpack/cover')

module.exports.karmaConfig = {

  basePath: config.absRoot(''),

  browsers: ['PhantomJS'],

  colors: true,

  files: [
    { pattern: 'tests/coverage-entry.js', watched: false },
  ],

  frameworks: ['jasmine'],

  preprocessors: {
    'tests/coverage-entry.js': ['webpack', 'sourcemap'],
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

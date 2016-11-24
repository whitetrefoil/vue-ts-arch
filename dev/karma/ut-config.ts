import Karma    = require('karma')
import { config } from '../config'
import testConfig from '../webpack/test'

interface IWebpackKarmaConfig extends Karma.ConfigOptions {
  webpack: any,
}

export const karmaConfig: IWebpackKarmaConfig = <IWebpackKarmaConfig> {

  basePath: config.appRoot,

  browsers: ['Chrome'],

  colors: true,

  files: [
    { pattern: 'src/**/*.(js|ts|map)', included
      : false, watched: false },
    { pattern: 'tests/webpack-entry.js', watched: false },
  ],

  frameworks: ['jasmine'],

  preprocessors: {
    'tests/webpack-entry.js': ['webpack'],
  },

  reporters: ['junit'],

  junitReporter: {
    outputDir : 'test_results/junit', // results will be saved as $outputDir/$browserName.xml
    outputFile: null, // if included, results will be saved as $outputDir/$browserName/$outputFile
    suite     : '', // suite will become the package name attribute in xml testsuite element
  },

  webpack: testConfig,

  singleRun: true,

  autoWatch: false,
}

// See [https://github.com/webpack/karma-webpack]()
// See [https://www.npmjs.com/package/istanbul-instrumenter-loader]()

// Require all sources in order to calculate correct coverage
require('../src/polyfills.ts')
require('../src/vendor.ts')
require('../src/theme.ts')
require('../src/index.ts')

require('./webpack-entry')

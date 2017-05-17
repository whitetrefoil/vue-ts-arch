const LodashPlugin = require('lodash-webpack-plugin')

// Refer to: https://github.com/lodash/lodash-webpack-plugin
const lodashPlugin = new LodashPlugin({
  collections: true,
  guards     : true,
})

module.exports = { lodashPlugin }

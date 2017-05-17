const _                 = require('lodash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { entries }       = require('./entries')

function sortChunks(chunk1, chunk2) {
  const index = _.keys(entries)
  const a     = index.indexOf(chunk1.names[0])
  const b     = index.indexOf(chunk2.names[0])
  return a - b
}

const htmlPages = [
  new HtmlWebpackPlugin({
    filename      : 'index.html',
    template      : './index.pug',
    chunks        : ['polyfills', 'vendor', 'theme', 'index'],
    hash          : false,
    minify        : false,
    inject        : 'body',
    chunksSortMode: sortChunks,
    base          : _.isEmpty(process.env.VUE_ROUTER_BASE)
      ? '/'
      : process.env.VUE_ROUTER_BASE,
  }),
]


module.exports = {
  htmlPages,
}

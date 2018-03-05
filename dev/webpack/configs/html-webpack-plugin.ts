// tslint:disable:no-implicit-dependencies
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as _                 from 'lodash'
import config                 from '../../config'
import entries                from './entries'

function sortChunks(chunk1: HtmlWebpackPlugin.Chunk, chunk2: HtmlWebpackPlugin.Chunk) {
  const index = _.keys(entries)
  const a = index.indexOf(chunk1.names[0])
  const b = index.indexOf(chunk2.names[0])
  return a - b
}

export default new HtmlWebpackPlugin({
  filename      : 'index.html',
  template      : './index.html',
  chunks        : ['theme', 'index'],
  hash          : false,
  minify        : false,
  inject        : 'body',
  chunksSortMode: sortChunks,
  base          : _.isEmpty(config.base)
    ? '/'
    : config.base,
})

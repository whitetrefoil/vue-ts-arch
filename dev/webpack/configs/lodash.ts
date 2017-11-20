// tslint:disable:no-implicit-dependencies
import * as LodashPlugin from 'lodash-webpack-plugin'

// Refer to: https://github.com/lodash/lodash-webpack-plugin
export default new LodashPlugin({
  collections: true,
  guards     : true,
})

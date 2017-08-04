import * as webpack from 'webpack'
import config from '../config'
import entries from './configs/entries'
import htmlPages from './configs/html-webpack-plugin'
import lodashPlugin from './configs/lodash'
import { sassLoader, scssLoader } from './configs/sass'
import { vueLoaderDev } from './configs/vue'

export default {

  devtool: 'source-map',

  context: config.absSource(''),

  entry: entries,

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  output: {
    path: config.absBuilding(''),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id]-[name].chunk.js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.[jt]s$/,
        use: ['source-map-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: ['tslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: ['html-loader?interpolate'],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.vue/,
        use: [vueLoaderDev],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader?sourceMap',
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader?sourceMap&importLoaders=2',
          'resolve-url-loader?sourceMap',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader?sourceMap&importLoaders=2',
          'resolve-url-loader?sourceMap',
          scssLoader,
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        exclude: /weixin/,
        use: ['url-loader'],
      },
      {
        test: /weixin.*\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    // Refer to: https://github.com/lodash/lodash-webpack-plugin
    lodashPlugin,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'theme', 'vendor', 'polyfills'],
    }),
    htmlPages,
  ],

  performance: {
    hints: false,
  },
} as webpack.Configuration

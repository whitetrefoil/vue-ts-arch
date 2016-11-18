import isEmpty = require('lodash/isEmpty')
import { smart } from 'webpack-merge'
import common, { IExtendedHtmlWebpackPluginConfiguration } from './common'

import fs = require('fs-extra')
import HtmlWebpackPlugin = require('html-webpack-plugin')
const babelrc = fs.readJsonSync('.babelrc')

export default <any> smart(common, <any> {
  devtool: 'inline-source-map',

  output: {
    // publicPath   : 'assets',
    filename     : '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  module: {
    loaders: [
      {
        test  : /\.css$/,
        loader: ['style-loader', 'css-loader?sourceMap'],
      },
      {
        test   : /\.sass$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          'sass-loader?config=sassLoader&sourceMap',
        ],
      },
      {
        test   : /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          'sass-loader?config=scssLoader&sourceMap',
        ],
      },
      {
        test  : /\.(?:png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(?:\?\w*)?$/,
        loader: 'url-loader',
      },
    ],
  },

  vue: {
    loaders: {
      sass: 'vue-style-loader'
            + '!css-loader?sourceMap'
            + '!resolve-url-loader?sourceMap'
            + '!sass-loader?config=sassLoader&sourceMap',
      scss: 'vue-style-loader'
            + '!css-loader?sourceMap'
            + '!resolve-url-loader?sourceMap'
            + '!sass-loader?config=scssLoader&sourceMap',
    },
  },

  babel: babelrc,

  plugins: [
    new HtmlWebpackPlugin(<IExtendedHtmlWebpackPluginConfiguration> {
      filename      : 'index.html',
      template      : './src/index.pug',
      chunks        : ['polyfills', 'vendor', 'index'],
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'auto',
      base          : isEmpty(process.env.VUE_ROUTER_BASE)
        ? '/'
        : process.env.VUE_ROUTER_BASE,
    }),
  ],
})

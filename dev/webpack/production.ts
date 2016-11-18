const SIZE_14KB = 14336

import isEmpty = require('lodash/isEmpty')
import ExtractTextPlugin = require('extract-text-webpack-plugin')
import fs = require('fs-extra')
import HtmlWebpackPlugin = require('html-webpack-plugin')
import webpack = require('webpack')
import { smart } from 'webpack-merge'
import common, { IExtendedHtmlWebpackPluginConfiguration } from './common'

const babelrc = fs.readJsonSync('.babelrc')

export default <any> smart(common, <any> {
  output: {
    filename     : '[name]-[hash].js',
    chunkFilename: 'chunks/[name]-[chunkHash].chunk.js',
  },

  module: {
    loaders: [
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader'),
      },
      {
        test  : /\.sass$/,
        loader: ExtractTextPlugin.extract('css-loader!resolve-url-loader!sass-loader?config=sassLoader'),
      },
      {
        test  : /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!resolve-url-loader!sass-loader?config=scssLoader'),
      },
      {
        test   : /\.(?:png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(?:\?\w*)?$/,
        exclude: /weixin/,
        loader : 'url-loader',
        query  : {
          // limit for base64 inlining in bytes
          limit: SIZE_14KB,
          // custom naming format if file is larger than
          // the threshold
          name : 'assets/[hash].[ext]',
        },
      },
      {
        test  : /weixin.*\.(?:png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(?:\?\w*)?$/,
        loader: 'file-loader',
        query : {
          name: 'assets/[hash].[ext]',
        },
      },
    ],
  },

  vue: {
    loaders: {
      js  : 'babel-loader',
      css : ExtractTextPlugin.extract('css-loader'),
      sass: ExtractTextPlugin.extract('css-loader!resolve-url-loader!sass-loader?config=sassLoader'),
      scss: ExtractTextPlugin.extract('css-loader!resolve-url-loader!sass-loader?config=scssLoader'),
    },
  },

  babel: babelrc,

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[name]-[contenthash].css', { allChunks: true }),
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

'use strict'

const path = require('path')
require('ts-node').register({
  project: path.join(__dirname, '../../tsconfig.gulp.json'),
  cache  : false,
  fast   : true,
})
const { initialize } = require('../config')
initialize(path.join(__dirname, '../..'))

const fs         = require('fs-extra')
const webpack    = require('webpack')
const { config } = require('../config')

const babelrc = fs.readJsonSync(config.rootAnd('.babelrc'))

module.exports = {

  verbose: false,

  devtool: 'inline-source-map',

  entry: {
    'webpack-entry': './tests/webpack-entry.js',
  },

  output: {
    path                         : config.rootAnd('.testing'),
    filename                     : '[name].js',
    chunkFilename                : '[name].chunk.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },

  resolve: {
    root              : [
      config.rootAnd('node_modules'),
      config.rootAnd(config.sourceDir),
    ],
    modulesDirectories: [],
    extensions        : ['webpack.ts', 'webpack.js', '.vue', '.ts', '.js', ''],
  },

  resolveLoader: {
    root              : [
      config.rootAnd('node_modules'),
    ],
    modulesDirectories: [],
  },

  module: {
    preLoaders : [
      {
        test   : /\.js/,
        loader : 'source-map-loader',
        exclude: /(node_modules)/,
      },
    ],
    loaders    : [
      {
        test  : /\.vue/,
        loader: 'vue-loader',
      },
      {
        test   : /\.ts$/,
        loader : 'awesome-typescript-loader?tsconfig=tsconfig.json&useCache=false',
        exclude: /(node_modules)/,
      },
      {
        test  : /\.css$/,
        loader: 'null-loader',
      },
      {
        test  : /\.sass$/,
        loader: 'null-loader',
      },
      {
        test  : /\.scss$/,
        loader: 'null-loader',
      },
      {
        test  : /\.(?:png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(?:\?\w*)?$/,
        loader: 'null-loader',
      },
    ],
  },

  vue: {
    loaders: {
      ts  : 'awesome-typescript-loader?tsconfig=tsconfig.json&useCache=false',
      js  : 'babel-loader',
      css : 'null-loader',
      sass: 'null-loader',
      scss: 'null-loader',
    },
  },

  babel: babelrc,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
  ],
}

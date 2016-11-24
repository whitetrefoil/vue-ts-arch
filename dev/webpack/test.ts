const SIZE_14KB = 14336

import { initialize } from '../config'
import path = require('path')
initialize(path.join(__dirname, '../..'))

import isEmpty           = require('lodash/isEmpty')
import ExtractTextPlugin = require('extract-text-webpack-plugin')
import fs                = require('fs-extra')
import HtmlWebpackPlugin = require('html-webpack-plugin')
import webpack           = require('webpack')
import { smart }           from 'webpack-merge'
import { config }          from '../config'
import common              from './common'

const babelrc = fs.readJsonSync(config.rootAnd('.babelrc'))

export default <any> smart(
  common, <any> {
    verbose: true,

    devtool: 'source-map',

    entry: {},

    output: {
      path                         : config.rootAnd('.testing'),
      filename                     : '[name].js',
      chunkFilename                : '[name].chunk.js',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    },

    module: {
      loaders    : [
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
      postLoaders: [
        {
          test   : /\.[jt]s$/,
          exclude: /(node_modules|\/tests\/.*.js)/,
          loader : 'istanbul-instrumenter-loader',
          query  : {
            esModules       : true,
            debug           : false,
            compact         : false,
            preserveComments: true,
            produceSourceMap: false,
          },
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
  },
)

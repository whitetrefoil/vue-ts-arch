const HtmlWebpackPlugin          = require('html-webpack-plugin')
const LodashPlugin               = require('lodash-webpack-plugin')
const isEmpty                    = require('lodash/isEmpty')
const webpack                    = require('webpack')
const { config, initialize }     = require('../config')
const { sassLoader, scssLoader } = require('./configs/sass')
const { vueLoaderDev }           = require('./configs/vue')

if (config.isInitialized !== true) {
  initialize()
}

module.exports = {

  devtool: 'inline-source-map',

  context: config.absSource(''),

  entry: {
    polyfills: ['./polyfills'],
    vendor   : ['./vendor'],
    theme    : ['./theme'],
    index    : ['./index'],
  },

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  output: {
    path         : config.absBuilding(''),
    filename     : '[name].js',
    chunkFilename: '[id]-[name].chunk.js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.[jt]s$/,
        use    : ['source-map-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test   : /\.ts$/,
        use    : ['tslint-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test   : /\.js$/,
        use    : ['eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use : [
          'babel-loader',
          'ts-loader?configFileName=tsconfig.json',
        ],
      },
      {
        test: /\.js$/,
        use : [
          'babel-loader',
        ],
      },
      {
        test: /\.(pug|jade)$/,
        use : [
          'pug-loader',
        ],
      },
      {
        test: /\.vue/,
        use : [
          vueLoaderDev,
        ],
      },
      {
        test: /\.css$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap',
        ],
      },
      {
        test: /\.sass$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          scssLoader,
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : [
          'url-loader',
        ],
      },
    ],
  },

  plugins: [
    new LodashPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'theme', 'vendor', 'polyfills'],
    }),
    new HtmlWebpackPlugin({
      filename      : 'index.html',
      template      : './index.pug',
      chunks        : ['polyfills', 'vendor', 'theme', 'index'],
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'auto',
      base          : isEmpty(process.env.VUE_ROUTER_BASE)
        ? '/'
        : process.env.VUE_ROUTER_BASE,
    }),
  ],
}

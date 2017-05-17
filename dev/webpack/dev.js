const webpack                    = require('webpack')
const { config, initialize }     = require('../config')
const { entries }                = require('./configs/entries')
const { htmlPages }              = require('./configs/html-webpack-plugin')
const { lodashPlugin }           = require('./configs/lodash')
const { sassLoader, scssLoader } = require('./configs/sass')
const { vueLoaderDev }           = require('./configs/vue')

if (config.isInitialized !== true) {
  initialize()
}

module.exports = {

  devtool: 'source-map',

  context: config.absSource(''),

  entry: entries,

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  output: {
    path         : config.absBuilding(''),
    publicPath   : '/',
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
        test: /\.(pug|jade)$/,
        use : ['pug-loader'],
      },
      {
        test   : /\.ts$/,
        exclude: /node_modules/,
        use    : [
          'babel-loader',
          'ts-loader?configFileName=tsconfig.json',
        ],
      },
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        use    : ['babel-loader'],
      },
      {
        test: /\.vue/,
        use : [vueLoaderDev],
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
        test   : /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        exclude: /weixin/,
        use    : ['url-loader'],
      },
      {
        test: /weixin.*\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : ['file-loader'],
      },
    ],
  },

  plugins: [
    // Refer to: https://github.com/lodash/lodash-webpack-plugin
    lodashPlugin,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'theme', 'vendor', 'polyfills'],
    }),
  ]
    .concat(htmlPages),

  performance: {
    hints: false,
  },
}

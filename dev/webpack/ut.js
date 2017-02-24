const path = require('path')

require('ts-node').register({
  project: path.join(__dirname, '../tsconfig.json'),
  fast   : true,
  cache  : false,
})

const webpack                = require('webpack')
const { config, initialize } = require('../config')
const { vueLoaderTest }      = require('./configs/vue')

if (config.isInitialized !== true) {
  initialize()
}

module.exports = {

  devtool: 'inline-source-map',

  context: config.absSource(''),

  // entry: {
  //   'webpack-entry': '../tests/webpack-entry.js',
  // },

  output: {
    filename     : '[name].js',
    chunkFilename: '[id]-[name].chunk.js',
  },

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.[jt]s/,
        use    : ['source-map-loader'],
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
        use : ['babel-loader'],
      },
      {
        test: /\.vue/,
        use : [
          vueLoaderTest,
        ],
      },
      {
        test: /\.css$/,
        use : ['null-loader'],
      },
      {
        test: /\.sass$/,
        use : ['null-loader'],
      },
      {
        test: /\.scss$/,
        use : ['null-loader'],
      },
      {
        test: /\.(?:png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(?:\?\w*)?$/,
        use : ['null-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      context: config.absSource(''),
    }),
  ],

  performance: {
    hints: false,
  },
}

const path = require('path')

require('ts-node').register({
  project: path.join(__dirname, '../tsconfig.json'),
  fast   : true,
  cache  : false,
})

const fs                     = require('fs-extra')
const webpack                = require('webpack')
const { config, initialize } = require('../config')
const { vueLoaderTest }      = require('./configs/vue')
const babelrc                = fs.readJsonSync(path.join(__dirname, '../../tests/.babelrc'))

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
    mainFields: ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
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
        test: /\.(pug|jade)$/,
        use : ['null-loader'],
      },
      {
        test   : /\.ts$/,
        exclude: /node_modules/,
        use    : [
          'awesome-typescript-loader?useBabel&configFileName=tsconfig.json',
        ],
      },
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        use    : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
        ],
      },
      {
        test: /\.vue/,
        use : [vueLoaderTest],
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

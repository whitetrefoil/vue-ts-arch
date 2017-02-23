const path = require('path')

require('ts-node').register({
  project: path.join(__dirname, '../tsconfig.json'),
  fast   : true,
  cache  : false,
})

const webpack                = require('webpack')
const { config, initialize } = require('../config')

if (config.isInitialized !== true) {
  initialize()
}

module.exports = {

  devtool: 'inline-source-map',

  context: config.absSource(''),

  // entry: {
  //   'coverage-entry': '../tests/coverage-entry.js',
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
    rules    : [
      {
        enforce: 'pre',
        test   : /\.[jt]s/,
        loader : 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test  : /\.ts$/,
        loader: 'babel-loader!ts-loader?configFileName=tsconfig.json',
      },
      {
        test  : /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue/,
        use : [
          {
            loader : 'vue-loader',
            options: {
              loaders: {
                ts         : 'babel-loader!ts-loader?configFileName=tsconfig.json',
                css        : 'null-loader',
                sassOptions: 'null-loader',
              },
            },
          },
        ],
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
      {
        enforce: 'post',
        test   : /\.[jt]s$/,
        exclude: /(node_modules|\/tests\/.*\.js)/,
        loader : 'istanbul-instrumenter-loader',
        query  : {
          esModules       : true,
          // debug           : false,
          // compact         : false,
          preserveComments: true,
          produceSourceMap: true,
        },
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

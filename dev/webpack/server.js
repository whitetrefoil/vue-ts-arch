const ExtractTextPlugin      = require('extract-text-webpack-plugin')
const LodashPlugin           = require('lodash-webpack-plugin')
const webpack                = require('webpack')
const { config, initialize } = require('../config')
const { vueLoaderTest }      = require('./configs/vue')

if (config.isInitialized !== true) {
  initialize()
}

const SIZE_14KB = 14336

module.exports = {

  target: 'node',

  context: config.absSource(''),

  entry: {
    polyfills: ['./polyfills'],
    vendor   : ['./vendor'],
    theme    : ['./theme'],
    index    : ['./index-ssr'],
  },

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  output: {
    path         : config.absOutput('ssr'),
    filename     : 'ssr/js/[name].js',
    chunkFilename: 'ssr/js/chunks/[name].chunk.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
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
        test: /\.(pug|jade)$/,
        use : ['null-loader'],
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
        test   : /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        exclude: /weixin/,
        use    : [
          {
            loader : 'url-loader',
            options: {
              // limit for base64 inlining in bytes
              limit: SIZE_14KB,
              // custom naming format if file is larger than
              // the threshold
              name : 'assets/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /weixin.*\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : [{
          loader : 'file-loader',
          options: {
            name: 'assets/[hash].[ext]',
          },
        }],
      },
    ],
  },

  // eslint-disable-next-line global-require
  externals: Object.keys(require('../../package.json').dependencies),

  plugins: [
    new LodashPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename : 'ssr/css/[name]-[contenthash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ENV        : '"server"',
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
  ],
}

const ExtractTextPlugin          = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin          = require('html-webpack-plugin')
const LodashPlugin               = require('lodash-webpack-plugin')
const isEmpty                    = require('lodash/isEmpty')
const webpack                    = require('webpack')
const { config, initialize }     = require('../config')
const { sassLoader, scssLoader } = require('./configs/sass')
const { vueLoaderProd }          = require('./configs/vue')

if (config.isInitialized !== true) {
  initialize()
}

const SIZE_14KB = 14336

module.exports = {

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
    filename     : 'js/[name]-[chunkHash].js',
    chunkFilename: 'js/chunks/[id]-[chunkHash].chunk.js',
  },

  module: {
    rules: [
      {
        test  : /\.ts$/,
        loader: 'babel-loader!ts-loader?configFileName=tsconfig.json',
      },
      {
        test  : /\.js$/,
        loader: 'babel-loader',
      },
      {
        test  : /\.(pug|jade)$/,
        loader: 'pug-loader',
      },
      {
        test: /\.vue/,
        use : [
          vueLoaderProd,
        ],
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract({ use: ['css-loader?minimize&safe'] }),
      },
      {
        test  : /\.sass$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize&safe',
            'resolve-url-loader?keepQuery',
            sassLoader,
          ],
        }),
      },
      {
        test  : /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize&safe',
            'resolve-url-loader?keepQuery',
            scssLoader,
          ],
        }),
      },
      {
        test   : /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        exclude: /weixin/,
        use    : [
          {
            loader: 'url-loader',
            query : {
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
          loader: 'file-loader',
          query : {
            name: 'assets/[hash].[ext]',
          },
        }],
      },
    ],
  },

  plugins: [
    new LodashPlugin(),
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
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename : 'css/[name]-[contenthash].css',
      allChunks: true,
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

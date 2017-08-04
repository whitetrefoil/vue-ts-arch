const ExtractTextPlugin          = require('extract-text-webpack-plugin')
const PrerenderSpaPlugin         = require('prerender-spa-plugin')
const UglifyJsPlugin             = require('uglifyjs-webpack-plugin')
const webpack                    = require('webpack')
const SizeAnalyzerPlugin         = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin
const { config, initialize }     = require('../config')
const { entries }                = require('./configs/entries')
const { htmlPages }              = require('./configs/html-webpack-plugin')
const { lodashPlugin }           = require('./configs/lodash')
const { sassLoader, scssLoader } = require('./configs/sass')
const { vueLoaderProd }          = require('./configs/vue')

if (config.isInitialized !== true) {
  initialize()
}

const SIZE_14KB = 14336

module.exports = {

  context: config.absSource(''),

  entry: entries,

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  output: {
    path         : config.absOutput(''),
    publicPath   : config.base,
    filename     : 'js/[name]-[chunkHash].js',
    chunkFilename: 'js/chunks/[id]-[chunkHash].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.(pug|jade)$/,
        use : ['pug-loader'],
      },
      {
        test   : /\.ts$/,
        exclude: /node_modules/,
        use    : [
          'awesome-typescript-loader?useBabel&configFileName=tsconfig.json&failOnHint',
        ],
      },
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        use    : ['babel-loader'],
      },
      {
        test: /\.vue/,
        use : [vueLoaderProd],
      },
      {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          use: ['css-loader?minimize&safe'],
        }),
      },
      {
        test: /\.sass$/,
        use : ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize&safe',
            'resolve-url-loader?keepQuery',
            sassLoader,
          ],
        }),
      },
      {
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize&safe',
            'resolve-url-loader?keepQuery',
            scssLoader,
          ],
        }),
      },
      {
        test   : /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        exclude: /(weixin)/,
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

  plugins: [
    lodashPlugin,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'theme', 'vendor', 'polyfills'],
    }),
    new SizeAnalyzerPlugin('../test_results/size-report.txt'),
    // new webpack.optimize.UglifyJsPlugin(),
    new UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename : 'css/[name]-[contenthash].css',
      allChunks: true,
    }),
    new PrerenderSpaPlugin(
      config.absOutput(''),
      ['/', '/hello']
    ),
  ]
    .concat(htmlPages),
}

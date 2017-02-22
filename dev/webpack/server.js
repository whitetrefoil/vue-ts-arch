const ExtractTextPlugin      = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin      = require('html-webpack-plugin')
const LodashPlugin           = require('lodash-webpack-plugin')
const isEmpty                = require('lodash/isEmpty')
// const path                   = require('path')
// const PrerenderSpaPlugin     = require('prerender-spa-plugin')
const webpack                = require('webpack')
const { config, initialize } = require('../config')

if (config.isInitialized !== true) {
  initialize()
}

const BOOTSTRAP_REQUIRED_MINIMAL_PRECISION = 8
const SIZE_14KB                            = 14336

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
          {
            loader : 'vue-loader',
            options: {
              autoprefixer: {
                browsers: ['last 2 versions'],
              },
              loaders     : {
                js  : 'babel-loader',
                ts  : 'babel-loader!ts-loader?configFileName=tsconfig.json',
                css : ExtractTextPlugin.extract('css-loader?minimize&safe'),
                sass: ExtractTextPlugin.extract('css-loader?minimize&safe!resolve-url-loader?keepQuery!sass-loader?config=sassLoader'),
                scss: ExtractTextPlugin.extract('css-loader?minimize&safe!resolve-url-loader?keepQuery!sass-loader?config=scssLoader'),
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?minimize&safe'),
      },
      {
        test  : /\.sass$/,
        loader: ExtractTextPlugin.extract('css-loader?minimize&safe!resolve-url-loader?keepQuery!sass-loader?config=sassLoader'),
      },
      {
        test  : /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader?minimize&safe!resolve-url-loader?keepQuery!sass-loader?config=scssLoader'),
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
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
    // new PrerenderSpaPlugin(
    //   path.resolve('../../dist'),
    //   ['/', '/hello'],
    // ),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
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
      inject        : 'head',
      chunksSortMode: 'dependency',
      base          : isEmpty(process.env.VUE_ROUTER_BASE)
        ? '/'
        : process.env.VUE_ROUTER_BASE,
    }),
    new webpack.LoaderOptionsPlugin({
      context: config.absSource(''),

      sassLoader: {
        includePaths  : [config.source('css')],
        indentedSyntax: true,
        outputStyle   : 'compressed',
        precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
      },

      scssLoader: {
        includePaths  : [config.source('css')],
        indentedSyntax: false,
        outputStyle   : 'compressed',
        precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
      },
    }),
  ],
}

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isEmpty           = require('lodash/isEmpty')
const webpack           = require('webpack')
const { config }        = require('../config')

const BOOTSTRAP_REQUIRED_MINIMAL_PRECISION = 8
const SIZE_14KB                            = 14336

module.exports = {

  context: config.rootAnd(config.sourceDir),

  entry: {
    polyfills: ['./polyfills'],
    vendor   : ['./vendor'],
    index    : ['./index'],
  },

  resolve: {
    modules   : [
      config.rootAnd(config.sourceDir),
      'node_modules',
    ],
    extensions: ['.vue', '.ts', '.js', '.json'],
  },

  output: {
    filename     : 'js/[name]-[hash].js',
    chunkFilename: 'js/chunks/[id]-[chunkHash].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use : [
          { loader: 'html-loader' },
        ],
      },
      {
        test: /\.js$/,
        use : [
          {
            loader : 'babel-loader',
            options: {
              cacheDirectory: '.building',
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use : [
          {
            loader : 'babel-loader',
            options: {
              cacheDirectory: '.building',
            },
          },
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.(pug|jade)$/,
        use : [
          { loader: 'pug-loader' },
        ],
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
                js  : 'babel-loader?cacheDirectory=.building',
                ts  : 'babel-loader?cacheDirectory=.building!ts-loader',
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
        use : [
          { loader: ExtractTextPlugin.extract('css-loader?minimize&safe') },
        ],
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css-loader?minimize&safe!resolve-url-loader?keepQuery!sass-loader?config=sassLoader'),
      },
      {
        test: /\.scss$/,
        use : [
          {
            loader: ExtractTextPlugin.extract('css-loader?minimize&safe!resolve-url-loader?keepQuery!sass-loader?config=scssLoader'),
          },
        ],
      },
      {
        test   : /\.(?:png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(?:\?\w*)?$/,
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
        test: /weixin.*\.(?:png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(?:\?\w*)?$/,
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
    // new webpack.SourceMapDevToolPlugin({
    //   filename: null,  // if no value is provided the sourcemap is inlined
    //   test    : /\.(ts|js)($|\?)/i,  // process .js and .ts files only
    // }),
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
      chunks        : ['polyfills', 'vendor', 'index'],
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'auto',
      base          : isEmpty(process.env.VUE_ROUTER_BASE)
        ? '/'
        : process.env.VUE_ROUTER_BASE,
    }),
    new webpack.LoaderOptionsPlugin({
      context: config.rootAnd(config.sourceDir),

      sassLoader: {
        includePaths  : [config.sourceAnd('css')],
        indentedSyntax: true,
        outputStyle   : 'compressed',
        precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
      },

      scssLoader: {
        includePaths  : [config.sourceAnd('css')],
        indentedSyntax: false,
        outputStyle   : 'compressed',
        precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
      },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'vendor', 'polyfills'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
  ],
}

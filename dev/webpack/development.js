const HtmlWebpackPlugin = require('html-webpack-plugin')
const isEmpty           = require('lodash/isEmpty')
const webpack           = require('webpack')
const { config }        = require('../config')

const BOOTSTRAP_REQUIRED_MINIMAL_PRECISION = 8

module.exports = {

  devtool: 'inline-source-map',

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
    // publicPath   : 'assets',
    filename     : '[name].js',
    chunkFilename: '[id]-[name].chunk.js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.(?:js|vue)$/,
        loader : 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test   : /\.ts$/,
        loader : 'tslint-loader',
        exclude: /node_modules/,
      },
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
                ts  : 'babel-loader?cacheDirectory=.building!ts-loader',
                sass: ''
                + 'vue-style-loader'
                + '!css-loader?sourceMap'
                + '!resolve-url-loader?sourceMap'
                + '!sass-loader?config=sassLoader&sourceMap'
                ,
                scss: ''
                + 'vue-style-loader'
                + '!css-loader?sourceMap'
                + '!resolve-url-loader?sourceMap'
                + '!sass-loader?config=scssLoader&sourceMap'
                ,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use : [
          { loader: 'style-loader' },
          {
            loader : 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use : [
          { loader: 'style-loader' },
          {
            loader : 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader : 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader : 'sass-loader',
            options: {
              config   : 'sassLoader',
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use : [
          { loader: 'style-loader' },
          {
            loader : 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader : 'resolve-url-loader',
            options: {
              keepQuery: true,
              sourceMap: true,
            },
          },
          {
            loader : 'sass-loader',
            options: {
              config   : 'scssLoader',
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(?:png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(?:\?\w*)?$/,
        use : [
          { loader: 'url-loader' },
        ],
      },
    ],
  },

  plugins: [
    // new webpack.SourceMapDevToolPlugin({
    //   filename: null,  // if no value is provided the sourcemap is inlined
    //   test    : /\.(ts|js)($|\?)/i,  // process .js and .ts files only
    // }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'vendor', 'polyfills'],
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
        outputStyle   : 'expanded',
        precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
      },

      scssLoader: {
        includePaths  : [config.sourceAnd('css')],
        indentedSyntax: false,
        outputStyle   : 'expanded',
        precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
      },
    }),
  ],
}

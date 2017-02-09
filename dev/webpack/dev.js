const HtmlWebpackPlugin      = require('html-webpack-plugin')
const LodashPlugin           = require('lodash-webpack-plugin')
const isEmpty                = require('lodash/isEmpty')
const webpack                = require('webpack')
const { config, initialize } = require('../config')

if (config.isInitialized !== true) {
  initialize()
}

const BOOTSTRAP_REQUIRED_MINIMAL_PRECISION = 8

module.exports = {

  devtool: 'inline-source-map',

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
    filename     : '[name].js',
    chunkFilename: '[id]-[name].chunk.js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.ts$/,
        loader : 'tslint-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test   : /\.js$/,
        loader : 'eslint-loader',
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
                ts  : 'babel-loader!ts-loader?configFileName=tsconfig.json',
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
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : [
          { loader: 'url-loader' },
        ],
      },
    ],
  },

  plugins: [
    new LodashPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'theme', 'vendor', 'polyfills'],
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
    new webpack.LoaderOptionsPlugin({
      context: config.absSource(''),

      sassLoader: {
        includePaths  : [config.source('css')],
        indentedSyntax: true,
        outputStyle   : 'expanded',
        precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
      },

      scssLoader: {
        includePaths  : [config.source('css')],
        indentedSyntax: false,
        outputStyle   : 'expanded',
        precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
      },
    }),
  ],
}

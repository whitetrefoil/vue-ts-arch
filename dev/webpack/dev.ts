// tslint:disable:no-implicit-dependencies

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin          from 'html-webpack-plugin'
import * as _                     from 'lodash'
import { VueLoaderPlugin }        from 'vue-loader'
import * as webpack               from 'webpack'
import config                     from '../config'
import lodashPlugin               from './configs/lodash'
import { sassLoader, scssLoader } from './configs/sass'

const devConfig: webpack.Configuration = {

  mode: 'development',

  devtool: 'source-map',

  context: config.absSource(''),

  entry: {
    index: ['./polyfills', './index'],
  },

  resolve: {
    extensions : ['.vue', '.ts', '.js', '.json'],
    mainFields : ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', 'main'],
    unsafeCache: false,
  },

  output: {
    path         : config.absBuilding(''),
    publicPath   : '/',
    filename     : '[name].js',
    chunkFilename: '[id]-[name].chunk.js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.[jt]s$/,
        use    : ['source-map-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test   : /\.ts$/,
        use    : ['tslint-loader'],
        exclude: /node_modules/,
      },
      {
        test   : /\.html$/,
        exclude: /node_modules/,
        use    : ['html-loader?interpolate'],
      },
      {
        test   : /\.ts$/,
        exclude: /node_modules/,
        use    : [
          'babel-loader',
          {
            loader : 'ts-loader',
            options: {
              transpileOnly   : true,
              configFile      : config.absRoot('tsconfig.json'),
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test   : /\.js$/,
        use    : ['babel-loader'],
        exclude: (file: string) => (
          /node_modules/.test(file)
          && !/\/@whitetrefoil\//.test(file)
          && !/\.vue\.js/.test(file)
        ),
      },
      {
        test: /\.vue/,
        use : ['vue-loader'],
      },
      {
        test: /\.css$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap&importLoaders=1',
          'postcss-loader?sourceMap',
        ],
      },
      {
        test: /\.sass$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap&importLoaders=3',
          'postcss-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap&importLoaders=3',
          'postcss-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          scssLoader,
        ],
      },
      {
        test   : /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        exclude: /weixin/,
        use    : ['url-loader'],
      },
      {
        test: /weixin.*\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : ['file-loader'],
      },
    ],
  },

  plugins: [
    // Refer to: https://github.com/lodash/lodash-webpack-plugin
    lodashPlugin,
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: config.absRoot('tsconfig.json'),
      vue     : true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new HtmlWebpackPlugin({
      filename      : 'index.html',
      template      : './index.html',
      // chunks        : ['index'],
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'auto',
      base          : _.isEmpty(config.base)
        ? '/'
        : config.base,
    }),
  ],
}

export default devConfig

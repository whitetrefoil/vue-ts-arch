// tslint:disable:no-implicit-dependencies

import ExtractTextPlugin          from 'extract-text-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin          from 'html-webpack-plugin'
import * as _                     from 'lodash'
import * as webpack               from 'webpack'
import { BundleAnalyzerPlugin }   from 'webpack-bundle-analyzer'
import config                     from '../config'
import lodashPlugin               from './configs/lodash'
import { sassLoader, scssLoader } from './configs/sass'
import { vueLoaderProd }          from './configs/vue'

const SIZE_14KB = 14336

const prodConf: webpack.Configuration = {

  mode: 'production',

  context: config.absSource(''),

  entry: {
    index: ['./index'],
  },

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', 'main'],
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
            'css-loader?minimize&safe&importLoaders=2',
            'resolve-url-loader?keepQuery',
            sassLoader,
          ],
        }),
      },
      {
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize&safe&importLoaders=2',
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
        use : [
          {
            loader : 'file-loader',
            options: {
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    lodashPlugin,
    new ForkTsCheckerWebpackPlugin({
      tsconfig: config.absRoot('tsconfig.json'),
      vue     : true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode  : 'static',
      defaultSizes  : 'gzip',
      openAnalyzer  : false,
      reportFilename: '../test_results/bundle-analysis-report.html',
    }),
    new ExtractTextPlugin({
      filename : 'css/[name]-[hash].css',
      allChunks: true,
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

export default prodConf

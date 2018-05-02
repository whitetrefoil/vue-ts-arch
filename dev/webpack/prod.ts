// tslint:disable:no-implicit-dependencies

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin          from 'html-webpack-plugin'
import * as _                     from 'lodash'
import MiniCssExtractPlugin       from 'mini-css-extract-plugin'
import { VueLoaderPlugin }        from 'vue-loader'
import * as webpack               from 'webpack'
import { BundleAnalyzerPlugin }   from 'webpack-bundle-analyzer'
import config                     from '../config'
import lodashPlugin               from './configs/lodash'
import { sassLoader, scssLoader } from './configs/sass'

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
    filename     : 'assets/[name]-[chunkHash].js',
    chunkFilename: 'assets/chunks/[id]-[chunkHash].chunk.js',
  },

  module: {
    rules: [
      {
        test   : /\.html$/,
        exclude: /node_modules/,
        use    : ['html-loader?interpolate'],
      },
      /* See: https://vue-loader.vuejs.org/migrating.html
      {
        test : /\.pug$/,
        oneOf: [
          // this applies to <template lang="pug"> in Vue components
          {
            resourceQuery: /^\?vue/,
            use          : ['pug-plain-loader'],
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader'],
          },
        ],
      },
      */
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
              // appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: (file) => (
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
          MiniCssExtractPlugin.loader,
          'css-loader?minimize&safe&importLoaders=1',
          'postcss-loader',
        ],
      },
      {
        test: /\.sass$/,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader?minimize&safe&importLoaders=3',
          'postcss-loader',
          'resolve-url-loader?keepQuery',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader?minimize&safe&importLoaders=3',
          'postcss-loader',
          'resolve-url-loader?keepQuery',
          scssLoader,
        ],
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
    new BundleAnalyzerPlugin({
      analyzerMode  : 'static',
      defaultSizes  : 'gzip',
      openAnalyzer  : false,
      reportFilename: '../test_results/bundle-analysis-report.html',
    }),
    new MiniCssExtractPlugin({
      filename     : 'assets/[name]-[chunkHash].css',
      chunkFilename: 'assets/chunks/[id]-[chunkHash].chunk.css',
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

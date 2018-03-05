// tslint:disable:no-implicit-dependencies
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as webpack                    from 'webpack'
import config                          from '../config'
import entries                         from './configs/entries'
import htmlPages                       from './configs/html-webpack-plugin'
import lodashPlugin                    from './configs/lodash'
import { sassLoader, scssLoader }      from './configs/sass'
import { vueLoaderDev }                from './configs/vue'

const devConfig: webpack.Configuration = {

  mode: 'development',

  devtool: 'eval-source-map',

  context: config.absSource(''),

  entry: entries,

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', 'main'],
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
        test: /\.vue/,
        use : [vueLoaderDev],
      },
      {
        test: /\.css$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap',
        ],
      },
      {
        test: /\.sass$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap&importLoaders=2',
          'resolve-url-loader?sourceMap',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap&importLoaders=2',
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
    new ForkTsCheckerWebpackPlugin({
      tsconfig: config.absRoot('tsconfig.json'),
      vue: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    htmlPages,
  ],
}

export default devConfig

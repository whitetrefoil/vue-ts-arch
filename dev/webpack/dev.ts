import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as fs                    from 'fs-extra'
import HtmlWebpackPlugin          from 'html-webpack-plugin'
import * as _                     from 'lodash'
import * as path                  from 'path'
import { VueLoaderPlugin }        from 'vue-loader'
import * as webpack               from 'webpack'
import config                     from '../config'
import excludeFor                 from './configs/exclude'
import lodashPlugin               from './configs/lodash'
import { sassLoader, scssLoader } from './configs/sass'


// See https://github.com/vuejs/vue-loader/issues/678#issuecomment-370965224
const babelrc = fs.readJsonSync(path.join(__dirname, '../../.babelrc'))


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
    publicPath   : config.base,
    filename     : '[name].js',
    chunkFilename: '[name].chunk.js',
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
        exclude: excludeFor('ts'),
        use    : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
          {
            loader : 'ts-loader',
            options: {
              transpileOnly: true,
              configFile   : config.absRoot('tsconfig.json'),
            },
          },
        ],
      },
      {
        test   : /\.js$/,
        exclude: excludeFor('babel'),
        use    : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
        ],
      },
      {
        test: /\.vue/,
        use : ['vue-loader'],
      },
      {
        test: /\.css$/,
        use : [
          'vue-style-loader',
          {
            loader : 'css-loader',
            options: {
              sourceMap    : true,
              importLoaders: 1,
            },
          },
          'postcss-loader?sourceMap',
        ],
      },
      {
        test: /\.sass$/,
        use : [
          'vue-style-loader',
          {
            loader : 'css-loader',
            options: {
              sourceMap    : true,
              importLoaders: 3,
            },
          },
          'postcss-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use : [
          'vue-style-loader',
          {
            loader : 'css-loader',
            options: {
              sourceMap    : true,
              importLoaders: 3,
            },
          },
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

  node: {
    __dirname : true,
    __filename: true,
  },

  plugins: [
    // Refer to: https://github.com/lodash/lodash-webpack-plugin
    lodashPlugin,
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: config.absRoot('tsconfig.json'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new HtmlWebpackPlugin({
      filename      : 'index.html',
      template      : './index.html',
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

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as fs                    from 'fs-extra';
import HtmlWebpackPlugin          from 'html-webpack-plugin';
import MiniCssExtractPlugin       from 'mini-css-extract-plugin';
import * as path                  from 'path';
import { VueLoaderPlugin }        from 'vue-loader';
import * as webpack               from 'webpack';
import { BundleAnalyzerPlugin }   from 'webpack-bundle-analyzer';
import config                     from '../config';
import lodashPlugin               from './configs/lodash';
import { sassLoader, scssLoader } from './configs/sass';

const SIZE_14KB = 14336;

// See https://github.com/vuejs/vue-loader/issues/678#issuecomment-370965224
const babelrc = fs.readJsonSync(path.join(__dirname, '../../.babelrc'));


const prodConf: webpack.Configuration = {

  mode: 'production',

  context: config.absSource(''),

  profile: true,

  entry: {
    index: ['./polyfills', './index'],
  },

  resolve: {
    extensions: ['.vue', '.ts', '.es6', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', 'main'],
  },

  output: {
    path         : config.absOutput(config.base),
    publicPath   : '',
    filename     : 'assets/[name]-[hash].js',
    chunkFilename: 'assets/chunks/[id]-[chunkHash].chunk.js',
    globalObject : 'self',
  },

  module: {
    rules: [
      {
        test   : /\.html$/,
        exclude: /node_modules/,
        use    : ['html-loader?interpolate'],
      },
      {
        test: /\.ts$/,
        use : [
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
        test : /\.js$/,
        oneOf: [
          {
            test: /\/esm\/.*\.js$/,
            use : [
              {
                loader : 'babel-loader',
                options: babelrc,
              },
            ],
          },
          {
            include: [
              config.absSource(),
            ],
            use    : [
              {
                loader : 'babel-loader',
                options: babelrc,
              },
            ],
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
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.sass$/,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              importLoaders: 3,
            },
          },
          'postcss-loader',
          'resolve-url-loader?keepQuery',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              importLoaders: 3,
            },
          },
          'postcss-loader',
          'resolve-url-loader?keepQuery',
          scssLoader,
        ],
      },
      {
        test   : /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        exclude: /weixin/,
        use    : [
          {
            loader : 'url-loader',
            options: {
              // limit for base64 inlining in bytes
              limit   : SIZE_14KB,
              // custom naming format if file is larger than
              // the threshold
              name    : '[hash].[ext]',
              fallback: 'file-loader?outputPath=assets&publicPath=./',
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
              name      : 'weixin-[hash].[ext]',
              outputPath: 'assets',
              publicPath: './assets/',
            },
          },
        ],
      },
    ],
  },

  stats: {
    // See: https://github.com/TypeStrong/ts-loader#transpileonly-boolean-defaultfalse
    warningsFilter: /export .* was not found in/,
  },

  node: {
    __dirname : true,
    __filename: true,
  },

  plugins: [
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
    new BundleAnalyzerPlugin({
      analyzerMode  : 'static',
      defaultSizes  : 'gzip',
      openAnalyzer  : false,
      reportFilename: config.absRoot('test_results/bundle-analysis-report.html'),
    }),
    new MiniCssExtractPlugin({
      filename     : 'assets/[name]-[hash].css',
      chunkFilename: 'assets/[name]-[hash]-[id].chunk.css',
    }),
    new HtmlWebpackPlugin({
      filename      : 'index.html',
      template      : './index.html',
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'auto',
    }),
  ],
};

export default prodConf;

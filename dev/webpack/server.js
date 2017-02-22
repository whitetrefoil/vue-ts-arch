const webpack                = require('webpack')
const { config, initialize } = require('../config')

if (config.isInitialized !== true) {
  initialize()
}

const BOOTSTRAP_REQUIRED_MINIMAL_PRECISION = 8
const SIZE_14KB                            = 14336

module.exports = {

  target: 'node',

  context: config.absSource(''),

  entry: {
    polyfills: ['./polyfills'],
    vendor   : ['./vendor'],
    theme    : ['./theme'],
    index    : ['./index-server'],
  },

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  output: {
    filename     : 'ssr/js/[name].js',
    chunkFilename: 'ssr/js/chunks/[name].chunk.js',
    libraryTarget: 'commonjs2',
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
        test: /\.sass$/,
        use : [
          { loader: 'vue-style-loader' },
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
          { loader: 'vue-style-loader' },
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

  // eslint-disable-next-line global-require
  externals: Object.keys(require('../../package.json').dependencies),

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ENV        : '"server"',
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
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

const BOOTSTRAP_REQUIRED_MINIMAL_PRECISION = 8

import webpack = require('webpack')
import { config } from '../config'

export interface IExtendedHtmlWebpackPluginConfiguration {
  title?: string
  filename?: string
  template?: string
  inject?: boolean | 'head' | 'body'
  favicon?: string
  minify?: any
  hash?: boolean
  cache?: boolean
  showErrors?: boolean
  chunks?: string[]
  chunksSortMode?: 'none' | 'auto' | 'dependency' | Function
  excludeChunks?: string[]
  xhtml?: boolean
  base?: string
}

export default <any> {
  entry: {
    polyfills: ['polyfills'],
    vendor   : ['vendor'],
    index    : ['index'],
  },

  resolve: {
    root              : [
      config.rootAnd('node_modules'),
      config.rootAnd(config.sourceDir),
    ],
    modulesDirectories: [],
    extensions        : ['', '.js', '.ts', '.vue'],
  },

  resolveLoader: {
    root              : [
      config.rootAnd('node_modules'),
    ],
    modulesDirectories: [],
  },

  externals: {},

  module: {
    preLoaders: [
      {
        test   : /\.(?:js|vue)$/,
        loader : 'eslint-loader',
        exclude: /(node_modules|vendor)/,
      },
      // {
      //   test   : /\.ts$/,
      //   loader : 'tslint-loader',
      //   exclude: /(node_modules|vendor)/,
      // },
    ],
    loaders   : [
      {
        test  : /\.vue/,
        loader: 'vue-loader',
      },
      {
        test  : /\.html$/,
        loader: 'html-loader',
      },
      {
        test   : /\.js$/,
        loader : 'babel-loader?cacheDirectory=.building',
        exclude: /(node_modules)/,
      },
      {
        test   : /\.ts$/,
        loader : 'awesome-typescript-loader?tsconfig=tsconfig.json',
        exclude: /(node_modules)/,
      },
      {
        test  : /\.(pug|jade)$/,
        loader: 'pug-loader',
      },
      // Use below code if need to handle dependencies among external libraries.
      // ```
      // {
      //   test  : RegExp(path.normalize('/bootstrap-sass/assets/javascripts').replace(/\\/g, '\\\\')),
      //   loader: 'imports?jQuery=jquery',
      // },
      // ```
    ],
  },

  vue: {
    autoprefixer: {
      browsers: ['last 2 versions'],
    },
    loaders     : {
      ts: 'awesome-typescript-loader',
    },
    // esModule: true,
  },

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

  htmlLoader: {
    minimize: false,
  },

  pugLoader: {
    pretty: false,
  },

  resolveUrlLoader: {
    keepQuery: true,
  },

  plugins: [
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
  ],
}

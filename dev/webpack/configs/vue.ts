// tslint:disable:no-implicit-dependencies

import ExtractTextPlugin          from 'extract-text-webpack-plugin'
import config                     from '../../config'
import { sassLoader, scssLoader } from './sass'

export const vueOptionsDev = {
  loaders   : {
    ts: [
      'babel-loader',
      {
        loader : 'ts-loader',
        options: {
          transpileOnly: true,
          configFile   : config.absRoot('tsconfig.json'),
        },
      },
    ],

    sass: [
      'vue-style-loader',
      'css-loader?importLoaders=2',
      'resolve-url-loader',
      sassLoader,
    ],

    scss: [
      'vue-style-loader',
      'css-loader?importLoaders=2',
      'resolve-url-loader',
      scssLoader,
    ],
  },
  preLoaders: {
    ts: 'tslint-loader!source-map-loader',
  },
}

export const vueOptionsProd = {
  loaders: {
    ts: [
      'babel-loader',
      {
        loader : 'ts-loader',
        options: {
          transpileOnly: true,
          configFile   : config.absRoot('tsconfig.json'),
        },
      },
    ],

    css: ExtractTextPlugin.extract({
      use: 'css-loader?minimize&safe',
    }),

    sass: ExtractTextPlugin.extract({
      use: [
        'css-loader?minimize&safe&importLoaders=2',
        'resolve-url-loader?keepQuery',
        sassLoader,
      ],
    }),

    scss: ExtractTextPlugin.extract({
      use: [
        'css-loader?minimize&safe&importLoaders=2',
        'resolve-url-loader?keepQuery',
        scssLoader,
      ],
    }),
  },
}

export const vueLoaderDev = {
  loader : 'vue-loader',
  options: vueOptionsDev,
}

export const vueLoaderProd = {
  loader : 'vue-loader',
  options: vueOptionsProd,
}

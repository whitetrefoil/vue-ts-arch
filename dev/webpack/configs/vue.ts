// tslint:disable:no-implicit-dependencies
import * as ExtractTextPlugin     from 'extract-text-webpack-plugin'
import { sassLoader, scssLoader } from './sass'

export const vueOptionsDev = {
  loaders: {
    ts  : [
      'awesome-typescript-loader',
      'tslint-loader',
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
}

export const vueOptionsProd = {
  loaders: {
    ts: [
      'awesome-typescript-loader?useCache=false',
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

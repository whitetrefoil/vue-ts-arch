const ExtractTextPlugin          = require('extract-text-webpack-plugin')
const { sassLoader, scssLoader } = require('./sass')

const vueOptionsDev = {
  loaders: {
    ts  : [
      'awesome-typescript-loader?useBabel&configFileName=tsconfig.json',
      'tslint-loader',
    ],
    sass: [
      'vue-style-loader',
      'css-loader',
      'resolve-url-loader',
      sassLoader,
    ],
    scss: [
      'vue-style-loader',
      'css-loader',
      'resolve-url-loader',
      scssLoader,
    ],
  },
}

const vueOptionsProd = {
  loaders: {
    ts: [
      'awesome-typescript-loader?useBabel&configFileName=tsconfig.json',
    ],

    css: ExtractTextPlugin.extract({
      use: 'css-loader?minimize&safe',
    }),

    sass: ExtractTextPlugin.extract({
      use: [
        'css-loader?minimize&safe',
        'resolve-url-loader?keepQuery',
        sassLoader,
      ],
    }),

    scss: ExtractTextPlugin.extract({
      use: [
        'css-loader?minimize&safe',
        'resolve-url-loader?keepQuery',
        scssLoader,
      ],
    }),
  },
}

const vueLoaderDev = {
  loader : 'vue-loader',
  options: vueOptionsDev,
}

const vueLoaderProd = {
  loader : 'vue-loader',
  options: vueOptionsProd,
}

module.exports = {
  vueOptionsDev,
  vueOptionsProd,
  vueLoaderDev,
  vueLoaderProd,
}
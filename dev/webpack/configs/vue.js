const ExtractTextPlugin          = require('extract-text-webpack-plugin')
const { sassLoader, scssLoader } = require('./sass')

const vueOptionsDev = {
  loaders: {
    ts  : [
      'babel-loader',
      'ts-loader?configFileName=tsconfig.json',
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
      'babel-loader',
      'ts-loader?configFileName=tsconfig.json',
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

const vueOptionsTest = {
  loaders: {
    ts  : [
      'babel-loader',
      'ts-loader?configFileName=tsconfig.json',
    ],
    css : 'null-loader',
    sass: 'null-loader',
    scss: 'null-loader',
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

const vueLoaderTest = {
  loader : 'vue-loader',
  options: vueOptionsTest,
}

module.exports = {
  vueOptionsDev,
  vueOptionsProd,
  vueOptionsTest,
  vueLoaderDev,
  vueLoaderProd,
  vueLoaderTest,
}

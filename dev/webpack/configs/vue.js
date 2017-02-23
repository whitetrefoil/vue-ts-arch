const ExtractTextPlugin          = require('extract-text-webpack-plugin')
const { sassLoader, scssLoader } = require('./sass')

const vueOptionsDev = {
  autoprefixer: {
    browsers: ['last 2 versions'],
  },
  loaders     : {
    ts  : [
      'babel-loader',
      'ts-loader?configFileName=tsconfig.json',
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
  autoprefixer: {
    browsers: ['last 2 versions'],
  },
  loaders     : {
    ts: [
      'babel-loader',
      'ts-loader?configFileName=tsconfig.json',
    ],

    css: ExtractTextPlugin.extract({
      use: 'css-loader?minimize&safe',
    }),

    sassOptions: ExtractTextPlugin.extract({
      use: [
        'css-loader?minimize&safe',
        'resolve-url-loader?keepQuery',
        sassLoader,
      ],
    }),

    scssOptions: ExtractTextPlugin.extract({
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

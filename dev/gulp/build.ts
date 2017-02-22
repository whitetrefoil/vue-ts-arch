import { config }     from '../config'
const del           = require('del')
const gulp          = require('gulp')
const merge         = require('merge-stream')
const webpack       = require('webpack')
const webpackStream = require('webpack-stream')
const devConfig     = require('../webpack/dev')
const prodConfig    = require('../webpack/prod')
const ssrConfig     = require('../webpack/server')

gulp.task('build', (): PromiseLike<any> => {

  const webpackConfig = process.env.NODE_ENV === 'development'
    ? devConfig
    : ssrConfig
    // : [prodConfig, ssrConfig]

  return del([config.outputByEnv('')])
    .then((): NodeJS.ReadWriteStream => {
      return merge(
        gulp.src(config.source('*.[jt]s'))
          .pipe(webpackStream(webpackConfig, webpack)),
        gulp.src(config.source('*.html')),
      ).pipe(gulp.dest(config.outputByEnv('')))
    })
})

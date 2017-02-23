import { config }     from '../config'
const del           = require('del')
const gulp          = require('gulp')
const merge         = require('merge-stream')
const webpack       = require('webpack')
const webpackStream = require('webpack-stream')
const devConfig     = require('../webpack/dev')
const prodConfig    = require('../webpack/prod')
const ssrConfig     = require('../webpack/server')

gulp.task('build', (): Promise<any> => {

  const webpackConfig = process.env.NODE_ENV === 'development'
    ? devConfig
    // : ssrConfig
    : prodConfig

  return del([config.outputByEnv('')])
    .then((): NodeJS.ReadWriteStream => {
      // return merge(
      //   gulp.src(config.source('*.[jt]s'))
      //     .pipe(webpackStream(webpackConfig, webpack))
      //     .pipe(gulp.dest(config.outputByEnv(''))),
      //   gulp.src(config.source('*.html'))
      //     .pipe(gulp.dest(config.outputByEnv(''))),
      // )
      return gulp.src(config.source('*.[jt]s'))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(config.outputByEnv('')))
    })
})

gulp.task('build:ssr', (): NodeJS.ReadWriteStream => {
  return gulp.src(config.source('*.[jt]s'))
    .pipe(webpackStream(ssrConfig, webpack))
    .pipe(gulp.dest(config.outputByEnv('')))
})

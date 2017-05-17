import { config }          from '../config'
const del                = require('del')
const gulp               = require('gulp')
const { Server }         = require('karma')
const merge              = require('merge-stream')
const webpack            = require('webpack')
const webpackStream      = require('webpack-stream')
const utConfig           = require('../karma/ut-conf').karmaConfig
const coverConfig        = require('../karma/cover-conf').karmaConfig
const webpackUtConfig    = require('../webpack/ut')
const webpackCoverConfig = require('../webpack/cover')

gulp.task('ut', () => {
  new Server(utConfig, (exitCode: number) => {
    if (exitCode === 0) {
      // tslint:disable-next-line:no-console
      console.log('Karma tests all passed.')
    } else {
      // tslint:disable-next-line:no-console
      console.error(`Karma has exited with code: ${exitCode}`)
    }
  }).start()
})

gulp.task('cover', () => {
  new Server(coverConfig, (exitCode: number) => {
    if (exitCode === 0) {
      // tslint:disable-next-line:no-console
      console.log('Karma tests all passed.')
    } else {
      // tslint:disable-next-line:no-console
      console.error(`Karma has exited with code: ${exitCode}`)
    }
  }).start()
})

// Below are for debug purpose, to build test codes using webpack.
gulp.task('ut:build', (): PromiseLike<any> =>

  del([config.building('')])
    .then((): NodeJS.ReadWriteStream =>
      merge(
        gulp.src([config.source('*.[jt]s'), `!${config.source('*.d.ts')}`])
          .pipe(webpackStream(webpackUtConfig, webpack)),
        gulp.src(config.source('*.html')),
      ).pipe(gulp.dest(config.building('')))))

gulp.task('cover:build', (): PromiseLike<any> =>

  del([config.building('')])
    .then((): NodeJS.ReadWriteStream =>
      merge(
        gulp.src([config.source('*.[jt]s'), `!${config.source('*.d.ts')}`])
          .pipe(webpackStream(webpackCoverConfig, webpack)),
        gulp.src(config.source('*.html')),
      ).pipe(gulp.dest(config.building('')))))

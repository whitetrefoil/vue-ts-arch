const del           = require('del')
const gulp          = require('gulp')
const plumber       = require('gulp-plumber')
const webpack       = require('webpack')
const webpackStream = require('webpack-stream')
const devConfig     = require('../webpack/dev')
import { config }     from '../config'

gulp.task('watch', (): PromiseLike<any> => {
  return del([config.building('')])
    .then((): NodeJS.ReadWriteStream => {
      return gulp.src(config.source('*.js'))
        .pipe(plumber())
        .pipe(webpackStream(Object.assign({}, devConfig, {
          watch: true,
        }), webpack))
        .pipe(gulp.dest(config.building('')))
    })
})

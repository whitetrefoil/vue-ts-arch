const del           = require('del')
const gulp          = require('gulp')
const webpack       = require('webpack')
const webpackStream = require('webpack-stream')
const devConfig     = require('../webpack/development')
const prodConfig    = require('../webpack/production')
const { config }    = require('../config')

gulp.task('webpack', () => {

  return del([config.outputDir, '.building', '.awcache'])
    .then(() => {
      const webpackConfig = process.env.NODE_ENV === 'development'
        ? devConfig
        : prodConfig

      return gulp.src(config.sourceAnd('*.[jt]s'))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(config.outputDir))
    })
})

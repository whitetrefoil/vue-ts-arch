import { config }     from '../config'
const del           = require('del')
const gulp          = require('gulp')
const gutil         = require('gulp-util')
const merge         = require('merge-stream')
const webpack       = require('webpack')
const devConfig     = require('../webpack/dev')
const prodConfig    = require('../webpack/prod')

gulp.task('build', (done: () => void) => {

  const webpackConfig = process.env.NODE_ENV === 'development'
    ? devConfig
    : prodConfig

  del([config.outputByEnv('')])
    .then((): void => {
      webpack(webpackConfig, (err: Error, stats: any) => {
        if (err != null) {
          throw new gutil.PluginError('webpack', err)
        }
        gutil.log('[webpack]:\n', stats.toString('minimal'))
        gulp.src(config.source('data/**'))
          .pipe(gulp.dest(config.output('data/')))
          .on('end', () => {
            done()
          })
      })
    })
})

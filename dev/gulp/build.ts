import { config }     from '../config'
const del           = require('del')
const gulp          = require('gulp')
const gutil         = require('gulp-util')
const merge         = require('merge-stream')
const webpack       = require('webpack')
const devConfig     = require('../webpack/dev')
const prodConfig    = require('../webpack/prod')
const ssrConfig     = require('../webpack/server')

gulp.task('build', (done: Function) => {

  const webpackConfig = process.env.NODE_ENV === 'development'
    ? devConfig
    // : ssrConfig
    : [prodConfig, ssrConfig]

  del([config.outputByEnv('')])
    .then((): void => {
      webpack(webpackConfig, (err: Error, stats: any) => {
        if (err != null) {
          throw new gutil.PluginError('webpack', err)
        }
        gutil.log('[webpack]:\n', stats.toString('minimal'))
        done()
      })
    })
})

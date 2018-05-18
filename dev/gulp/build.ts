// tslint:disable:no-import-side-effect no-implicit-dependencies

import del        from 'del'
import log        from 'fancy-log'
import gulp       from 'gulp'
import webpack    from 'webpack'
import config     from '../config'
import devConfig  from '../webpack/dev'
import prodConfig from '../webpack/prod'
import './pre-check'

gulp.task('build', gulp.series('preCheck', (done) => {

  const webpackConfig = process.env.NODE_ENV === 'development'
    ? devConfig
    : prodConfig

  del([config.outputByEnv('')])
    .then(() => {
      webpack(webpackConfig, (err: Error, stats: any) => {
        if (err != null) {
          throw err
        }
        log('[webpack]:\n', stats.toString('minimal'))
        gulp.src(config.source('data/**'))
          .pipe(gulp.dest(config.output('data/')))
          .on('end', () => {
            log.warn('Calling DONE')
            done()
          })
      })
    })
}))

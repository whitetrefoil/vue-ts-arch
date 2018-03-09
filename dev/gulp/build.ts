// tslint:disable:no-implicit-dependencies

import * as del     from 'del'
import * as log     from 'fancy-log'
import * as gulp    from 'gulp'
import * as gutil   from 'gulp-util'
import * as webpack from 'webpack'
import config       from '../config'
import devConfig    from '../webpack/dev'
import prodConfig   from '../webpack/prod'

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
        log('[webpack]:\n', stats.toString('minimal'))
        gulp.src(config.source('data/**'))
          .pipe(gulp.dest(config.output('data/')))
          .on('end', () => {
            done()
          })
      })
    })
})

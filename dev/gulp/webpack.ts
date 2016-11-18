import del           = require('del')
import gulp          = require('gulp')
import webpackStream = require('webpack-stream')
import devConfig       from '../webpack/development'
import prodConfig      from '../webpack/production'
import { config }      from '../config'

gulp.task('webpack', async(): Promise<NodeJS.ReadableStream> => {

  await del(config.outputDir)

  const webpackConfig = process.env.NODE_ENV === 'development'
    ? devConfig
    : prodConfig

  return gulp.src(config.sourceAnd('*.[jt]s'))
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(config.outputDir))
})

import { config }       from '../config'
const del             = require('del')
const gulp            = require('gulp')
// const { Server }      = require('karma')
const karma           = require('karma')
const merge           = require('merge-stream')
const webpack         = require('webpack')
const webpackStream   = require('webpack-stream')
const { karmaConfig } = require('../karma/cover-conf')
const webpackUtConfig = require('../webpack/cover')

// gulp.task('cover', (done: Noop) => {
//   new Server(karmaConfig, (exitCode: number) => {
//     if (exitCode === 0) {
//       // tslint:disable-next-line:no-console
//       console.log('Karma tests all passed.')
//     } else {
//       console.error(`Karma has exited with code: ${exitCode}`)
//     }
//     done()
//   }).start()
// })

// This is for debug purpose, to build test codes using webpack.
gulp.task('cover:build', (): PromiseLike<any> => {

  return del([config.building('')])
    .then((): NodeJS.ReadWriteStream => {
      return merge(
        gulp.src(config.source('*.[jt]s'))
          .pipe(webpackStream(webpackUtConfig, webpack)),
        gulp.src(config.source('*.html')),
      ).pipe(gulp.dest(config.building('')))
    })
})

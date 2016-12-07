import { karmaConfig } from '../karma/coverage-config'
import gulp          = require('gulp')
import Karma         = require('karma')

gulp.task('test', (done: Function) => {
  new Karma.Server(karmaConfig, (exitCode: number) => {
    if (exitCode === 0) {
      // tslint:disable-next-line:no-console
      console.log('Karma tests all passed.')
    } else {
      // tslint:disable-next-line:no-console
      console.error(`Karma has exited with code: ${exitCode}`)
    }
    done()
  }).start()
})

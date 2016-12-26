const { karmaConfig } = require('../karma/coverage-config')
const gulp            = require('gulp')
const Karma           = require('karma')

gulp.task('test', (done) => {
  new Karma.Server(karmaConfig, (exitCode) => {
    if (exitCode === 0) {
      // eslint-disable-next-line no-console
      console.log('Karma tests all passed.')
    } else {
      // eslint-disable-next-line no-console
      console.error(`Karma has exited with code: ${exitCode}`)
    }
    done()
  }).start()
})

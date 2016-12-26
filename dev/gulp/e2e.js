const { fork } = require('child_process')
const gulp     = require('gulp')
const Promise  = require('bluebird')
const run      = require('run-sequence')

const backendServer = require('./backend')
const devServer     = require('./dev-server')
const selenium      = require('./selenium')

function test() {
  return new Promise((resolve) => {
    fork('node_modules/.bin/cucumber-js')
      .on('close', (code) => {
        // eslint-disable-next-line no-console
        console.log(`Cucumber exited with code ${code}`)
        // eslint-disable-next-line no-console
        console.log('Killing selenium server...')
        resolve()
      })
  })
}


gulp.task('e2e', (done) => {
  run(['backend', 'devServer', 'selenium'], () => {
    test().finally(() => {
      backendServer.close()
      devServer.close()
      selenium.close()
      done()
    })
  })
})

gulp.task('e2e:env', (done) => {
  run(['backend', 'devServer', 'selenium'], () => {
    done()
  })
})

gulp.task('e2e:test', (done) => {
  test().finally(done)
})

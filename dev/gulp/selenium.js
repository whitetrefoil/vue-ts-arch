/* eslint no-console: 0 */

const gulp     = require('gulp')
const Promise  = require('bluebird')
const selenium = require('selenium-standalone')

const drivers = {
  chrome: {
    version: '2.26',
    arch   : process.arch,
    baseURL: 'https://npm.taobao.org/mirrors/chromedriver',
  },
}

const seleniumServer = {
  install() {
    return Promise.promisify(selenium.install)({
      version: '2.53.1',
      baseURL: 'https://npm.taobao.org/mirrors/selenium',
      drivers,
      logger : function(message) {
        console.log(message)
      },
    })
  },

  start() {
    return Promise.promisify(selenium.start)({
      drivers,
      spawnOptions: { stdio: 'ignore' },
    })
  },

  init() {
    return seleniumServer.install()
      .catch((err) => {
        if (err != null) {
          console.error('Failed to install Selenium! Detail:')
          console.error(err)
        }
        return Promise.reject()
      })

      .then(() => seleniumServer.start())
      .catch((err) => {
        if (err != null) {
          console.error('Failed to start Selenium server! Detail:')
          console.error(err)
        }
        return Promise.reject()
      })
  },
}

let server

gulp.task('selenium', () => {
  return seleniumServer.init().then((s) => server = s)
})

module.exports.close = function close() {
  server.kill()
}

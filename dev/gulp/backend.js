const gulp            = require('gulp')
const connect         = require('gulp-connect')
const every           = require('lodash/every')
const msm             = require('mock-server-middleware')
const { config }      = require('../config')
const { proxyServer } = require('./proxy')

// Proxy mode
const proxyMiddlewareFactory = function proxyMiddlewareFactory(proxy) {
  return (req, res, next) => {
    if (every(config.backendPrefix, (p) => req.url.indexOf(p) !== 0)) {
      next()
      return
    }
    proxy.web(req, res)
  }
}

module.exports.server = null
module.exports.close  = connect.serverClose

msm.initialize({
  apiPrefixes  : config.backendPrefix,
  apiDir       : 'stubapi/',
  lowerCase    : true,
  ping         : config.ping,
  preserveQuery: false,
})

gulp.task('backend', (done) => {

  const server = connect.server({
    // **NOTICE**: Keep `'.'` here to ensure
    // assets files in `../node_modules/` can be found in browser.
    root      : [config.sourceDir, '.'],
    port      : config.previewServerPort + 1,
    fallback  : `${config.sourceDir}/${config.previewServerIndex}`,
    middleware: () => {
      const middleware = []

      if (proxyServer.server == null) {
        // eslint-disable-next-line no-console
        console.log('No proxy server exists, will use StubAPI mode.')
        middleware.push(msm.middleware)
      } else {
        // eslint-disable-next-line no-console
        console.log('Existing proxy server found, will use proxy mode.')
        middleware.push(proxyMiddlewareFactory(proxyServer.server))
      }

      return middleware
    },
  })

  server.server.on('listening', () => {
    done()
  })

  module.exports.server = server
})

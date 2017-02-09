import { IncomingMessage, ServerResponse } from 'http'
import { config }                          from '../config'
import { proxy }                           from './proxy'
import _                                 = require('lodash')
const gulp                               = require('gulp')
const connect                            = require('gulp-connect')
const msm                                = require('mock-server-middleware')

const proxyMiddlewareFactory = (proxy: any) => {
  return (req: IncomingMessage, res: ServerResponse, next: Function) => {
    if (_.every(config.apiPrefixes, (p) => req.url.indexOf(p) !== 0)) {
      next()
      return
    }
    proxy.web(req, res)
  }
}

gulp.task('backend', (done: Noop) => {

  const server = connect.server({
    root      : [config.source('')],
    port      : config.serverPort + 1,
    middleware: () => {
      const middleware = []

      if (proxy.server == null) {
        // tslint:disable-next-line:no-console
        console.log('No proxy server exists, will use StubAPI mode.')

        msm.initialize({
          apiPrefixes  : config.apiPrefixes,
          apiDir       : 'stubapi/',
          lowerCase    : true,
          ping         : config.ping,
          preserveQuery: false,
        })
        middleware.push(msm.middleware)
      } else {
        // tslint:disable-next-line:no-console
        console.log('Existing proxy server found, will use proxy mode.')
        middleware.push(proxyMiddlewareFactory(proxy.server))
      }

      return middleware
    },
  })

  server.server.on('listening', () => {
    done()
  })
})

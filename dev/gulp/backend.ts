// tslint:disable:no-implicit-dependencies

import * as bodyparser                     from 'body-parser'
import * as log                            from 'fancy-log'
import * as gulp                           from 'gulp'
import * as connect                        from 'gulp-connect'
import { IncomingMessage, ServerResponse } from 'http'
import * as _                              from 'lodash'
import { MSM }                             from 'mock-server-middleware'
import config                              from '../config'
import { proxy }                           from './proxy'

const proxyMiddlewareFactory = (proxyServer: any) =>
  (req: IncomingMessage, res: ServerResponse, next: Function) => {
    if (_.every(config.apiPrefixes, (p) => req.url.indexOf(p) !== 0)) {
      next()
      return
    }
    proxyServer.web(req, res)
  }

gulp.task('backend', (done: Noop) => {

  const server = connect.server({
    root      : [config.source('')],
    port      : config.serverPort + 1,
    middleware: () => {
      const middleware = [bodyparser.json()]

      if (proxy.server == null) {
        log('No proxy server exists, will use StubAPI mode.')

        const msm = new MSM({
          apiPrefixes  : config.apiPrefixes,
          apiDir       : 'stubapi/',
          lowerCase    : true,
          ping         : config.ping,
          preserveQuery: false,
          logLevel     : 'DEBUG',
        })
        middleware.push(msm.middleware())
      } else {
        log('Existing proxy server found, will use proxy mode.')
        middleware.push(proxyMiddlewareFactory(proxy.server))
      }

      return middleware
    },
  })

  server.server.on('listening', () => {
    done()
  })
})

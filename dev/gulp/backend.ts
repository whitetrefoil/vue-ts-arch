// [INTERNAL] "_backendServer" Gulp Task
// ==========
//
// The backend server

import { NextHandleFunction }              from 'connect'
import { IncomingMessage, ServerResponse } from 'http'
import { config }                          from '../config'
import { IProxyServer, proxyServer }       from './proxy'
import gulp                              = require('gulp')
import gutil                             = require('gulp-util')
import every                             = require('lodash/every')

const connect                = require('gulp-connect')
const { green, red, yellow } = gutil.colors
const requireNew             = require('require-uncached')

const HTTP_NOT_FOUND             = 404
const HTTP_INTERNAL_SERVER_ERROR = 500

// Proxy mode
const proxyMiddlewareFactory = (proxyServer: IProxyServer) => {
  return (req: IncomingMessage, res: ServerResponse, next: Function): void => {
    if (every(config.backendPrefix, (p) => req.url.indexOf(p) !== 0)) {
      next()
      return
    }
    proxyServer.web(req, res)
  }
}

// StubAPI mode
const stubApiMiddlewareFactory = () => {
  return (req: IncomingMessage, res: ServerResponse, next: Function): void => {
    if (every(config.backendPrefix, (p) => req.url.indexOf(p) !== 0)) {
      next()
      return
    }

    const modulePath: string = config
      .rootAnd(`stubapi/${req.method.toLowerCase()}/${req.url.split('?')[0]}.js`)

    setTimeout(() => {
      try {
        const handler: NextHandleFunction = <NextHandleFunction> requireNew(modulePath)
        handler(req, res, next)
        gutil.log(green('Using StubAPI: ') + modulePath)
      } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          gutil.log(yellow('StubAPI not found: ') + modulePath)
          res.statusCode = HTTP_NOT_FOUND
          res.end(JSON.stringify(e))
        } else {
          gutil.log(red('Errors in StubAPI: ') + modulePath)
          gutil.log(e)
          res.statusCode = HTTP_INTERNAL_SERVER_ERROR
          res.end(JSON.stringify(e))
        }
      }
    }, config.ping)

  }
}

gulp.task('backend', () => {

  connect.server({
    // **NOTICE**: Keep `'.'` here to ensure
    // assets files in `../node_modules/` can be found in browser.
    root      : [config.sourceDir, '.'],
    port      : config.previewServerPort + 1,
    fallback  : `${config.sourceDir}/${config.previewServerIndex}`,
    middleware: () => {
      const middleware = []

      if (proxyServer.server == null) {
        // tslint:disable-next-line:no-console
        console.log('No proxy server exists, will use StubAPI mode.')
        middleware.push(stubApiMiddlewareFactory())
      } else {
        // tslint:disable-next-line:no-console
        console.log('Existing proxy server found, will use proxy mode.')
        middleware.push(proxyMiddlewareFactory(proxyServer.server))
      }

      return middleware
    },
  })
})

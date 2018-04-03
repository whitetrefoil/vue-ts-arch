// tslint:disable:no-implicit-dependencies

import { NextHandleFunction } from 'connect'
import history                from 'connect-history-api-fallback'
import log                    from 'fancy-log'
import gulp                   from 'gulp'
import http                   from 'http'
import proxy                  from 'http-proxy-middleware'
import c2k                    from 'koa-connect'
import * as _                 from 'lodash'
import serve                  from 'webpack-serve'
import config                 from '../config'
import devConfig              from '../webpack/dev'

const WAIT_FOR_STARTUP_IN_MS = 30000

gulp.task('devServer', (done: () => void) => {

  if (devConfig.output == null) {
    devConfig.output = {}
  }
  devConfig.output.path = config.absOutput('')

  serve({
    config : devConfig,
    port   : config.serverPort,
    dev    : { publicPath: '', stats: 'minimal' },
    content: config.absOutputByEnv(''),
    add    : (app, middleware) => {
      middleware.content()

      app.use(c2k(proxy(
        config.apiPrefixes,
        {
          target: `http://${config.livereloadHost}:${config.serverPort + 1}`,
          secure: false,
        },
      ) as NextHandleFunction))

      app.use(c2k(history({
        index: config.serverIndex,
      }) as NextHandleFunction))

      middleware.webpack()
    },
  })
    .then((server) => {
      server.on('listening', () => {
        log('Checking Dev Server status...')

        http.get({
          host   : config.livereloadHost,
          port   : config.serverPort,
          timeout: WAIT_FOR_STARTUP_IN_MS,
        }, (res: http.IncomingMessage) => {
          log(`Webpack Dev Server started at port ${config.serverPort}`)
          res.on('data', _.noop)
          res.on('end', done)
        })
          .on('error', (err?: Error) => {
            log.warn('There must be something wrong with webpack dev server:')
            log.warn(err)
            done()
          })
      })
    }, (error) => {
      log.error('Webpack Dev Server startup failed!  Detail:')
      log.error(error)
      return
    })

})

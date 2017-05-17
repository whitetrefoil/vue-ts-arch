import { IncomingMessage }    from 'http'
import { map, noop }          from 'lodash'
import { config }             from '../config'
import http                 = require('http')
import path                 = require('path')
const del                   = require('del')
const gulp                  = require('gulp')
const requireNew            = require('require-uncached')
const webpack               = require('webpack')
const WebpackDevServer      = require('webpack-dev-server')
const devConfig             = require('../webpack/dev')

const WAIT_FOR_STARTUP_IN_MS      = 30000
const WATCHER_STABILITY_THRESHOLD = 200
const WATCHER_RESTART_DELAY       = 500


gulp.task('devServer', (done: () => void) => {

  devConfig.plugins = devConfig.plugins || []
  devConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  devConfig.output.path = config.absOutput('')

  devConfig.entry.polyfills
    .unshift(`webpack-dev-server/client?http://${config.livereloadHost}:${config.serverPort}`
      , 'webpack/hot/dev-server')

  const webpackCompiler       = webpack(devConfig)
  const webpackCompilerConfig = {
    publicPath        : '',
    contentBase       : config.absBuilding(''),
    hot               : true,
    noInfo            : false,
    historyApiFallback: true,
    // quiet: false,
    // lazy: false,
    // watchOptions: {
    //  aggregateTimeout: 300,
    //  poll: true,
    // },
    // publicPath: '/assets/',
    // headers: { 'X-Custom-Header': 'yes' },
    stats             : 'errors-only',
    proxy             : [
      {
        context: map(config.apiPrefixes, (p: string): string => `${p}**`),
        target : `http://${config.livereloadHost}:${config.serverPort + 1}`,
        secure : false,
      },
    ],
    disableHostCheck  : true,
  }

  const server = new WebpackDevServer(webpackCompiler, webpackCompilerConfig)

  server.listen(config.serverPort, (error?: Error) => {
    if (error) {
      // tslint:disable-next-line:no-console
      console.error('Webpack Dev Server startup failed!  Detail:')
      // tslint:disable-next-line:no-console
      console.error(error)
      return
    }
    // tslint:disable-next-line no-console
    console.log(`Webpack Dev Server started at port ${config.serverPort}`)

    http.get({
      port   : config.serverPort,
      timeout: WAIT_FOR_STARTUP_IN_MS,
    }, (res: IncomingMessage) => {
      res.on('data', noop)
      res.on('end', done)
    })
      .on('error', (err?: Error) => {
        // tslint:disable-next-line:no-console
        console.warn('There must be something wrong with webpack dev server:')
        // tslint:disable-next-line:no-console
        console.warn(err)
        done()
      })
  })
})

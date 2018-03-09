// tslint:disable:no-implicit-dependencies
import * as log              from 'fancy-log'
import * as gulp             from 'gulp'
import * as http             from 'http'
import * as _                from 'lodash'
import * as webpack          from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import config                from '../config'
import entries               from '../webpack/configs/entries'
import devConfig             from '../webpack/dev'

const WAIT_FOR_STARTUP_IN_MS = 30000

gulp.task('devServer', (done: () => void) => {

  devConfig.plugins = devConfig.plugins || []
  devConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  devConfig.output.path = config.absOutput('')

  const entriesInConfig = devConfig.entry as typeof entries
  entriesInConfig.index
    .unshift(`webpack-dev-server/client?http://${config.livereloadHost}:${config.serverPort}`
      , 'webpack/hot/dev-server')

  const webpackCompiler       = webpack(devConfig)
  const webpackCompilerConfig = {
    publicPath        : '',
    contentBase       : config.absOutputByEnv(''),
    hot               : true,
    noInfo            : false,
    historyApiFallback: true,
    stats             : 'minimal' as 'minimal',
    proxy             : [
      {
        context: _.map(config.apiPrefixes, (p: string): string => `${p}**`),
        target : `http://${config.livereloadHost}:${config.serverPort + 1}`,
        secure : false,
      },
    ],
    disableHostCheck  : true,
  }

  const server = new WebpackDevServer(webpackCompiler, webpackCompilerConfig)

  server.listen(config.serverPort, (error?: Error) => {
    if (error) {
      log.error('Webpack Dev Server startup failed!  Detail:')
      log.error(error)
      return
    }
    log(`Webpack Dev Server started at port ${config.serverPort}`)

    http.get({
      port   : config.serverPort,
      timeout: WAIT_FOR_STARTUP_IN_MS,
    }, (res: http.IncomingMessage) => {
      res.on('data', _.noop)
      res.on('end', done)
    })
      .on('error', (err?: Error) => {
        log.warn('There must be something wrong with webpack dev server:')
        log.warn(err)
        done()
      })
  })
})

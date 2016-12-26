const gulp             = require('gulp')
const http             = require('http')
const map              = require('lodash/map')
const noop             = require('lodash/noop')
const webpack          = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('../webpack/development')
const { config }       = require('../config')

const WAIT_FOR_STARTUP_IN_MS = 30000

let server

gulp.task('devServer', (done) => {

  webpackDevConfig.plugins = webpackDevConfig.plugins || []
  webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackDevConfig.output.path = config.rootAnd(config.outputDir)

  webpackDevConfig.entry.index
    .unshift(`webpack-dev-server/client?http://localhost:${config.previewServerPort}`
      , 'webpack/hot/dev-server')

  const webpackCompiler       = webpack(webpackDevConfig)
  const webpackCompilerConfig = {
    publicPath        : '',
    contentBase       : config.rootAnd(config.outputDir),
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
    stats             : 'minimal',
    proxy             : [{
      context: map(config.backendPrefix, (p) => p + '**'),
      target : `http://localhost:${config.previewServerPort + 1}`,
    }],
  }

  server = new WebpackDevServer(webpackCompiler, webpackCompilerConfig)

  server.listen(config.previewServerPort, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Webpack Dev Server startup failed!  Detail:')
      // eslint-disable-next-line no-console
      console.error(error)
      return
    }
    // eslint-disable-next-line no-console
    console.log(`Webpack Dev Server started at port ${config.previewServerPort}`)

    http.get({
      port   : config.previewServerPort,
      timeout: WAIT_FOR_STARTUP_IN_MS,
    }, (res) => {
      res.on('data', noop)
      res.on('end', done)
    })
      .on('error', (err) => {
        // eslint-disable-next-line no-console
        console.warn('There must be something wrong with webpack dev server:')
        // eslint-disable-next-line no-console
        console.warn(err)
        done()
      })
  })
})

module.exports.close = function close() {
  server.close()
}

import gulp             = require('gulp')
import webpack          = require('webpack')
import WebpackDevServer = require('webpack-dev-server')
import webpackDevConfig   from '../webpack/development'
import { config }         from '../config'

gulp.task('devServer', () => {

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
    proxy             : {},
  }

  webpackCompilerConfig.proxy[`${config.backendPrefix}*`]
    = `http://localhost:${config.previewServerPort + 1}`

  new WebpackDevServer(<any> webpackCompiler, webpackCompilerConfig)
    .listen(config.previewServerPort, (error: Error) => {
      if (error) {
        console.error('Webpack Dev Server startup failed!  Detail:')
        console.error(error)
        return
      }
      console.log(`Webpack Dev Server started at port ${config.previewServerPort}`)
    })
})

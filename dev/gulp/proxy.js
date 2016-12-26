const gulp       = require('gulp')
const { config } = require('../config')

const proxy = require('http-proxy')

const proxyServer = {
  server: null,
}

gulp.task('proxy', (cb) => {
  // eslint-disable-next-line no-console
  console.log(`Building proxy on: ${config.proxyDestAnd('')}`)

  const server = proxy.createProxyServer({
    target : config.proxyDestAnd(''),
    secure : false,
    headers: {
      host  : config.proxyDestination,
      origin: config.proxyDestAnd(''),
    },
  })

  // eslint-disable-next-line no-console
  server.on('error', console.warn)

  proxy.server = server

  cb()
})

module.exports = {
  proxyServer,
}

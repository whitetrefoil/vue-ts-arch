import gulp = require('gulp')
import http = require('http')
import { config } from '../config'

const proxy = require('http-proxy')

export type ProxyFunction = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  options?: any,
) => void

export interface IProxyServer extends http.Server {
  web: ProxyFunction
}

export interface IProxyServerWrapper {
  server: IProxyServer
}

export const proxyServer: IProxyServerWrapper = {
  server: null,
}

gulp.task('proxy', (cb: () => void) => {
  console.log(`Building proxy on: ${config.proxyDestAnd('')}`)

  const server: IProxyServer = proxy.createProxyServer({
    target : config.proxyDestAnd(''),
    secure : false,
    headers: {
      host  : config.proxyDestination,
      origin: config.proxyDestAnd(''),
    },
  })

  server.on('error', console.warn)

  proxy.server = server

  cb()
})

const gulp      = require('gulp')
const httpProxy = require('http-proxy')
import { config } from '../config'

class DevServerProxy {
  server: NodeJS.EventEmitter = null

  startProxy(proxyConfig: any) {
    // tslint:disable-next-line:no-console
    console.log(`Building proxy to ${config.backendDest}`)
    this.server = httpProxy.createProxyServer(proxyConfig)
    this.server.on('error', console.warn)
  }
}

export const proxy = new DevServerProxy()

gulp.task('proxy', () => {
  proxy.startProxy({
    target : config.backendDest,
    secure : false,
    xfwd   : true,
    headers: {
      host   : config.backendDest.replace(/^https?:\/\//, ''),
      origin : config.backendDest,
      referer: `${config.backendDest}/`,
    },
  })
})

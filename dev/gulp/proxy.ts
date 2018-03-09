// tslint:disable:no-implicit-dependencies

import * as log       from 'fancy-log'
import * as gulp      from 'gulp'
import * as httpProxy from 'http-proxy'
import config         from '../config'

class DevServerProxy {
  server: NodeJS.EventEmitter = null

  startProxy(proxyConfig: any) {
    log(`Building proxy to ${config.backendDest}`)
    this.server = httpProxy.createProxyServer(proxyConfig)
    this.server.on('error', log.warn)
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

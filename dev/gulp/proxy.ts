// tslint:disable:no-implicit-dependencies

import log       from 'fancy-log'
import gulp      from 'gulp'
import httpProxy from 'http-proxy'
import config    from '../config'

class DevServerProxy {
  server!: NodeJS.EventEmitter

  startProxy(proxyConfig: any) {
    log(`Building proxy to ${config.backendDest}`)
    this.server = httpProxy.createProxyServer(proxyConfig)
    this.server.on('error', log.warn)
  }
}

export const proxy = new DevServerProxy()

gulp.task('proxy', (done) => {
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

  done()
})

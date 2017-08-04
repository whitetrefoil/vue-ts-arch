import * as gulp from 'gulp'
import * as httpProxy from 'http-proxy'
import config from '../config'
import { getLogger } from '../utils/log'

const { debug } = getLogger(__filename)

class DevServerProxy {
  server: NodeJS.EventEmitter = null

  startProxy(proxyConfig: any) {
    debug(`Building proxy to ${config.backendDest}`)
    this.server = httpProxy.createProxyServer(proxyConfig)
    this.server.on('error', console.warn)
  }
}

export const proxy = new DevServerProxy()

gulp.task('proxy', () => {
  proxy.startProxy({
    target: config.backendDest,
    secure: false,
    xfwd: true,
    headers: {
      host: config.backendDest.replace(/^https?:\/\//, ''),
      origin: config.backendDest,
      referer: `${config.backendDest}/`,
    },
  })
})

declare module 'webpack-serve' {

  import Koa = require('koa')
  import webpack = require('webpack')
  import devMiddleware = require('webpack-dev-middleware')

  type IAddFn = (app: Koa, middleware: any, options) => void // TODO

  type ILogLevel = 'trace'|'debug'|'info'|'warn'|'error'

  type IEvent = 'listening'

  interface IWebSocketHost {
    client: string
    server: string
  }

  interface IHttpsConfig {
    key?: string
    cert?: string
    pfx?: string
    passphrase?: string
  }

  interface IOpenConfig {
    app: string
    path: string
  }

  interface IHotClientOptions {
    host?: string|IWebSocketHost
    hot?: boolean
    https?: boolean
    logLevel?: ILogLevel
    logTime?: boolean
    port?: number
    reload?: boolean
    server?: Koa
    stats?: webpack.Stats.ToJsonOptionsObject
  }

  export interface IOptions {
    add?: IAddFn
    compiler?: webpack.Compiler
    config?: webpack.Configuration
    content?: string|string[]
    clipboard?: boolean
    devMiddleware?: devMiddleware.Options
    host?: string|IWebSocketHost
    hotClient?: false|IHotClientOptions
    http2?: boolean
    https?: IHttpsConfig
    logLevel?: ILogLevel
    logTime?: boolean
    on?: {
      [ev: string]: Function,
    }
    open?: false|IOpenConfig
    port: number
  }

  interface IServe {
    close(): void

    on(eventName: IEvent, fn: Function)
  }

  function serve(argv?: object, options?: IOptions): Promise<IServe>

  export = serve
}

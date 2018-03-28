declare module 'koa-connect' {
  import connect = require('connect')
  import Koa = require('koa')

  function c2k(middleware: connect.NextHandleFunction): Koa.Middleware

  export = c2k
}

// tslint:disable:no-console
import { red, yellow, green } from 'chalk'
import * as timestamp from 'time-stamp'

type ILevel = 'debug'|'log'|'warn'|'error'

interface ILog {
  debug: Function
}

function time(): string {
  return timestamp('HH:mm:ss.ms')
}

class Log {
  debug: any
  log = Log.log
  warn = Log.warn
  error = Log.error

  constructor(private name: string, debug: any) {
    this.debug = debug(name)
    this.debug.log = console.log.bind(console)
  }

  static prefix(level: ILevel): string {
    switch (level) {
      case 'error':
        return `${time()} ${red('ERR')}`
      case 'warn':
        return `${time()} ${yellow('WRN')}`
      case 'log':
        return `${time()} ${green('LOG')}`
      default:
        return ''
    }
  }

  static log(...args: any[]) {
    console.log(Log.prefix('log'), ...args)
  }

  static warn(...args: any[]) {
    console.warn(Log.prefix('warn'), ...args)
  }

  static error(...args: any[]) {
    console.error(Log.prefix('error'), ...args)
  }
}

export function getLogger(name: string): Log&ILog {
  let displayName = name

  if (name.indexOf(process.cwd()) === 0) {
    displayName = name.replace(process.cwd(), '')
  }

  return new Log(displayName, require('debug'))
}

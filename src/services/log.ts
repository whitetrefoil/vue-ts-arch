// tslint:disable:no-console
import * as debug from 'debug'

class Log {
  debug: debug.IDebugger

  constructor(private name: string) {
    this.debug = debug(name)
    this.debug.log = console.log.bind(console)
  }
}

export const getLogger = function getLogger(name: string): Log {
  return new Log(name)
}

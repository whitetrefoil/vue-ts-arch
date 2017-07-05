// tslint:disable:no-console
interface ILog {
  debug: Function
}

class DevLog implements ILog {
  debug: any

  constructor(private name: string, debug: any) {
    this.debug = debug(name)
    this.debug.log = console.log.bind(console)
  }
}

const prodLog: ILog = {
  debug() { return },
}

export const getLogger = function getLogger(name: string): ILog {
  if (process.env.NODE_ENV === 'development') {
    return new DevLog(name, require('debug'))
  }
  return prodLog
}

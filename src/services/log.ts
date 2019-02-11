import { getLogger as extGetLogger } from '@whitetrefoil/debug-log'

let getLogger: typeof extGetLogger

if (process.env.NODE_ENV === 'development') {
  getLogger = extGetLogger
} else {
  getLogger = () => ({ debug: () => void 0 })
}

export { getLogger }

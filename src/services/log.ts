import { ILog } from '@whitetrefoil/debug-log';

let getLogger: (name: string) => ILog;

if (process.env.NODE_ENV === 'development') {
  getLogger = require('@whitetrefoil/debug-log').getLogger;
} else {
  getLogger = () => ({ debug: () => void 0 });
}

export { getLogger };

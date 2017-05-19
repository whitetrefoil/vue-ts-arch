// tslint:disable:no-import-side-effect

// Babel Polyfill
// Refer to: https://babeljs.io/docs/plugins/transform-runtime/
// import 'babel-polyfill'

// RxJS
import 'rxjs/Observable'
import 'rxjs/add/observable/defer'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/scan'

// import 'zone.js/dist/zone'

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity

  // require('zone.js/dist/long-stack-trace-zone')
}

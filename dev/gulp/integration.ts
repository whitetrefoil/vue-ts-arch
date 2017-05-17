// tslint:disable:no-import-side-effect

const gulp = require('gulp')
const run  = require('run-sequence')

import './backend'
import './dev-server'
import './proxy'

gulp.task('integration', (cb: Noop) => {
  run(['devServer', 'proxy'], 'backend', cb)
})

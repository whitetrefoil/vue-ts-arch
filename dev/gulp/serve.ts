const gulp = require('gulp')
const run  = require('run-sequence')

import './backend'
import './dev-server'

gulp.task('serve', (cb: Noop) => {
  return run(['devServer', 'backend'], cb)
})

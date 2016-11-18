import gulp = require('gulp')
import run  = require('run-sequence')

import './dev-server'
import './backend'

gulp.task('serve', (cb: gulp.TaskCallback) => {
  return run(['devServer', 'backend'], cb)
})

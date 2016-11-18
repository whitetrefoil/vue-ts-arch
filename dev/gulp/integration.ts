import gulp = require('gulp')
import run = require('run-sequence')

import './backend'
import './proxy'
import './dev-server'

gulp.task('integration', (cb: gulp.TaskCallback) => {
  return run(['proxy', 'devServer', 'backend'], cb)
})

gulp.task('it', ['integration'])

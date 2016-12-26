const gulp = require('gulp')
const run  = require('run-sequence')

require('./dev-server')
require('./backend')

gulp.task('serve', (cb) => {
  return run(['devServer', 'backend'], cb)
})

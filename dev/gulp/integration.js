const gulp = require('gulp')
const run  = require('run-sequence')

require('./backend')
require('./proxy')
require('./dev-server')

gulp.task('integration', (cb) => {
  return run(['proxy', 'devServer', 'backend'], cb)
})

gulp.task('it', ['integration'])

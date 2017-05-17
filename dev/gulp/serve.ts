// tslint:disable:no-import-side-effect

const gulp = require('gulp')
const run  = require('run-sequence')

import './backend'
import './dev-server'

gulp.task('serve', (cb: Noop) =>
  run(['devServer', 'backend'], cb))

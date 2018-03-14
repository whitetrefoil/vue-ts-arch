// tslint:disable:no-import-side-effect no-implicit-dependencies

import gulp from 'gulp'
import run  from 'run-sequence'

import './backend'
import './dev-server'
import './proxy'

gulp.task('integration', (cb: Noop) => {
  run(['devServer', 'proxy'], 'backend', cb)
})

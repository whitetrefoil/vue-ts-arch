// tslint:disable:no-import-side-effect no-implicit-dependencies
import * as gulp from 'gulp'
import * as run  from 'run-sequence'

import './backend'
import './dev-server'

gulp.task('serve', (cb: Noop) =>
  run(['devServer', 'backend'], cb))

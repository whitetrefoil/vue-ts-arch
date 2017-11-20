// tslint:disable:no-import-side-effect no-implicit-dependencies
import * as gulp from 'gulp'
import * as run  from 'run-sequence'

import './backend'
import './dev-server'
import './proxy'

gulp.task('integration', (cb: Noop) => {
  run(['devServer', 'proxy'], 'backend', cb)
})

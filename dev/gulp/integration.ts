// tslint:disable:no-import-side-effect no-implicit-dependencies

import { parallel, series, task } from 'gulp'

import './backend'
import './dev-server'
import './proxy'

task('integration', series(parallel('devServer', 'proxy'), 'backend'))

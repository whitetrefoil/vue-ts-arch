// tslint:disable:no-import-side-effect no-implicit-dependencies

import { parallel, series, task } from 'gulp'

import './backend'
import './dev-server'
import './pre-check'
import './proxy'

task('integration', series('preCheck', parallel('devServer', 'proxy'), 'backend'))

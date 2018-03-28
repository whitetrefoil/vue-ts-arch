// tslint:disable:no-import-side-effect no-implicit-dependencies

import { parallel, task } from 'gulp'

import './backend'
import './dev-server'

task('serve', parallel('devServer', 'backend'))

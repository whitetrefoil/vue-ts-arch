// tslint:disable:no-import-side-effect no-implicit-dependencies

import { task } from 'gulp'
import config   from '../config'

task('help', (done) => {
  console.error(config.argv.help)
  done()
})

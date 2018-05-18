// tslint:disable:no-import-side-effect no-implicit-dependencies

import checkDeps from '@whitetrefoil/check-dependencies'
import { task }  from 'gulp'
import config    from '../config'

task('preCheck', async(done) => {
  const isDepOk = config.skipNpmCheck ? true : await checkDeps(true)

  if (isDepOk !== true) {
    done(new Error('Pre-check failed'))
  }

  done()
})

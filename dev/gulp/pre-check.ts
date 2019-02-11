import checkDep from '@whitetrefoil/check-dependencies'
import { task } from 'gulp'
import config   from '../config'

task('preCheck', async() => {
  const isDepOk = config.skipNpmCheck ? true : await checkDep(true)

  if (isDepOk !== true) {
    throw new Error('Pre-check failed')
  }
})

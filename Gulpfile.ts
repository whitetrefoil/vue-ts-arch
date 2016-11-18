import Promise = require('bluebird')
global.Promise = Promise

import { initialize } from './dev/config'
initialize(__dirname)

import './dev/gulp/backend'
import './dev/gulp/build'
import './dev/gulp/dev-server'
import './dev/gulp/eslint'
import './dev/gulp/integration'
import './dev/gulp/proxy'
import './dev/gulp/serve'
import './dev/gulp/watch'
import './dev/gulp/webpack'

// tslint:disable

require('ts-node').register({
  project: './dev/tsconfig.json',
  cache  : false,
  fast   : true,
  files  : true,
})

require('./dev/gulp/backend')
require('./dev/gulp/build')
require('./dev/gulp/dev-server')
require('./dev/gulp/help')
require('./dev/gulp/integration')
require('./dev/gulp/pre-check')
require('./dev/gulp/serve')

// tslint:disable

require('ts-node').register({
  project      : './dev/tsconfig.json',
  files        : true,
  fast         : true,
  cache        : false,
  transpileOnly: true,
})

require('./dev/gulp/backend')
require('./dev/gulp/build')
require('./dev/gulp/dev-server')
require('./dev/gulp/help')
require('./dev/gulp/integration')
require('./dev/gulp/pre-check')
require('./dev/gulp/serve')
require('./dev/gulp/stubapi')

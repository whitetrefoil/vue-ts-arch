require('ts-node').register({
  project: './dev/tsconfig.json',
  fast: true,
  cache: false,
})

require('./dev/gulp/backend')
require('./dev/gulp/build')
require('./dev/gulp/dev-server')
require('./dev/gulp/integration')
require('./dev/gulp/proxy')
require('./dev/gulp/serve')

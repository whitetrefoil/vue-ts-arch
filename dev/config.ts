const DEFAULT_IS_DEVELOPMENT                = false
const DEFAULT_PREVIEW_SERVER_PORT           = 8888
const DEFAULT_PREVIEW_SERVER_INDEX          = 'index.html'
const DEFAULT_PREVIEW_SERVER_BACKEND_PREFIX = ['/api/']
const DEFAULT_PREVIEW_SERVER_PING           = 0
const DEFAULT_PROXY_DESTINATION             = 'localhost:8091'
const DEFAULT_PROXY_DESTINATION_IS_HTTPS    = false

const DEFAULT_OUTPUT_DIR      = 'dist'
const DEFAULT_SOURCE_BASE_DIR = 'src'

const meow = require('meow')
import { colors } from 'gulp-util'
import isNil = require('lodash/isNil')
import path = require('path')

interface IFlags {
  d: boolean
  development: boolean
  o: string
  output: string
  p: number | string
  port: number | string
  x: string
  prefix: string
  i: string
  index: string
  ping: number | string
  e: string
  backend: string
  backendHttps: boolean
}

interface IArgv {
  flags: IFlags
  pkg: any
}

interface IConfig {
  isInitialized: boolean

  argv?: any
  pkg?: any

  appRoot?: string
  rootAnd: (pathInRoot: string) => string

  sourceDir?: string
  sourceAnd: (pathInSource: string) => string

  outputDir?: string
  /** @returns Path related to base dir */
  outputAnd: (pathInSource: string) => string

  previewServerPort?: number

  backendPrefix?: string[]

  previewServerIndex?: string

  ping?: number

  proxyDestination?: string
  proxyDestinationIsHttps?: boolean
  proxyDestAnd: (pathInProxyDest: string) => string
}

const argv: IArgv = meow(`
    Usage:
      $ npm run gulp ${colors.yellow('<task>')} -- ${colors.yellow('<options>')}
    or:
      $ ./node_modules/.bin/gulp ${colors.yellow('<task>')} ${colors.yellow('<options>')}
    or (if have gulp installed globally):
      $ gulp ${colors.yellow('<task>')} ${colors.yellow('<options>')}

    Options:                                                     [${colors.gray('default value')}]
      common:
        -d, --development  Set NODE_ENV to "development"         [${colors.yellow('false')}]
      building:
        -o, --output       build output directory                [${colors.green('"./dist"')}]
      developing:
        -p, --port         port of preview server                [${colors.blue('8888')}]
        -x, --prefix       prefix to determine backend requests  [${colors.green('"/api/"')}]
                           can use ',' to specify multiple ones
        -i, --index        index page of preview server          [${colors.green('"index.html"')}]
        --ping             emulate the network delay (ms)        [${colors.blue('0')}]
        -e, --backend      destination of backend proxy          [${colors.green('"localhost:8091"')}]
        --backend-https    backend proxy destination is HTTPS    [${colors.yellow('false')}]

    For more detail of tasks / options, see code in "dev/gulp" directory.
  `,
  {
    boolean: ['development', 'backend-https'],
    string : ['index', 'prefix', 'backend'],
    alias  : {
      d: 'development',
      o: 'output',
      p: 'port',
      i: 'index',
      x: 'prefix',
      e: 'backend',
    },
  },
)

export class ConfigNotInitializedError extends Error {}

export const config: IConfig = {
  isInitialized: false,

  rootAnd: (pathInRoot: string) => {
    if (!config.isInitialized) { throw new ConfigNotInitializedError() }
    return path.join(config.appRoot, pathInRoot)
  },
  sourceAnd: (pathInSource: string) => {
    if (!config.isInitialized) { throw new ConfigNotInitializedError() }
    return path.join(config.sourceDir, pathInSource)
  },
  outputAnd: (pathInOutput: string) => {
    if (!config.isInitialized) { throw new ConfigNotInitializedError() }
    return path.join(config.outputDir, pathInOutput)
  },
  proxyDestAnd: (pathInProxyDest: string) => {
    if (!config.isInitialized) { throw new ConfigNotInitializedError() }
    return config.proxyDestinationIsHttps ? 'https://' : 'http://'
      + config.proxyDestination
      + pathInProxyDest
  },
}

export function initialize(appRoot: string) {

  if (config.isInitialized) {
    if (config.appRoot !== appRoot) {
      console.warn(`Project has already been initialized in ${config.appRoot}.`)
      console.warn(`The new location ${appRoot} will not been applied.`)
    }
    return
  }

  // tslint:disable-next-line:no-console
  console.log(`Initializing project in "${appRoot}"`)

  if (isNil(process.env.NODE_ENV)) {
    process.env.NODE_ENV = (argv.flags.development || DEFAULT_IS_DEVELOPMENT)
      ? 'development' : 'production'
  }
  process.env.BABEL_ENV = process.env.NODE_ENV

  // tslint:disable-next-line:no-console
  console.log(`Running gulp & babel for ${process.env.NODE_ENV} environment.`)

  config.argv = argv

  config.pkg = argv.pkg || {}

  config.appRoot = appRoot

  config.sourceDir = DEFAULT_SOURCE_BASE_DIR

  config.outputDir = DEFAULT_OUTPUT_DIR

  config.previewServerPort = Number(argv.flags.port) || DEFAULT_PREVIEW_SERVER_PORT

  if (isNil(process.env.API_PREFIX)) {
    process.env.API_PREFIX = (argv.flags.prefix) || DEFAULT_PREVIEW_SERVER_BACKEND_PREFIX
  }
  config.backendPrefix = process.env.API_PREFIX.split(',')

  config.previewServerIndex = argv.flags.index || DEFAULT_PREVIEW_SERVER_INDEX

  config.ping = Number(argv.flags.ping) || DEFAULT_PREVIEW_SERVER_PING

  config.proxyDestination = argv.flags.backend || DEFAULT_PROXY_DESTINATION
  config.proxyDestinationIsHttps = argv.flags.backendHttps || DEFAULT_PROXY_DESTINATION_IS_HTTPS

  config.isInitialized = true
}

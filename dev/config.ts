// tslint:disable:no-implicit-dependencies

import Chalk from 'chalk'
import log   from 'fancy-log'
import meow  from 'meow'
import path  from 'path'

// region - Interfaces

interface IFlags {
  base?: string
  development: boolean
  port: string
  prefix: string
  index: string
  livereload: string
  ping: string
  backend: string
}

type IBuildPathFn = (...path: string[]) => string

interface IConfig {
  argv: meow.Result<IFlags>
  pkg: any
  base: string
  serverPort: number
  apiPrefixes: string[]
  serverIndex: string
  livereloadHost: string
  ping: number
  backendDest: string

  root: IBuildPathFn
  absRoot: IBuildPathFn
  source: IBuildPathFn
  absSource: IBuildPathFn
  building: IBuildPathFn
  absBuilding: IBuildPathFn
  output: IBuildPathFn
  absOutput: IBuildPathFn
  outputByEnv: IBuildPathFn
  absOutputByEnv: IBuildPathFn
}

// endregion

// region - Default constants

const DEFAULT_BASE           = '/'
const DEFAULT_IS_DEVELOPMENT = false
const DEFAULT_PORT           = 8888
const DEFAULT_PREFIX         = '/api/'
const DEFAULT_INDEX          = 'index.html'
const DEFAULT_PING           = 0
const DEFAULT_LIVERELOAD     = 'localhost'
const DEFAULT_BACKEND        = 'http://localhost:8091'

const DEFAULT_BUILDING_DIR    = '.building'
const DEFAULT_OUTPUT_DIR      = 'dist'
const DEFAULT_SOURCE_BASE_DIR = 'src'

// endregion

const { blue, green, gray, yellow } = Chalk

// region - Configure Meow
const argv = meow<IFlags>(
  `
    Usage:
      $ npm ${yellow('<task>')} -- ${yellow('<options>')}

    Tasks:
      run server           start preview server
      start                alias of "run server"
      test                 run tests
      run coverage         generate coverage report
      run build            build the source code

    Options:                                                     [${gray('default value')}]
      building:
        -b, --base         Base directory of site.               [${green('"/"')}]
      common:
        -h, --help         show this help message
        -d, --development  Set NODE_ENV to "development"         [${yellow('false')}]
      developing:
        -p, --port         port of preview server                [${blue('8888')}]
        -x, --prefix       prefix to determine backend requests  [${green('"/api/"')}]
                           can use ',' to specify multiple ones
        -i, --index        index page of preview server          [${green('"index.html"')}]
        -l, --livereload   the hostname to bind & livereload     [${green('"localhost"')}]
        --ping             emulate the network delay (ms)        [${blue('0')}]
        -e, --backend      destination of backend proxy          [${green('"http://localhost:8091"')}]

    For more detail of tasks / options, see code in "dev/gulp" directory.
  `,
  {
    flags: {
      base       : {
        alias  : 'b',
        default: DEFAULT_BASE,
        type   : 'string',
      },
      help       : {
        alias: 'h',
      },
      development: {
        alias  : 'd',
        default: DEFAULT_IS_DEVELOPMENT,
        type   : 'boolean',
      },
      port       : {
        alias  : 'p',
        default: DEFAULT_PORT,
      },
      prefix     : {
        alias  : 'x',
        default: DEFAULT_PREFIX,
        type   : 'string',
      },
      index      : {
        alias  : 'i',
        default: DEFAULT_INDEX,
        type   : 'string',
      },
      livereload : {
        alias  : 'l',
        default: DEFAULT_LIVERELOAD,
        type   : 'string',
      },
      ping       : {
        default: DEFAULT_PING,
      },
      backend    : {
        alias  : 'e',
        default: DEFAULT_BACKEND,
        type   : 'string',
      },
    },
  },
)

// endregion

// region - Main exports

const rootDir     = path.join(__dirname, '..')
const sourceDir   = DEFAULT_SOURCE_BASE_DIR
const buildingDir = DEFAULT_BUILDING_DIR
const outputDir   = DEFAULT_OUTPUT_DIR

process.env.NODE_ENV        = (argv.flags.development || DEFAULT_IS_DEVELOPMENT) ? 'development' : 'production'
process.env.BABEL_ENV       = process.env.NODE_ENV
process.env.VUE_ROUTER_BASE = argv.flags.base

log(`Initializing project in "${rootDir}" for ${process.env.NODE_ENV} environment.`)
log(`The base path is "${argv.flags.base}"`)

const root: IBuildPathFn = (...pathInRoot) => path.join(rootDir, ...pathInRoot)
const absRoot            = root

const source: IBuildPathFn    = (...pathInSource) => path.join(sourceDir, ...pathInSource)
const absSource: IBuildPathFn = (...pathInSource) => root(sourceDir, ...pathInSource)

const building: IBuildPathFn    = (...pathInBuilding) => path.join(buildingDir, ...pathInBuilding)
const absBuilding: IBuildPathFn = (...pathInBuilding) => root(buildingDir, ...pathInBuilding)

const output: IBuildPathFn    = (...pathInOutput) => path.join(outputDir, ...pathInOutput)
const absOutput: IBuildPathFn = (...pathInOutput) => root(outputDir, ...pathInOutput)

const outputByEnv: IBuildPathFn = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? outputDir : buildingDir
  return path.join(dir, ...pathInOutput)
}

const absOutputByEnv: IBuildPathFn = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? outputDir : buildingDir
  return root(dir, ...pathInOutput)
}

const config: IConfig = {
  argv,
  pkg           : argv.pkg || {},
  base          : argv.flags.base,
  serverPort    : parseInt(argv.flags.port, 10),
  apiPrefixes   : argv.flags.prefix.split(','),
  serverIndex   : argv.flags.index[0] === '/' ? argv.flags.index : `/${argv.flags.index}`,
  livereloadHost: argv.flags.livereload,
  ping          : parseInt(argv.flags.ping, 10),
  backendDest   : argv.flags.backend === '' ? DEFAULT_BACKEND : argv.flags.backend,
  root,
  absRoot,
  source,
  absSource,
  building,
  absBuilding,
  output,
  absOutput,
  outputByEnv,
  absOutputByEnv,
}

// endregion

export default config

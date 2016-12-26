const WATCHER_STABILITY_THRESHOLD = 200
const WATCHER_RESTART_DELAY       = 500

const chokidar      = require('chokidar')
const del           = require('del')
const gulp          = require('gulp')
const path          = require('path')
const plumber       = require('gulp-plumber')
const run           = require('run-sequence')
const webpackStream = require('webpack-stream')
const { config }    = require('../config')
const devConfig     = require('../webpack/development')

const startWatching = function startWatching() {

  const watchingFiles = config.rootAnd(config.outputAnd('**/*.*'))

  let restartTimer

  chokidar.watch(watchingFiles, {
    ignored         : /[/\\]\./,
    awaitWriteFinish: {
      stabilityThreshold: WATCHER_STABILITY_THRESHOLD,
    },
  })
    .on('ready', () => {
      // eslint-disable-next-line no-console
      console.log(`Electron is watching in ${watchingFiles}`)
    })
    .on('all', (type, absPath) => {
      const sourcePath = path.relative(config.outputDir, absPath)

      // eslint-disable-next-line no-console
      console.log(`${type}: "${sourcePath}"`)

      clearTimeout(restartTimer)
      restartTimer = setTimeout(() => { run('electron') }, WATCHER_RESTART_DELAY)
    })
}

gulp.task('watch', () => {

  return del('lib').then(() => {

    return gulp.src(config.sourceAnd('main.js'))
      .pipe(plumber())
      .pipe(webpackStream({
        ...devConfig,
        watch: true,
      }))
      .pipe(gulp.dest(config.outputDir))
      .on('finish', () => {
        startWatching()
      })
  })
})

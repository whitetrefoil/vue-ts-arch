const WATCHER_STABILITY_THRESHOLD = 200
const WATCHER_RESTART_DELAY       = 500

import chokidar      = require('chokidar')
import del           = require('del')
import gulp          = require('gulp')
import path          = require('path')
import plumber       = require('gulp-plumber')
import run           = require('run-sequence')
import webpackStream = require('webpack-stream')
import { config }      from '../config'
import watchConfig     from '../webpack/watch'

function startWatching() {

  const watchingFiles = config.rootAnd(config.outputAnd('**/*.*'))

  let restartTimer: NodeJS.Timer

  chokidar.watch(watchingFiles, {
    ignored         : /[\/\\]\./,
    awaitWriteFinish: {
      stabilityThreshold: WATCHER_STABILITY_THRESHOLD,
    },
  })
    .on('ready', () => {
      console.log(`Electron is watching in ${watchingFiles}`)
    })
    .on('all', (type: string, absPath: string) => {
      const sourcePath = path.relative(config.outputDir, absPath)

      console.log(`${type}: "${sourcePath}"`)

      clearTimeout(restartTimer)
      restartTimer = setTimeout(() => { run('electron') }, WATCHER_RESTART_DELAY)
    })
}

gulp.task('watch', async(): Promise<NodeJS.ReadableStream> => {

  await del('lib')

  return gulp.src(config.sourceAnd('main.js'))
    .pipe(plumber())
    .pipe(webpackStream(watchConfig))
    .pipe(gulp.dest(config.outputDir))
    .on('finish', () => {
      startWatching()
    })
})

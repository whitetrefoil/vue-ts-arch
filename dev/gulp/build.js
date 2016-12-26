const gulp = require('gulp')

require('./webpack')

gulp.task('build', ['webpack'])

const fs         = require('fs-extra')
const eslint     = require('gulp-eslint')
const gulp       = require('gulp')
const gutil      = require('gulp-util')
const defaults   = require('lodash/defaults')
const extend     = require('lodash/extend')
const forEach    = require('lodash/forEach')
const groupBy    = require('lodash/groupBy')
const isFunction = require('lodash/isFunction')
const isString   = require('lodash/isString')
const map        = require('lodash/map')
const path       = require('path')
const xmlbuilder = require('xmlbuilder')
const { config } = require('../config')

const messageHandlerFactory = function messageHandlerFactory(level, testcase) {
  return (message) => {
    const attributes = { type: message.ruleId }
    const detailText = `L${message.line}:${message.column} - ${message.message}\n`
      + `Source: \`${message.source}\`\n`

    testcase.ele(level, attributes, detailText)
  }
}

const caseHandlerFactory = function caseHandlerFactory(suite) {
  return (file) => {
    const testcase = suite.ele('testcase', {
      name    : file.filePath,
      failures: file.errorCount,
      warnings: file.warningCount,
    })

    const messages = groupBy(file.messages, 'severity')

    forEach(messages['1'], messageHandlerFactory('warning', testcase))
    forEach(messages['2'], messageHandlerFactory('failure', testcase))
  }
}

const createSuite = function createSuite(results) {
  const testsuite = xmlbuilder.create('testsuite')
  testsuite.att('name', 'ESLint')
  testsuite.att('package', 'org.eslint')
  testsuite.att('tests', results.length)
  testsuite.att('failures', results.errorCount)
  testsuite.att('warnings', results.warningCount)

  forEach(results, caseHandlerFactory(testsuite))

  return testsuite
}

const junitFormatter = function junitFormatter(results) {

  fs.ensureDirSync('test_results/junit')

  const testsuite = createSuite(results)

  fs.writeFileSync('test_results/junit/eslint.xml', testsuite.end({ pretty: true }))
}

const wrapFormatterWithRelativePath = function wrapFormatterWithRelativePath(formatter = 'stylish') {
  let format

  if (isFunction(formatter)) {
    format = formatter
  } else if (isString(formatter)) {
    try {
      // eslint-disable-next-line global-require
      format = require(`eslint/lib/formatters/${formatter}`)
    } catch (e) {
      throw new gutil.PluginError('Task "eslint"'
        , 'No such formatter found!'
        , { showStack: false }
      )
    }
  } else {
    throw new gutil.PluginError('Task "eslint"'
      , 'ESLint formatter must be a string, '
      + 'function or `undefined` (default value is "stylish").'
      , { showStack: false }
    )
  }

  return (results) => {
    // The original `results` is wired, it is an array,
    // but has some extra properties like an object.
    // `map`, `clone` cannot handle it.
    // Use `defaults` to workaround it.
    const resultsWithRelativePaths = map(results, (result) => {
      return extend({}, result, {
        filePath: path.relative(config.appRoot, result.filePath),
      })
    })
    return format(defaults(resultsWithRelativePaths, results))
  }
}

gulp.task('eslint', () => {
  gulp.src([
    '**/*.js',
    '**/*.vue',
    '!node_modules/**',
    '!lib/**',
    '!dist/**',
  ], { base: '.' })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format(wrapFormatterWithRelativePath(junitFormatter)))
    .pipe(eslint.format(wrapFormatterWithRelativePath('html'), (html) => {
      fs.ensureDirSync('test_results/html')
      fs.writeFileSync('test_results/html/eslint.html', html)
    }))

})

gulp.task('eslint:fix', () => {
  gulp.src([
    '**/*.js',
    '**/*.vue',
    '!node_modules/**',
    '!lib/**',
    '!dist/**',
  ], { base: '.' })
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(gulp.dest('.'))

})

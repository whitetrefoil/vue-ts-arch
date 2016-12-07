import fs            = require('fs-extra')
import eslint        = require('gulp-eslint')
import gulp          = require('gulp')
import gutil         = require('gulp-util')
import {
  defaults,
  extend,
  forEach,
  groupBy,
  isFunction,
  isString,
  map,
}                      from 'lodash'
import path          = require('path')
import xmlbuilder    = require('xmlbuilder')
import { config }      from '../config'

function messageHandlerFactory(level: string, testcase: xmlbuilder.XMLElementOrXMLNode) {
  return (message: eslint.ESLintMessage) => {
    const attributes = { type: message.ruleId }
    const detailText = `L${message.line}:${message.column} - ${message.message}\n`
      + `Source: \`${message.source}\`\n`

    testcase.ele(level, attributes, detailText)
  }
}

function caseHandlerFactory(suite: xmlbuilder.XMLElementOrXMLNode) {
  return (file: eslint.ESLintResult) => {
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

function createSuite(results: eslint.ESLintResults) {
  const testsuite: xmlbuilder.XMLElementOrXMLNode = xmlbuilder.create('testsuite')
  testsuite.att('name', 'ESLint')
  testsuite.att('package', 'org.eslint')
  testsuite.att('tests', results.length)
  testsuite.att('failures', results.errorCount)
  testsuite.att('warnings', results.warningCount)

  forEach(results, caseHandlerFactory(testsuite))

  return testsuite
}

function junitFormatter(results: eslint.ESLintResults) {

  fs.ensureDirSync('test_results/junit')

  const testsuite = createSuite(results)

  fs.writeFileSync('test_results/junit/eslint.xml', testsuite.end({ pretty: true }))
}

function wrapFormatterWithRelativePath(formatter: string | Function = 'stylish') {
  let format: Function

  if (isFunction(formatter)) {
    format = formatter
  } else if (isString(formatter)) {
    try {
      // eslint-disable-next-line global-require
      format = require(`eslint/lib/formatters/${formatter}`)
    } catch (e) {
      throw new gutil.PluginError(
        'Task "eslint"',
        'No such formatter found!',
        { showStack: false },
      )
    }
  } else {
    throw new gutil.PluginError(
      'Task "eslint"',
      'ESLint formatter must be a string, '
      + 'function or `undefined` (default value is "stylish").',
      { showStack: false },
    )
  }

  return (results: eslint.ESLintResults) => {
    // The original `results` is wired, it is an array,
    // but has some extra properties like an object.
    // `map`, `clone` cannot handle it.
    // Use `defaults` to workaround it.
    const resultsWithRelativePaths: eslint.ESLintResult[] = map(results, (result: eslint.ESLintResult) => {
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
    .pipe(eslint.format(wrapFormatterWithRelativePath('html'), (html: string) => {
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

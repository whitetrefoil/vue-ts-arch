const { config } = require('../../config')

const BOOTSTRAP_REQUIRED_MINIMAL_PRECISION = 8

module.exports.sassOptions = {
  sourceMap     : true,
  includePaths  : [config.source('css')],
  indentedSyntax: true,
  outputStyle   : 'expanded',
  precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
}

module.exports.sassLoader = {
  loader : 'sass-loader',
  options: module.exports.sassOptions,
}

module.exports.scssOptions = {
  sourceMap     : true,
  includePaths  : [config.source('css')],
  indentedSyntax: false,
  outputStyle   : 'expanded',
  precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
}

module.exports.scssLoader = {
  loader : 'sass-loader',
  options: module.exports.scssOptions,
}

import config from '../../config';

const BOOTSTRAP_REQUIRED_MINIMAL_PRECISION = 8;

export const sassOptions = {
  sourceMap     : true,
  includePaths  : [config.source('css')],
  indentedSyntax: true,
  outputStyle   : 'expanded',
  precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
};

export const sassLoader = {
  loader : 'sass-loader',
  options: sassOptions,
};

export const scssOptions = {
  sourceMap     : true,
  includePaths  : [config.source('css')],
  indentedSyntax: false,
  outputStyle   : 'expanded',
  precision     : BOOTSTRAP_REQUIRED_MINIMAL_PRECISION,
};

export const scssLoader = {
  loader : 'sass-loader',
  options: scssOptions,
};

// tslint:disable:no-import-side-effect no-implicit-dependencies

// Babel Polyfill
// Refer to: https://babeljs.io/docs/plugins/transform-runtime/
// Refer to: https://github.com/babel/babel-preset-env#usebuiltins
// import '@babel/polyfill'

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity
}

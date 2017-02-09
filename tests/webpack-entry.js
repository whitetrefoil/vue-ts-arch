// See [https://github.com/webpack/karma-webpack]()
// See [https://www.npmjs.com/package/istanbul-instrumenter-loader]()

// require all sources
// const sourcesContext = require.context('../src', true, /\.(js|ts)$/)
// sourcesContext.keys().forEach((source) => {
//   try {
//     console.log(`Requiring source: ${source}`)
//     sourcesContext(source)
//   } catch (e) {
//     console.warn(`Failed requiring source: ${source}`)
//   }
// })

// require all tests
const testsContext = require.context('.', true, /-spec$/)
testsContext.keys().forEach(testsContext)

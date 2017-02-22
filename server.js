/* eslint global-require:0 */

const express = require('express')
const fs      = require('fs')
const path    = require('path')

const serverInfo = `express/${require('express/package.json').version} `
  + `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

// let indexHtml = fs.readFileSync('./dist/index.html', 'utf8')
let renderer = require('vue-server-renderer')
  .createBundleRenderer(fs.readFileSync('./dist/ssr/js/index.js', 'utf8'))

renderer.renderToString({ url: '/hello' }, (err, html) => {
  if (err != null) {
    console.error(err)
    return
  }
  console.log(html)
})

// const app = express()

// app.use(require('serve-static')(path.resolve('./dist'), { index: [] }))
// app.get('*', (req, res) => {
//   res.setHeader('Content-Type', 'text/html')
//   res.setHeader('Server', serverInfo)
//   fs.readFile('./src/index.html', 'utf8', (err, indexHtml) => {
//     if (err != null) {
//       console.error(err.message)
//       res.status(500).send('server error')
//       return
//     }
//     renderer.renderToString(require('./dist/ssr/js/index').root, (err, html) => {
//       if (err != null) {
//         console.error(err.message)
//         res.status(500).send('server error')
//         return
//       }
//       res.send(indexHtml)
//     })
//   })
// })

// app.get('*', (req, res) => {
//   res.setHeader('Content-Type', 'text/html')
//   res.setHeader('Server', serverInfo)
//   fs.readFile('./dist/index.html', 'utf8', (err, indexHtml) => {
//     if (err != null) {
//       res.status(500).send('server error')
//       return
//     }
//     res.send(indexHtml)
//   })
// })

// app.listen(8888, () => {
//   console.log('server started at localhost:8888')
// })

/* eslint global-require:0, no-console:0 */

// Refer to: https://github.com/vuejs/vue-hackernews-2.0/blob/master/server.js

const express = require('express')
const fs      = require('fs')
const lru     = require('lru-cache')

const serverInfo = `express/${require('express/package.json').version} `
  + `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

function parseIndex(template) {
  const contentMarker = '<div id="app"></div>'
  const i             = template.indexOf(contentMarker)
  return {
    head: template.slice(0, i),
    tail: template.slice(i + contentMarker.length),
  }
}

let indexHtml = parseIndex(fs.readFileSync('./dist/index.html', 'utf8'))
let renderer = require('vue-server-renderer')
  .createBundleRenderer(fs.readFileSync('./dist/ssr/js/index.js', 'utf8'), {
    cache: lru({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
  })

// Use below debug code to print an example during starting...
//
// renderer.renderToString({ url: '/hello' }, (err, html) => {
//   if (err != null) {
//     console.error(err)
//     return
//   }
//   console.log(html)
// })

const app = express()

// Static files should be served by nginx.
// app.use(require('serve-static')(path.resolve('./dist'), { index: [] }))

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', serverInfo)
  renderer.renderToString({ url: req.path }, (err, html) => {
    if (err != null) {
      console.error(err.message)
      res.status(500).send('server error')
      return
    }
    res.send(indexHtml.head + html + indexHtml.tail)
  })
})

app.listen(8888, () => {
  console.log('server started at localhost:8888')
})

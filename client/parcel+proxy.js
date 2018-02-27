const proxy = require('http-proxy-middleware')
const Parcel = require('parcel-bundler')
const express = require('express')

const port = Number(process.env.PORT || 1234)
console.log(`Server will be running at http://localhost:${port}`) // eslint-disable-line

express()
  .use(
    '/api',
    proxy({
      target: 'http://127.0.0.1:8080',
      pathRewrite: { '^/api': '' }
    })
  )
  .use(new Parcel('src/index.html').middleware())
  .listen(port)

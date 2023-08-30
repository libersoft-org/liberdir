const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

// make possible to terminate process
var process = require('process')
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})

const app = express()
app.use(cors())
app.use(createProxyMiddleware({
  router: (req) => new URL(req.path.substring(1)),
  pathRewrite: (path, req) => {
    const url = new URL(req.originalUrl.substring(1));
    return url.pathname + url.search;
  
  },
  onProxyReq: (proxyReq) => {
    proxyReq.removeHeader('referer');
  },
  changeOrigin: true,
  logger: console
}))

app.listen(8088, () => {
  console.info('proxy server is running on port 8088')
})
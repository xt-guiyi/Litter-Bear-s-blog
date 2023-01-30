const Koa = require('koa')
const path = require('path')
const Logger = require('koa-logger')
const fs = require('fs/promises')
const Static = require('koa-static')
const manifest = require('../dist/server/ssr-manifest.json')
const { renderToString, ssrRenderStyle } = require('@vue/server-renderer')

const server = new Koa()

// 找到app路口
const appPath = path.join(__dirname, '../dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

server.use(Static(path.join(__dirname, '../dist/client')))

server.use(Logger())
console.log(22, ssrRenderStyle('s'))
server.use(async (ctx, next) => {
  try {
    const { app, router: VueRouter } = createApp()
    await VueRouter.push(ctx.request.url)
    await VueRouter.isReady()
    const appContent = await renderToString(app)
    let result = await fs.readFile(path.join(__dirname, '../dist/client/index.html'), 'utf-8')
    if (result) {
      console.log('result', result)
      console.log('appContent', appContent)
      result = result
        .toString()
        .replace('<div id="app">', `<div id="app">${appContent}`)
      ctx.response.set({
        'Content-Type': 'text/html'
      })
      ctx.body = result
    }
  } catch (error) {
    console.log(error)
  }
})
server.on('error', (err, ctx) => {
  console.error('服务错误:' + err)
})
server.listen(2001, () => {
  console.log('服务启动成功: http://localhost:2001')
})

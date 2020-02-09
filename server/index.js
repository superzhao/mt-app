import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import mongoose from 'mongoose'
import consola from 'consola'
import config from '../nuxt.config.js'
import dbConfig from './config'
import Redis from 'koa-redis'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import passport from './interface/utils/passport'
import user from './interface/user'
import home from './interface/home'
import geo from './interface/geo'
import search from './interface/search'
import category from './interface/category'
const app = new Koa()
config.dev = app.env !== 'production'
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({ key: 'mt', prefix: 'mt:uid', store: new Redis() }))
//koa-bodyparser:处理程序之前，在中间件中对传入的请求体进行解析
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
//koa-json:让 Koa2 支持响应 JSON 数据
app.use(json())
//连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
app.use(passport.initialize())
app.use(passport.session())

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(user.routes(), user.allowedMethods())
  app.use(home.routes(), home.allowedMethods())
  app.use(geo.routes(), geo.allowedMethods())
  app.use(search.routes(), search.allowedMethods())
  app.use(category.routes(), category.allowedMethods())
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

}

start()

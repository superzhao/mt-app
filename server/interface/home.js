import Router from 'koa-router'
import Menu from '../dbs/models/menu'
let router = new Router({
  prefix: '/home'
})
router.get('/getMenu', async (ctx) => {
  try {
    const res = await Menu.findOne();
    ctx.body = {
      code: 0,
      data: res
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: e.message
    }
  }
})
module.exports = router;
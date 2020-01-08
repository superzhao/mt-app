import Router from 'koa-router'
import Poi from '../dbs/models/poi'
let router = new Router({
  prefix: '/search'
})
router.get('/top', async (ctx) => {
  try {
    const res = await Poi.find({
      'name':{$regex: ctx.query.name||'', $options: '$i'},
      'city':'三亚'
    });
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
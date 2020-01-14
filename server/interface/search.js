import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'
let router = new Router({
  prefix: '/search'
})
router.get('/top', async (ctx) => {
  try {
    const res = await Poi.find({
      'name': { $regex: ctx.query.name || '', $options: '$i' },
      'city': '三亚'
    });
    ctx.body = {
      code: 0,
      data: res
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message
    }
  }
})
router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query;
  let {
    status,
    data: {
      count,
      pois
    }
  } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword
    }
  })
  ctx.body = {
    code: 0,
    data: {
      count: status === 200 ? count : 0,
      pois: status === 200
        ? pois
        : []
    }

  }
})
module.exports = router;
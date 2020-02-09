import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'
let router = new Router({
  prefix: '/search'
})
//根据城市和输入框内容返回景点名称列表
router.get('/top', async (ctx) => {
  try {
    // const res = await Poi.find({
    //   'name': { $regex: ctx.query.name || '', $options: '$i' },
    //   'city': '三亚'
    // });
    const res = await axios.get(`http://cp-tools.cn/search/top`, {
      params: {
        input: ctx.query.name || '',
        city: ctx.query.city,
      }
    })
    const data = (res.data && res.data.top) || []
    ctx.body = {
      code: 0,
      data: data
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message
    }
  }
})
//获取热门景点列表
router.get('/getHotPlace', async (ctx) => {
  let city = ctx.store
    ? ctx.store.geo.position.city
    : ctx.query.city
  const { status, data } = await axios.get('http://cp-tools.cn/search/hotPlace', {
    params: {
      city
    }
  })
  if (status == 200) {
    ctx.body = data
  } else {
    ctx.body = {
      code: -1,
      msg: 'error'
    }
  }
})
//根据城市和输入框内容返回产品列表
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
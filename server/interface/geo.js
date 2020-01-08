import Router from'koa-router'
 import axios from './utils/axios'

let router = new Router({
  prefix: '/geo'
})
router.get('/getPosition', async (ctx) => {
  let {
    status,
    data: {
      province,
      city
    }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition`)
  if (status == 200) {
    ctx.body = {
      code: 0,
      msg: '成功',
      data: {
        province,
        city
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请求失败'
    }
  }
})
module.exports = router;
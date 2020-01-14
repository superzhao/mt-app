import Router from 'koa-router'
import axios from './utils/axios'
import City from '../dbs/models/city'
import Province from '../dbs/models/province'
let router = new Router({
  prefix: '/geo'
})
//获取当前省份、城市
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
//所有城市
router.get('/getAllCitis', async (ctx) => {
  // const {status,data}=await axios.get('`http://cp-tools.cn/geo/city`')
  try {
    let city = []
    let res = await City.find()
    res.forEach(item => {
      city = city.concat(item.value)
    })
    ctx.body = {
      code: 0,
      data: city.map(item => {
        return {
          province: item.province,
          id: item.id,
          name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
            ? item.province
            : item.name
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message
    }
  }
})
//热门城市
router.get('/getHotCitis', async (ctx) => {
  let { status, data: {
    hots
  } } = await axios.get(`http://cp-tools.cn/geo/hotCity`);
  if (status === 200) {
    ctx.body = {
      code: 0,
      data: hots
    }
  } else {
    ctx.body = {
      code: 0,
      data: []
    }
  }
})
//所有省份
router.get("/getAllProvince", async (ctx) => {
  try {
    const res = await Province.find({});
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
//根据省份id查询城市
router.get('/getCtyisById', async (ctx) => {
  try {
    const id = ctx.query.id;
    const { value } = await City.findOne({ id: id })
    ctx.body = {
      code: 0,
      data: value
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message
    }
  }
})
module.exports = router;
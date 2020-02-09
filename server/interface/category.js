import Router from 'koa-router'
import axios from './utils/axios'
import Category from '../dbs/models/category'
let router = new Router({
  prefix: '/category'
})
//category
router.get('/findCategoryByCity', async (ctx) => {
  let result = await Category.findOne({ city: ctx.query.city })
  if (result) {
    ctx.body = {
      code: 0,
      data: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'error'
    }
  }
  // let { status, data } = await axios.get('http://cp-tools.cn/category/crumbs', {
  //   params: {
  //     city: ctx.query.city.replace('市', '') || "北京",
  //     sign:'1230739'
  //   }
  // })
  // console.log(status,data,'====')
  // if (status == 200) {
  //   ctx.body = {
  //     code: 0,
  //     data: data
  //   }
  // } else {
  //   ctx.body = {
  //     code: -1,
  //     msg: 'error'
  //   }
  // }

})
module.exports = router;
const mongoose = require('mongoose');
//定义一个描述表结构的Schema
let provinceSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  }
})
//把这个 schema 编译成一个 Model，和表联系起来，model 是我们构造 document 的 Class
module.exports = mongoose.model('Province', provinceSchema)
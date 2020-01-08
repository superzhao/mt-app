const mongoose = require('mongoose');
//定义一个描述表结构的Schema
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})
//把这个 schema 编译成一个 Model，和表联系起来，model 是我们构造 document 的 Class
module.exports = mongoose.model('User', userSchema)
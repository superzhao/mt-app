const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../../dbs/models/user')


passport.use(new LocalStrategy(async function (username, password, done) {
  /**
    * @param username 用户输入的用户名
    * @param password 用户输入的密码
    * @param done 验证验证完成后的回调函数，由passport调用
    */
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))
// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  return done(null, user)
})

module.exports = passport;

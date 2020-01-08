import Router from'koa-router'
import Redis from'koa-redis'
import nodemailer from'nodemailer'
import User from'../dbs/models/user'
import Passport from'./utils/passport'
import Email from'../config'
let router = new Router({
  prefix: '/users'
})
const Store = new Redis().client
// signup 注册
router.post('/signup', async (ctx, next) => {
  const { code, username, password, email } = ctx.request.body
  //校验code
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
      return false
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
    return false
  }
  //校验 username是否已经存在数据库
  const name = await User.find({ username })
  if (name.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已存在'
    }
    return
  }
  // 把注册信息username、password、email存数据库
  const user = await User.create({ username, password, email })
  try {
    user.save()
    ctx.body = {
      code: 0,
      msg: '注册成功',
    }
    return
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: '服务端错误'
    }
    return
  }
})
//verify 发送验证码
router.post('/verify', async (ctx, next) => {
  //校验是不是一分钟之内
  let username = ctx.request.body.username;
  let email = ctx.request.body.email;
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  //发送端信息
  let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  });
  //接受端信息
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email,
    user: username
  }
  //邮件信息
  let mailOptions = {
    from: `《李赵测试网站》<${Email.smtp.user}>`,
    to: ko.email,
    subject: '李赵测试网站验证码',
    html: `${ko.user}您好，您正在《李赵测试网站》注册，验证码是：${ko.code}`
  };
  //发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code)
      Store.hmset(`nodemail:${ko.user}`, 'expire', ko.expire)
      Store.hmset(`nodemail:${ko.user}`, 'email', ko.email)
    }
  });
  //ctx返回值
  ctx.body = {
    code: 0,
    msg: '验证码发送成功'
  }
})
router.post('/signin', async (ctx, next) => {

  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        console.log(user,1111)
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body={
      user:username,
      email
    }
  }else{
    ctx.body={
      user:'',
      email:''
    }
  }
})
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

module.exports = router
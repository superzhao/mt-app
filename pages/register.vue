<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form ref="rForm" :model="rForm" :rules="rules" label-width="100px">
        <el-form-item label="昵称" prop="username">
          <el-input v-model="rForm.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="rForm.email" />
          <el-button size="mini" round @click="onSendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="rForm.code"></el-input>
        </el-form-item>
        <el-form-item label="创建密码" prop="password">
          <el-input v-model="rForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpassword">
          <el-input v-model="rForm.cpassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRegister">同意以下协议并注册</el-button>
          <p>
            <a
              class="f1"
              href="https://rules-center.meituan.com/rules-detail/4"
              target="_blank"
            >《美团点评用户服务协议》</a>
            <a
              class="f1"
              href="https://rules-center.meituan.com/rules-detail/2"
              target="_blank"
            >《美团点评隐私政策》</a>
          </p>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";
export default {
  name: "register",
  layout: "blank",
  data() {
    return {
      statusMsg: "",
      error: "",
      rForm: {
        username: "",
        code: "",
        password: "",
        cpassword: "",
        email: ""
      },
      rules: {
        username: [
          {
            required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            type: "string",
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        cpassword: [
          {
            required: true,
            type: "string",
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, cb) => {
              if (!value) cb("请再次输入密码");
              else if (value !== this.rForm.password) cb("两次输入密码不一致");
              else cb();
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSendMsg() {
      const self = this;
      axios
        .post("/users/verify", {
          username: self.rForm.username,
          email: self.rForm.email
        })
        .then(({ status, data }) => {
          if (status === 200 && data && data.code === 0) {
            let count = 60;
            self.statusMsg = `验证码已发送,剩余${count--}秒`;
            self.timerid = setInterval(function() {
              self.statusMsg = `验证码已发送,剩余${count--}秒`;
              if (count === 0) {
                clearInterval(self.timerid);
                self.statusMsg = "";
              }
            }, 1000);
          } else {
            self.$message.error(data.msg);
          }
        });
    },
    onRegister() {
      let self = this;
      this.$refs["rForm"].validate(valid => {
        if (valid) {
          axios
            .post("/users/signup", {
              username: window.encodeURIComponent(self.rForm.username),
              password: CryptoJS.MD5(self.rForm.password).toString(),
              email: self.rForm.email,
              code: self.rForm.code
            })
            .then(({ status, data }) => {

              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = "/login";
                } else {
                  this.$message.error(data.msg);
                }
              } else {
                this.$message.error(`服务器出错，错误码:${status}`);
              }
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/register/index.scss";
</style>
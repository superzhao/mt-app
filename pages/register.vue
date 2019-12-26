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
        <el-form-item label="昵称" prop="name">
          <el-input v-model="rForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="rForm.email" />
          <el-button size="mini" round @click="omSendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="rForm.code"></el-input>
        </el-form-item>
        <el-form-item label="创建密码" prop="pwd">
          <el-input v-model="rForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="rForm.cpwd"></el-input>
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
export default {
  name: "register",
  layout: "blank",
  data() {
    return {
      statusMsg: "",
      error: "",
      rForm: {
        name: "",
        code: "",
        pwd: "",
        cpwd: "",
        email: ""
      },
      rules: {
        name: [
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
        pwd: [
          {
            required: true,
            type: "string",
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        cpwd: [
          {
            required: true,
            type: "string",
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, cb) => {
              if (!value) cb("请再次输入密码");
              else if (value !== this.rForm.pwd) cb("两次输入密码不一致");
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
      console.log("submit!");
    },
    onRegister() {
      console.log("onRegister!");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/register/index.scss";
</style>
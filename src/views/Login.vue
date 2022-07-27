<template>
  <el-form
    :model="form"
    :rules="rules"
    status-icon
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login-submit">
      <el-button type="primary" @click="login" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import Mock from 'mockjs'
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名！", trigger: "blur" },
          { min: 3, message: "用户名长度不能小于3位！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码！", trigger: "blur" },
          { min: 6, message: "用户名长度不能小于6位！", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录方法
    login() {
      // 将用户名和密码提交后台返回数据
      this.$http.post('/permission/getMenu', this.form).then(res => {
        console.log(res,'nbnbnbnbn')
        if(res.data.code === 20000) {
          // 校验正确以后，将后台返回的token值存储并跳转页面
          this.$store.commit('setToken', res.data.data.token)
          this.$router.push({ name: 'home' })
        } else {
          // 校验失败，返回错误提示
          this.$message.warning(res.data.data.message)
        }
      })
      // // 使用Mock模拟后端传过来的token值
      // const token = Mock.Random.guid()
      // // 将token值存储
      // this.$store.commit('setToken', token)
      // // 跳转页面
      // this.$router.push({ name: 'home' })

    }
  }
};
</script>

<style lang='less' scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6 ;

    .login-title {
      margin: 0 auto 40px;
      text-align: center;
      color: #505458;
    }

    .login-submit {
      margin: 10px 0 0 20px;
    }
  }

  // .el-form-item__content {
  //   margin-left: 0!important
  // }
  
</style>
<template>
  <div class="login_warp">
    <div class="login_box">
      <div class="logo">
        <img src="./images/logo.png" />
        黑马面面
        <span></span>
        用户登陆
      </div>
      <el-form ref="lorginForm" :m；odel="form" label-width="48px" class="login_form" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-col :span="17">
            <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="7">
            <span class="login_code">
              <img src="./images/login_code.png" alt />
            </span>
          </el-col>
        </el-form-item>
        <el-form-item prop='checked'>
          <el-checkbox v-model="form.checked" class="login_agree">
            我已阅读
            <el-link type="primary">主要链接</el-link>和
            <el-link type="primary">主要链接</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-col :span="24">
            <el-button type="primary" @click="onSubmit" style="width:100%;margin:28px 0">登陆</el-button>
          </el-col>
          <el-col :span="24">
            <el-button type="primary" @click="onSubmit" style="width:100%">注册</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        code: "",
        checked:false
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        checked: [{ pattern:/true/, message: "验证码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.lorginForm.validate(v=>{
        if(v){
          alert('全部通过')
        }
      })
    }
  }
};
</script>

<style lang='less'>
.login_warp {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .login_box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 41px;

    .logo {
      font-size: 22px;
      margin: 50px 0 32px 0;
      img {
        margin: 0 16px 0 48px;
      }
      span {
        display: inline-block;
        width: 1px;
        height: 23px;
        background-color: #c7c7c7;
        margin: 0 14px;
      }
    }
    .login_code {
      img {
        width: 100%;
        height: 42px;
      }
    }
    .login_agree {
      display: flex;
      align-items: center;
    }
  }
}
</style>
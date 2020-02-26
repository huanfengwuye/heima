// 注册模态框组件
<template>
  <el-dialog title="用户注册" width="603px" center :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="regForm">
      <el-form-item label="头像" prop="avater" :label-width="formLabelWidth">
        <el-upload
          v-model="form.avater"
          name="image"
          class="avatar-uploader"
          :action="updateUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth" prop="imgcode">
        <el-col :span="16">
          <el-input v-model="form.imgcode" autocomplete="off"></el-input>
        </el-col>

        <el-col class="login_imgcode" :span="7" :offset="1">
          <img :src="picCodeUrl" alt @click="gitNewcode" />
        </el-col>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
        <el-col :span="16">
          <el-input v-model="form.rcode" autocomplete="off"></el-input>
        </el-col>

        <el-col class="login_imgcode" :span="7" :offset="1">
          <el-button @click="gitPhonecode" :disabled="sec!=0">{{sec==0?'获取手机验证码':"还有"+sec+"秒"}}</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="regClose">取 消</el-button>
      <el-button type="primary" @click="doRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from 'axios'
import { sendSMS, register } from "@/api/register";
// vue.cil中@做路径代表/src文件夹
export default {
  data() {
    return {
      // 图片上传到的地址
      updateUrl: process.env.VUE_APP_URL + "/uploads",
      // 上传的图片临时路径
      imageUrl: "",
      // 手机验证码倒计时
      sec: 0,
      // 图片验证码url地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 模态框是否显示
      dialogFormVisible: false,
      //   form表单绑定数据
      form: {
        avater: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        imgcode: "",
        rcode: "",

        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      //   表单验证规则
      rules: {
        // 头像
        avater: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        imgcode: [
          { required: true, message: "图片验证码不能为空", trigger: "blur" },
          { len: 4, message: "图片验证码为4位", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "手机验证码不能为空", trigger: "blur" },
          { len: 4, message: "手机验证码为4位", trigger: "change" }
        ],
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 16, message: "密码在5~16位之间", trigger: "change" }
        ]
      },
      //   字体与边框间隔
      formLabelWidth: "75px"
    };
  },
  methods: {
    regClose() {
      this.$refs.regForm.resetFields();
      this.dialogFormVisible = false;
    },
    // 验证全部表单元素
    doRegister() {
      this.$refs.regForm.validate(v => {
        if (v) {
          // console.log(this.form.avater);
          // return;
          // alert("全部通过");
          register({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avater,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("注册成功");
              // 重置表单
              this.$refs.regForm.resetFields();
              this.imageUrl = "";
              this.dialogFormVisible = false;
             
              //   console.log(res);
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    //获取图片验证码
    gitNewcode() {
      this.picCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&tt=" + Date.now();
    },
    //获取手机验证码
    gitPhonecode() {
      // 判断手机号是否合法
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        this.$message.error("手机号码格式错误");
        return;
      }
      // 判断验证码是否合法
      if (this.form.imgcode.length != 4) {
        this.$message.error("验证码格式不正确");
        return;
      }
      this.sec = 60;
      let timeId = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timeId);
        }
      }, 1000);
      //   发送请求获取短信验证
      // axios({
      //     url:process.env.VUE_APP_URL+'/sendsms',
      //     method:'POST',
      //     data: {
      //         code:this.form.imgcode,
      //         phone:this.form.phone
      //     },
      //     withCredentials:true
      // }).then(res=>{
      //     //成功回调
      //     if(res.data.code==200){
      //         this.$message.success('获取成功，手机验证码为'+res.data.data.captcha)
      //         // alert('手机验证码为'+res.data.data.captcha)
      //     }else{
      //         this.$message.error(res.data.message)
      //         // alert(res.data.message)
      //     }
      //     console.log(res)
      // });
      sendSMS({
        code: this.form.imgcode,
        phone: this.form.phone
      }).then(res => {
        //成功回调
        if (res.data.code == 200) {
          this.$message.success(
            "获取成功，手机验证码为" + res.data.data.captcha
          );
          // alert('手机验证码为'+res.data.data.captcha)
        } else {
          this.$message.error(res.data.message);
          // alert(res.data.message)
        }
      });
    },
    // 上传成功后调用的钩子
    handleAvatarSuccess(res, file) {
      // console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avater = res.data.file_path;
      // console.log(this.form.avater);
      // 对头像属性进行单独校验
      // window.console.log(this.form.avatar);
      this.$refs.regForm.validateField("avatar");
    },
    // 上传前调用的钩子
    beforeAvatarUpload(file) {
      // 控制允许上传文件类型
      const isJPG = file.type === "image/jpg" || "image/png" || "image/gif";
      // 控制允许上传的文件大小
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 返回true则上传，返回false则不上传
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang='less'>
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
}
.el-dialog__title {
  font-size: 17px;
  color: white;
}
.login_imgcode {
  img {
    width: 100%;
    height: 41px;
  }
}
// 上传部分样式
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
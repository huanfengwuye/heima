<template>
  <el-container class="index_box">
    <el-header class="my_header">
      <!-- 头部左边部分 -->
      <div class="left">
        <i :class='!isCollapse?"el-icon-s-fold":"el-icon-s-unfold"' @click="isCollapse=!isCollapse"></i>
        <img src="./images/index_login.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 头部右边部分 -->
      <div class="right">
        <img :src="avatar" alt />
        <span class="name">{{username}}</span>
        <el-button type="primary" size="small" @click="doLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧部分 -->
      <el-aside width="auto" class="my_aside">
          <!-- 菜单 -->
        <el-menu :default-active="indexOlder" router class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="/index/chart">
            <i class="el-icon-time"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体中间部分 -->
      <el-main class="my_main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {  logout } from "@/api/index.js";
import { getToken,removeToken } from '@/utils/token.js'
export default {
  data() {
    return {
      indexOlder:this.$route.path,
      avatar: this.$store.state.avatar,
      username: this.$store.state.username,
      isCollapse: false
    };
  },
  beforeCreate() {
    if(getToken()==null){
      this.$message.error('请先登录')
      this.$router.push('/login')
    }
  },
  created() {
    // console.log(this.indexOlder);
    // info().then(res => {
    //   // console.log(res);
    //   if(res.data.code==200){
    //     this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    //     this.username = res.data.data.username;
    //     // console.log(this.avatar,this.username);

    //   }
    // });
  },
  methods: {
    // 退出按钮点击事件
    doLogout() {
      this.$confirm("此操作将退出本系统, 是否继续?", "是否退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 退出登录请求
          logout().then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("退出成功");
              // 清空vuex里的数据
              this.$store.commit('changeusername',''),
              this.$store.commit('changeavatar','')
            }
            removeToken()
            this.$router.push("/login");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "欢迎继续使用"
          });
        });
    }
  }
};
</script>

<style lang='less'>
.index_box {
  height: 100%;
}
.my_header {
  //   background-color: pink;
  height: 60px;
  display: flex;
  justify-content: space-between;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    i {
      font-size: 28px;
    }
    img {
      width: 33px;
      height: 28px;
      margin: 0 11px 0 22px;
    }
    span {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 43px;
      height: 43px;
    }
    span.name {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
      margin: 0 38px 0 9px;
    }
  }
}
// .my_aside {
//   background-color: yellowgreen;
// }
.my_main {
  background-color: skyblue;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 注册路由
Vue.use(VueRouter)
// 准备组件
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import user from '../views/index/user/index.vue'
import business from '../views/index/business/business.vue'
import chart from '../views/index/chart/chart.vue'
import question from '../views/index/question/question.vue'
import subject from '../views/index/subject/subject.vue'
import { info } from "@/api/index.js";
import { removeToken } from '@/utils/token.js'
import { Message } from 'element-ui';
import store from '../store/index.js'
// import nProgress from 'nprogress'
// 设置路由规则
const routes = [
  {
    path: '/',
    redirect: '/login',
    meta:{title:'登陆'}
  },
  {
    path: '/login',
    component: login,
    meta:{title:'登陆'}

  },
  {
    path: '/index',
    component: index,
    meta:{title:'首页'},

    children: [
      { path: 'user', component: user, meta:{title:'用户列表'},  },
      { path: 'business', component: business, meta:{title:'企业列表'},},
      { path: 'chart', component: chart,meta:{title:'数据概览'}, },
      { path: 'question', component: question,meta:{title:'题库列表'}, },
      { path: 'subject', component: subject, meta:{title:'学科列表'},},



    ]
  }
]
// 路由白名单
let witeUrl=['/login']

// 创建路由对象
const router = new VueRouter({
  routes
})
// 前置导航守位
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // 开启进度条
  NProgress.start()
  if (witeUrl.includes(to.path)) {
    next()
  } else {
    // 判断token值真假
    info().then(res => {
      // console.log(res);
      if (res.data.code == 206) {
        Message.error('登陆状态异常，请重新登陆')
        removeToken()
        // this.$router.push('/login')
        NProgress.done()
        next('/login')
      }else if(res.data.code == 200){
        // this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
        // this.username = res.data.data.username;
        store.commit('changeusername',res.data.data.username)
        store.commit('changeavatar',process.env.VUE_APP_URL + "/" + res.data.data.avatar)
        next()
      }
    });
  }
})
// 后置导航守卫
router.afterEach((to) => {
  // to and from are both route objects.
  // 关闭进度条
  NProgress.done()
  document.title=to.meta.title
})
// 将router暴露出去
export default router 
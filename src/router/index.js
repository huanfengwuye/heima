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
// import nProgress from 'nprogress'
// 设置路由规则
const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path:'/index',
    component:index,
    children:[
      { path:'user',component:user,},
      { path:'business',component:business,},
      { path:'chart',component:chart,},
      { path:'question',component:question,},
      { path:'subject',component:subject,},



    ]
  }
]


// 创建路由对象
const router = new VueRouter({
  routes
})
// 前置导航守位
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // 开启进度条
  NProgress.start()
  next()
})
// 后置导航守卫
router.afterEach(() => {
  // to and from are both route objects.
  // 关闭进度条
  NProgress.done()
})
// 将router暴露出去
export default router 
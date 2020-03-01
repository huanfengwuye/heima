import Vue from 'vue'
import App from './App.vue'
// 引入全局样式
import './style/base.css'
// 导入element插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


// 导入router
import router from './router/index'
// 导入vuex仓库实例
import store from './store/index'
Vue.config.productionTip = false
// 导入全局过滤器
import "./filters/filters"

// 挂载到vue实例
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

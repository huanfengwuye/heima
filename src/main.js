import Vue from 'vue'
import App from './App.vue'

// 导入router
import router from './router/index'
Vue.config.productionTip = false

// 挂载到vue实例
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

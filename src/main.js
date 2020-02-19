import Vue from 'vue'
import App from './App.vue'
// 导入element插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


// 导入router
import router from './router/index'
Vue.config.productionTip = false

// 挂载到vue实例
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

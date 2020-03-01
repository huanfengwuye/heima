// Vuex组件导入及注册
import Vue from 'vue'
import Vuex from 'vuex'
// 注册
Vue.use(Vuex)
// 实例化仓库对象
const store = new Vuex.Store({
    state:{
        // 放数据 
        username:'',
        avatar:'',
    },
    mutations:{
        // 放方法
        // 修改用户名
        changeusername(state,val){
            state.username=val
        },
        // 修改头像
        changeavatar(state,val){
            state.avatar=val
        }
    }
})
// 暴露store
export default store
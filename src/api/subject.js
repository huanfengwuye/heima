// 这里写subject模块请求
import axios from 'axios'
import { getToken } from '@/utils/token.js'
let subjectRequext =axios.create({
    baseURL:process.env.VUE_APP_URL,
    withCredentials:true,
})
// 请求拦截
// 添加请求拦截器
subjectRequext.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token=getToken()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
//   subject模块请求
export function subjectList(params){
   return subjectRequext({
        url:"/subject/list",
        method:'get',
        params,
    })
}
// 改变状态请求
export function statusRequest(params){
    return subjectRequext({
        url:"/subject/status",
        method:'get',
        params,
    })
}
// 添加学科请求
export function subjectAdd(data){
    return subjectRequext({
        url:"/subject/add",
        method:'post',
        data
    })
}
// 编辑学科请求
export function subjectEdit(data){
    return subjectRequext({
        url:'/subject/edit',
        method:'post',
        data
    })
}
// 删除学科请求
export function subjectDel(data){
    return subjectRequext({
        url:'/subject/remove',
        method:'post',
        data
    })
}
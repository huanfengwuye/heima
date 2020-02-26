// 这里放登录相关的请求
import axios from 'axios'

// 暴露一个登陆请求函数
export function login (data){
    return axios({
        url:process.env.VUE_APP_URL+'/login',
        method:'post',
        data,
        withCredentials:true,
    })
}
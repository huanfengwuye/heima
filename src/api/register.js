// 注册的axios请求函数
import axios from 'axios'
// 注册的手机验证码请求
export function sendSMS(data){
    return axios({
        url:process.env.VUE_APP_URL+'/sendsms',
        method:'post',
        data,
        withCredentials:true,
    })
}
// 注册的请求
export function register(data){
    return axios({
        url:process.env.VUE_APP_URL+'/register',
        method:'post',
        data,
        withCredentials:true,
    })
}
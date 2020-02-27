// 首页的请求
import axios from 'axios'
import { getToken } from '@/utils/token.js'
// 获取用户信息
const indexRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
   
})
// 添加请求拦截器在发送indexRequest请求时拦截下来
indexRequest.interceptors.request.use(function (config) {
    // 在发送请求之前给axios请求头加一个token值
    config.headers.token=getToken()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

export function info() {
    //    return axios({
    //         url:process.env.VUE_APP_URL+'/info',
    //         method:'get',
    //         headers:{
    //             token:getToken()
    //         }
    //     })
    return indexRequest({
        url: '/info',
        method: 'get'
    })
}
// 退出登录
export function logout() {
    // return axios({
    //     url: process.env.VUE_APP_URL + '/logout',
    //     method: 'get',
    //     headers: {
    //         token: getToken()
    //     }
    // })
    return indexRequest({
        url: '/logout',
        method: 'get'
    })
}
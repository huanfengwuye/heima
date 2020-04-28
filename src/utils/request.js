// 这里写business模块请求
import axios from 'axios'
import { getToken } from '@/utils/token.js'
let request =axios.create({
    baseURL:process.env.VUE_APP_URL,
    withCredentials:true,
})
// 请求拦截
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token=getToken()
    return config;
  }, 
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  export default request
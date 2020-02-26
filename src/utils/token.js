// 这里写操作token的方法
const TOKENKEY='token'
// 获取token
export function getToken(){
    return window.localStorage.getItem(TOKENKEY)
};
// 设置token
export function setToken(Data){
window.localStorage.setItem(TOKENKEY,Data)
}
// 删除token
export function removeToken(){
    window.localStorage.removeItem(TOKENKEY)
}
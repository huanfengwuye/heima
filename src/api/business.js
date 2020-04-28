// 这里写business模块请求
import request from "@/utils/request"
//   列表请求
export function busList(params){
   return request({
        url:"/enterprise/list",
        method:'get',
        params,
    })
}
// 改变状态请求
export function statusRequest(data){
    return request({
        url:"/enterprise/status",
        method:'post',
        data,
    })
}
// 添加请求
export function busAdd(data){
    return request({
        url:"/enterprise/add",
        method:'post',
        data
    })
}
// 编辑请求
export function busEdit(data){
    return request({
        url:'/enterprise/edit',
        method:'post',
        data
    })
}
// 删除请求
export function busDel(data){
    return request({
        url:'/enterprise/remove',
        method:'post',
        data
    })
}
import request from "@/utils/request"


// 获取用户列表
export function userList (params){

    return request({
        url:'/user/list',
        params
    })
}

// 用户信息编辑
export function userEdit(data){
    return request({
        url:'/user/edit',
        method: 'post',
        data
    })
}
// 用户状态修改
export function userStatus(data){
    return request({
        url:'/user/status',
        method: 'post',
        data
    })
}
// 添加新用户
export function userAdd(data){
    return request({
        url:'/user/add',
        method: 'post',
        data
    })
}
// 删除用户
export function userremove(data){
    return request({
        url:'/user/remove',
        method: 'post',
        data
    })
}
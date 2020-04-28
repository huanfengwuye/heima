// 这里写subject模块请求
import request from '@/utils/request'
//   subject模块请求
export function subjectList(params) {
    return request({
        url: "/subject/list",
        method: 'get',
        params,
    })
}
// 改变状态请求
export function statusRequest(params) {
    return request({
        url: "/subject/status",
        method: 'get',
        params,
    })
}
// 添加学科请求
export function subjectAdd(data) {
    return request({
        url: "/subject/add",
        method: 'post',
        data
    })
}
// 编辑学科请求
export function subjectEdit(data) {
    return request({
        url: '/subject/edit',
        method: 'post',
        data
    })
}
// 删除学科请求
export function subjectDel(data) {
    return request({
        url: '/subject/remove',
        method: 'post',
        data
    })
}
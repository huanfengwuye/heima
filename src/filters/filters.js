import Vue from 'vue'
import moment from 'moment'
// 准备一个过滤器
// 参数1：过滤器的名字
//参数2：过滤器的具体实现方法
Vue.filter('formateTime', function (value) {
    return moment(value).format('YYYY-MM-DD')
})
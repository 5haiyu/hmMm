// 封装与登录相关的网络请求
import axios from 'axios'
// 创建一个新的axios对象 设置基准地址
let instance = axios.create({
    baseURL: process.env.VUE_APP_URL
})

// 登录接口的抽取
export function apiLogin({
    phone,
    password,
    code
}) {
    return instance({
        url: '/login',
        method: 'POST',
        data: {
            phone,
            password,
            code
        },
        // 跨域必须携带 cookie
        withCredentials: true
    })
}
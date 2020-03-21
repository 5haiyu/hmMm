// 封装首页的axios请求

import axios from 'axios'
let instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // 跨域必须携带 cookie
    withCredentials: true
})
// 通过token获取用户信息
export function apiInfo() {
    return instance({
        url: '/info',
        headers: {
            token: window.localStorage.getItem('hmMm')
        }
    })
}
// 通过token退出用户登录
export function apiLogout() {
    return instance({
        url: '/logout',
        headers: {
            token: window.localStorage.getItem('hmMm')
        }
    })
}

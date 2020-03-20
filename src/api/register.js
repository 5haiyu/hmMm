import axios from 'axios'
// 获取短信验证码
export function apiGetCode({
    code,
    phone
}) {
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
            code,
            phone
        },
        // 跨域必须携带 cookie
        withCredentials: true
    })
}
// 注册
export function apiRegister({
    username,
    phone,
    email,
    avatar,
    password,
    rcode
}) {
    return axios({
        url: process.env.VUE_APP_URL + "/register",
        method: 'POST',
        data: {
            username,
            phone,
            email,
            avatar,
            password,
            rcode
        }
    })
}
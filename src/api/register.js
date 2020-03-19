import axios from 'axios'
export function apiGetCode(code, phone) {
    return axios({
        url: process.env.VUE_APP_ONLINEURL + "/sendsms",
        method: "post",
        data: {
            code: code,
            phone: phone
        },
        // 跨域必须携带 cookie
        withCredentials: true
    })
}
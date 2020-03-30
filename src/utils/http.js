import axios from 'axios'
import { getToken } from '../utils/token'
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
// 请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在这里将 token 设置到请求拦截器
        // config：当前请求的所有相关信息
        config.headers.token = getToken();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
// 响应拦截器
instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance
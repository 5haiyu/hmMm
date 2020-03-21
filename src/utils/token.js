//  封装用来处理localstorage的方法
// 定义一个统一的key
const TOKEN_KEY = 'hmMm'

// 设置toke
export function setToken(value) {
    // 将value对象转为字符串
    // let strValue = JSON.stringify(value);
    window.localStorage.setItem(TOKEN_KEY, value)
}
// 获取token
export function getToken() {
    // 取出时需要将内容用return 返回给外界
    return window.localStorage.getItem(TOKEN_KEY)
}

// 删除token
export function removeToken() {
    window.localStorage.removeItem(TOKEN_KEY)
}
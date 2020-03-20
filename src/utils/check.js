// 封装正则校验方法
// 手机号码校验
export function regPhone(rule, value, callback) {
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback("手机号不正确！");
    }
}

// 邮箱校验
export function regEmail(rule, value, callback) {
    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value)) {
        callback();
    } else {
        callback("邮箱不正确！");
    }
}
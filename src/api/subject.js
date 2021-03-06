import instance from '../utils/http'
// 封装请求学科列表的方法
export function subject({
    name,
    page,
    limit,
    rid,
    username,
    status
}) {
    return instance({
        url: '/subject/list',
        params: {
            name,
            page,
            limit,
            rid,
            username,
            status
        }
    })
}
// 封装改变学科状态（启用/禁用）的方法
export function status(id) {
    return instance({
        url: '/subject/status',
        method: 'POST',
        data: {
            id
        }
    })
}

// 封装添加学科的方法
export function addData({
    rid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/subject/add',
        method: 'POST',
        data: {
            rid,
            name,
            short_name,
            intro,
            remark
        }
    })
}
// 封装编辑学科的方法
export function editData(data) {
    return instance({
        url: '/subject/edit',
        method: 'POST',
        data: data
    })
}

// 封装删除学科的方法
export function delData(id){
    return instance({
        url:'/subject/remove',
        method: 'POST',
        data:{
            id
        }
    })
}
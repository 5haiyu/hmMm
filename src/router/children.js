// 导入子组件
import chart from '../views/chart'
import user from '../views/user'
import question from '../views/question'
import enterprise from '../views/enterprise'
import subject from '../views/subject'

export default [{
    path: '/chart',
    component: chart,
    meta: {
        title: '数据概览',
        roles:['学生','超级管理员','管理员'],
        icon: "el-icon-pie-chart"
    }
},
{
    path: '/user',
    component: user,
    meta: {
        title: '用户列表',
        roles:['管理员','超级管理员'],
        icon: "el-icon-user"
    }
},
{
    path: '/question',
    component: question,
    meta: {
        title: '题库列表',
        roles:['学生','超级管理员','管理员'],
        icon: "el-icon-edit"
    }
},
{
    path: '/enterprise',
    component: enterprise,
    meta: {
        title: '企业列表',
        roles:['管理员','超级管理员','管理员'],
        icon: "el-icon-office-building"
    }
},
{
    path: '/subject',
    component: subject,
    meta: {
        title: '学科列表',
        roles:['学生','超级管理员','管理员'],
        icon: "el-icon-refrigerator"
    }
}
]
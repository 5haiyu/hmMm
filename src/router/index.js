// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// 使用vue-router
Vue.use(VueRouter)
// 实例化vue-router对象
// 导入组件
import login from '../views/login/index'
import index from '../views/index/index'

// 导入子组件
import chart from '../views/chart'
import user from '../views/user'
import question from '../views/question'
import enterprise from '../views/enterprise'
import subject from '../views/subject'
// 导入全局样式
import '../style/index.css'

const router = new VueRouter({
    routes: [{
            path: '/login',
            component: login
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/index',
            component: index,
            children: [{
                    path: '/chart',
                    component: chart
                },
                {
                    path: '/user',
                    component: user
                },
                {
                    path: '/question',
                    component: question
                },
                {
                    path: '/enterprise',
                    component: enterprise
                },
                {
                    path: '/subject',
                    component: subject
                }
            ]
        }
    ]
})
// 将实例化的router对象暴露出去
export default router
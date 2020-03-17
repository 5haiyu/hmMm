// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// 使用vue-router
Vue.use(VueRouter)
// 实例化vue-router对象
// 导入组件
import Login from '../views/login/index'
import useElement from '../views/useElement/index'

// 导入全局样式
import '../style/index.css'

const router = new VueRouter({
    routes: [{
        path: '/Login',
        component: Login
    },
    {
        path: '/useElement',
        component: useElement
    }]
})
// 将实例化的router对象暴露出去
export default router
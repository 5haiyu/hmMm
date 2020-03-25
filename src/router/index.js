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
// 导入nprogress样式和脚本
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入token方法
import {
    getToken
} from '../utils/token'

// 导入根据token hmMm获取用户信息的方法
import {
    apiInfo
} from '../api/index'
// 导入message
import {
    Message
} from 'element-ui'

// 导入vuex.store
import store from '../vuex/store'

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
                    component: chart,
                    meta: {
                        title: '数据概览'
                    }
                },
                {
                    path: '/user',
                    component: user,
                    meta: {
                        title: '用户列表'
                    }
                },
                {
                    path: '/question',
                    component: question,
                    meta: {
                        title: '题库列表'
                    }
                },
                {
                    path: '/enterprise',
                    component: enterprise,
                    meta: {
                        title: '企业列表'
                    }
                },
                {
                    path: '/subject',
                    component: subject,
                    meta: {
                        title: '学科列表'
                    }
                }
            ]
        }
    ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
    // window.console.log(to)
    // 如果if有路由元信息 则利用路由元信息修改title 
    if (to.meta.title) {
        document.title = to.meta.title
    }
    NProgress.start();
    // 判断是否请求的是登录页面
    if (to.path !== '/login') {
        // 判断用户是否登录
        if (!getToken()) {
            // 未登录 跳转到login页 并提示
            Message.error('未登录');
            NProgress.done();
            next('/login');
        } else {
            // 已登录
            // 判断 token 是否为真
            apiInfo().then(res => { // 得到用户的信息
                // 判断状态
                if (res.data.code === 200) {
                    // 说明 token 为真
                    let data = {}
                    data.userInfo = res.data.data.username
                    data.avatarUrl = process.env.VUE_APP_URL + "/" + res.data.data.avatar
                    store.commit('setInfo', data)
                    next();
                } else if (res.data.code === 206) {
                    // 说明 token 为假
                    Message.error("未登录");
                    // 关闭进度条
                    NProgress.done();
                    // 说明 token 为假
                    next("/login");
                }
            });
        }
    } else {
        next()
    }
})
// 导航后置钩子
router.afterEach(() => {
    NProgress.done();
})
// 关闭右上角的圈圈
NProgress.configure({
    showSpinner: false
});
// 将实例化的router对象暴露出去
export default router
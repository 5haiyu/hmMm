// 导入了 vue
import Vue from 'vue'
// 导入了 App.vue （根组件）
import App from './App.vue'
//导入router
import router from './router/index'
// 导入element ui
import ElementUI from 'element-ui'
// 导入 elementui 的样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入全局样式
import './style/index.css'
// 使用 element
Vue.use(ElementUI);

// 导入vuex.store
import store from './vuex/store'

Vue.config.productionTip = false

// 创建了一个新的 vue 实例
new Vue({
  render: h => h(App),
  // 将router挂载到vue实例中
  router,
  store
}).$mount('#app')
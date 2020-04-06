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
// 导入过滤器
import './filter/fliter'

// 导入全局组件
import ent from './components/entCom'
import sub from './components/subCom'
import city from './components/city' //省市区组件

Vue.component('entCom', ent)
Vue.component('subCom', sub)
Vue.component('cityCom', city)

// 导入富文本编辑框
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 使用富文本编辑框
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false

// 创建了一个新的 vue 实例
new Vue({
  render: h => h(App),
  // 将router挂载到vue实例中
  router,
  store
}).$mount('#app')
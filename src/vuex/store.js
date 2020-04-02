import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: '',
        avatarUrl: '',
        role: ''
    },
    mutations: {
        setInfo(state, data) {
            state.userInfo = data.userInfo;
            state.avatarUrl = data.avatarUrl
        },
        // 传入所处角色
        setRole(state, data) {
            state.role = data
        }
    }
})

export default store
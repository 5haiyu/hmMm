import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: '',
        avatarUrl: ''
    },
    mutations: {
        setInfo(state,data) {
            state.userInfo = data.userInfo;
            state.avatarUrl = data.avatarUrl
        }
    }
})

export default store
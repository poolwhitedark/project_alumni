// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		user_id: '123132'
	},
	mutations: {
		setUser_id(state, id) {
			state.user_id = id
			uni.setStorage({
				key: 'user_id',
				data: state.user_id
			})
		}
	}
})
export default store

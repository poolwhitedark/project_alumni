import Vue from 'vue'
import Router, {
	RouterMount
} from 'uni-simple-router';

Vue.use(Router)
//初始化
const router = new Router({
	routes: [...ROUTES] //路由表
});
let token = ''


console.log('token', token)
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	uni.getStorage({
		key: 'token',
		success(res) {
			if (res.data == 'ok') return token = res.data
		}
	})
	console.log(token,to, 'token');
	if (to.path !== '/pages/login/login' && to.path !== '/pages/login/register/register' &&
		token === '') {
		next('/pages/login/login');
		
	} else if (to.path == '/pages/login/login' && token !== '') {
		next('/pages/home/index');
	} else {
		next()
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log('afterEach----守卫')
})

export {
	RouterMount,
	router
}

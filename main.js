import Vue from 'vue'
import App from './App'
import store from 'store/index.js'
import {
	RouterMount
} from './router'
//axios引入
import axios from 'axios'
Vue.prototype.$http = axios
// Vue.prototype.$http.defaults.baseURL = ''
//md5加密
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
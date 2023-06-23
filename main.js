// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from "./store/store.js"

Vue.config.productionTip = false

uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api'

$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})
}

$http.afterRequest = function() {
	uni.hideLoading()
}

uni.$showMsg = (title = '数据加载失败！！！', duration = 1500) => {
	uni.showToast({
		icon: 'none',
		title,
		duration
	})
}


App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif
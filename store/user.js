export default {

	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}')
	}),

	mutations: {
		addAddress(state, address) {
			state.address = address
			this.commit('user/saveAddress')
		},
		saveAddress(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo
			this.commit('user/saveUserInfo')
		},
		saveUserInfo(state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('user/saveToken')
		},
		saveToken(state) {
			uni.setStorageSync('token', JSON.stringify(state.token))
		},
		delToken(state) {
			uni.removeStorageSync('token')
		}
	},

	getters: {
		addr(state) {
			const {
				provinceName,
				cityName,
				countyName,
				detailInfo
			} = state.address
			return provinceName + cityName + countyName + detailInfo
		}
	}
}
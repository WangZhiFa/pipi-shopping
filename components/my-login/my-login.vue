<template>
	<view>
		<view class="login-box">
			<uni-icons type="contact-filled" size="150" color="gray"></uni-icons>
			<button type="primary" class="login-btn" @click="getUserInfo">一键登录</button>
			<text class="login-tips">登录后尽享更多权益</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('user', ['updateUserInfo','updateToken']),
			async getUserInfo() {
				const [err, res] = await uni.getUserProfile({
					desc: '授权个人信息'
				})

				if (err) return uni.$showMsg('授权失败')

				this.updateUserInfo(res.userInfo)

				this.getToken(res)
			},
			async getToken(res) {
				const [err, data] = await uni.login()
				if (err || data.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				
				// const query = {
				// 	code: data.code,
				// 	encryptedData: res.encryptedData,
				// 	iv: res.iv,
				// 	rawData: res.rawData,
				// 	signature: res.signature
				// }
				//接口已挂
				// const result = await uni.$http.post('/public/v1/users/wxlogin',query)
				this.updateToken(data.code)
			}
		}
	}
</script>

<style lang="scss">
	.login-box {
		display: flex;
		height: 750rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f4f4f4;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.login-btn {
			width: 90%;
			border-radius: 50px;
		}

		.login-tips {
			margin-top: 10px;
			font-size: 12px;
			color: gray;
		}
	}
</style>
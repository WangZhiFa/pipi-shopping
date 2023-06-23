<template>
	<view class="login-info-container">
		<view class="top-box">
			<view class="avatar-box">
				<image :src="userInfo.avatarUrl"></image>
			</view>
			<text>{{userInfo.nickName}}</text>
		</view>

		<view class="panel-container">
			<view class="panel1-box">
				<view>
					<text>8</text>
					<text class="text">收藏的店铺</text>
				</view>
				<view>
					<text>14</text>
					<text class="text">收藏的商品</text>
				</view>
				<view>
					<text>18</text>
					<text class="text">关注的商品</text>
				</view>
				<view>
					<text>83</text>
					<text class="text">足迹</text>
				</view>
			</view>
			
			<view class="panel2-box">
				<view class="title">
					<text>我的订单</text>
				</view>
				<view class="list">
					<view>
						<image src="../../static/my-icons/icon1.png"></image>
						<text>待付款</text>
					</view>
					<view>
						<image src="../../static/my-icons/icon2.png"></image>
						<text>待收货</text>
					</view>
					<view>
						<image src="../../static/my-icons/icon3.png"></image>
						<text>退款/退货</text>
					</view>
					<view>
						<image src="../../static/my-icons/icon4.png"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			
			<view class="panel3-box">
				<view class="panel3-item">
					<text>收货地址</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="panel3-item">
					<text>联系客服</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="panel3-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: "my-login-info",
		data() {
			return {
			};
		},
		methods:{
			...mapMutations('user',['updateToken','updateUserInfo','addAddress','delToken']),
			async logout(){
				const [err,data] = await uni.showModal({
					content:'确认退出登录吗',
					title:'提示'
				})
				
				if(err || data.errMsg !== 'showModal:ok') return uni.$showMsg('退出失败')
				
				if(data && data.confirm){
					this.updateToken('')
					this.updateUserInfo({})
					this.addAddress({})
					this.delToken()
				}
			}
		},
		computed:{
			...mapState('user',['userInfo'])
		}
	}
</script>

<style lang="scss">
.login-info-container{
	background-color: #d3d3d3;
	height: 100vh;
	
	.top-box{
		height: 450rpx;
		background-color: #aaaa7f;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		text{
			color: white;
		}
		
		.avatar-box image{
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
		}
	}
	
	.panel-container{
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.panel1-box{
			width: 95%;
			height: 150rpx;
			border-radius: 5px;
			background-color: white;
			display: flex;
			justify-content: space-around;
			align-items: center;
			transform: translateY(-15%);
			
			.text{
				font-size: 14px;
			}
			
			view{
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
		
		.panel2-box{
			width: 95%;
			height: 110px;
			background-color: white;
			border-radius: 5px;
			
			.title{
				height: 40px;
				border-bottom: 1px solid lightgray;
				line-height: 40px;
				
				text{
					margin-left: 8px;
				}
			}
			
			.list{
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 70px;
				
				view{
					display: flex;
					flex-direction: column;
					align-items: center;
					
					text{
						font-size: 13px;
					}
					
					image{
						width: 70rpx;
						height: 70rpx;
						
					}
				}
			}
		}
		
		.panel3-box{
			margin-top: 15px;
			width: 95%;
			background-color: white;
			border-radius: 5px;
			height: 220rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding-left: 5px;
			
			.panel3-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 5px;
				
				text{
					font-size: 14px;
				}
			}
		}
	}
}
</style>
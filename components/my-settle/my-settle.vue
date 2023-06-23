<template>
	<view>
		<view class="settle-box">
			<label class="radio" @click="updateState">
				<radio color="red" :checked="isChecked"/><text>全选</text>
			</label>
			<view class="total">
				合计：<text class="money-color">￥{{total.toFixed(2)}}</text>
			</view>
			<view class="settle-right" @click="settlement">结算({{checkCount}})</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		computed:{
			...mapGetters('cart',['checkCount','isChecked','total']),
			...mapState('user',['address','token'])
		},
		methods:{
			...mapMutations('cart',['updateAllGoodsState']),
			updateState(){
				this.updateAllGoodsState(!this.isChecked)
			},
			settlement(){
				if(!this.token) return this.delayNav()
				
				if(JSON.stringify(this.address) === '{}') return uni.$showMsg('请选择收货地址')
				
				if(this.checkCount == 0) return uni.$showMsg('请选择结算商品')
				
				uni.$showMsg('支付功能暂未开发')
			},
			showTips(n){
				uni.showToast({
					icon: 'none',
					mask: true,
					duration:1500,
					title: `请先登录再结算，${n}秒后自动跳转登录页`
				})
			},
			delayNav(){
				this.seconds = 3
				this.showTips(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					
					if(this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my'
						})
						return 
					} 
					this.showTips(this.seconds)
				},1000)
			}
		}
	}
</script>

<style lang="scss">
.settle-box{
	width: 100%;
	height: 50px;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	
	.radio{
		padding-left: 5px;
	}
	
	.money-color{
		color: red;
		font-weight: bold;
	}
	
	.settle-right{
		width: 30%;
		height: 100%;
		background-color: red;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
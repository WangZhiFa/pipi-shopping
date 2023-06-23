<template>
	<view>
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button size="mini" type="primary" @click="chooseAddress">请选择收获地址+</button>
		</view>
		<view class="address-box" v-else @click="chooseAddress">
			<view class="address-row1">
				<view class="name">收获人：{{address.userName}}</view>
				<view class="phone">电话：{{address.telNumber}}</view>
			</view>
			<view class="address-row2">
				<view class="address">收货地址：</view>
				<view class="address-info">{{addr}}</view>
			</view>
		</view>
		<image src="/static/cart_border@2x.png" class="border-img"></image>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('user',['addAddress']),
			async chooseAddress(){
				try{
					const [err,succ] = await uni.chooseAddress()
					if(succ.errMsg === 'chooseAddress:ok' && err == null){
						this.addAddress(succ)
					}
				}catch(e){
					console.log(e);
				}
			}
		},
		computed:{
			...mapState('user',['address']),
			...mapGetters('user',['addr'])
		}
	}
</script>

<style lang="scss">
.address-choose-box{
	height: 150rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.border-img{
		display: block;
		width: 100%;
		height: 5px;
}

.address-box{
	display: flex;
	flex-direction: column;
	padding: 5px;
	font-size: 13px;
	
	.address-row1{
		display: flex;
		justify-content: space-between;
	}
	
	.address-row2{
		display: flex;
		margin: 15rpx 0;
		.address{
			white-space: nowrap;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
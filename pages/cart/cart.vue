<template>
	<view class="cart-container" v-if="cartList.length !== 0">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="25"></uni-icons>
			<text>购物车</text>
		</view>
		<view class="cart-list">
			<my-goods-list :goodsList="cartList" :show-swiper="false" :showNum="true" :showBtn="true" @radioClick="radioClickHandle"
				@changeNum="changeNumHandle">
			</my-goods-list>
		</view>
		<my-settle></my-settle>
	</view>
	
	<view class="empty-cart" v-else>
		<image src="../../static/cart_empty@2x.png"></image>
		<text>空空如也~</text>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import tabarMixins from '../../mixins/tabar-badge.js'
	export default {
		computed: {
			...mapState('cart', ['cartList'])
		},
		mixins: [tabarMixins],
		data() {
			return {

			}
		},
		methods: {
			...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount']),
			radioClickHandle(goods) {
				this.updateGoodsState(goods)
			},
			changeNumHandle(val) {
				this.updateGoodsCount(val)
			}
		}
	}
</script>

<style lang="scss">
	.empty-cart{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		
		image{
			width: 100px;
			height: 100px;
		}
		
		text{
			color: gray;
			font-size: 15px;
			margin-top: 10px;
		}
	}
	.cart-container{
		padding-bottom: 50px;
	}
	.cart-title {
		height: 50px;
		border-bottom: 1px solid lightgray;
		display: flex;
		align-items: center;
		padding-left: 5px;

		text {
			margin-left: 5px;
		}
	}
</style>
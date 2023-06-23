<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item @click="preview(index)" class="swiper-item" v-for="(item,index) in goodsDetailList.pics"
				:key="index">
				<image :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<view class="price" v-if="goodsDetailList.goods_price">￥{{goodsDetailList.goods_price}}.00</view>
			<view class="main">
				<view class="name">{{goodsDetailList.goods_name}}</view>
				<view class="collect">
					<uni-icons type="star" color="gray" size="25"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="bottom">快递：免运费</view>
		</view>
		<view class="bottom-detail">
			<rich-text :nodes="goodsDetailList.goods_introduce"></rich-text>
		</view>
		<view class="goods-carts-box">
			<view class="goods-carts">
				<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
					@buttonClick="buttonClick" />
			</view>
		</view>
	</view>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
	data() {
		return {
			goodsDetailList: {},
			goods_id: '',
			options: [{
				icon: 'shop',
				text: '店铺',
				infoBackgroundColor: '#007aff',
			}, {
				icon: 'cart',
				text: '购物车',
				info: 0
			}],
			buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]

		};
	},
	onLoad(options) {
		this.goods_id = options.goods_id
		this.getGoodsDetailList()
		this.cartSum()
	},
	methods: {
		...mapMutations('cart',['addCart']),
		cartSum(){
			const a = JSON.parse(uni.getStorageSync('cart') || '[]')
			const b = a.find(item => item.goods_id == this.goods_id) || 0
			this.options[1].info = b.goods_count
		},
		async getGoodsDetailList() {
			const {
				data: {
					message,
					meta
				}
			} = await uni.$http.get(`/public/v1/goods/detail?goods_id=${this.goods_id}`)
			if (meta.status == 200) {
				message.goods_introduce = message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
					.replace(/webp/g, 'jpg')
				this.goodsDetailList = message
			} else return uni.$showMsg()
		},
		preview(i) {
			uni.previewImage({
				urls: this.goodsDetailList.pics.map(item => item.pics_big),
				current: i
			})
		},
		onClick(e) {
			if(e.content.text == '购物车'){
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			}
		},
		buttonClick(e) {
			const goods = {
				goods_id:this.goodsDetailList.goods_id,
				goods_count:1,
				goods_name:this.goodsDetailList.goods_name,
				goods_price:this.goodsDetailList.goods_price,
				goods_state:true,
				goods_small_logo:this.goodsDetailList.goods_small_logo
			}
			if(e.content.text = '加入购物车'){
				this.addCart(goods)
				this.cartSum()
			}
		},
	}
}
</script>

<style lang="scss">
	.bottom-detail {
		padding-bottom: 50px;
	}

	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}

	}

	.goods-info-box {
		height: 210rpx;
		padding: 5px 5px;
		padding-right: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.price {
			color: red;
			font-size: 16px;
		}

		.main {
			display: flex;

			.name {
				font-size: 13px;
				border-right: 1px solid lightgray;
				padding-right: 3px;
			}

			.collect {
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: gray;
				font-size: 12px;
			}
		}

		.bottom {
			font-size: 12px;
			color: gray;
		}
	}

	.goods-carts-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
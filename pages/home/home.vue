<template>
	<view>
		<view class="search">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="cateNav">
			<view v-for="(item,index) in cateNav" :key="index" class="cateNavItem">
				<image :src="item.image_src" @click="navHandle(item)"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<view class="floor-top">
					<image :src="item.floor_title.image_src" mode="widthFix"></image>
				</view>
				<view class="floor-bottom">
					<navigator :url="item.product_list[0].url" class="floor-left">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix">
						</image>
					</navigator>
					<view class="floor-right">
						<navigator v-for="(item2,i) in item.product_list" :key="i" :url="item2.url">
							<image :src="item2.image_src" v-if="i > 0" :style="{width:item2.image_width + 'rpx'}"
								mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabarMixins from '../../mixins/tabar-badge.js'
	export default {
		mixins:[tabarMixins],
		data() {
			return {
				swiperList: [],
				cateNav: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getCateNav()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/public/v1/home/swiperdata')
				if (res.meta.status == 200) {
					this.swiperList = res.message
				} else {
					return uni.$showMsg()
				}
			},
			async getCateNav() {
				const {
					data
				} = await uni.$http.get('/public/v1/home/catitems')
				if (data.meta.status == 200) {
					this.cateNav = data.message
				} else {
					return uni.$showMsg()
				}
			},
			async getFloorList() {
				const {
					data
				} = await uni.$http.get('/public/v1/home/floordata')
				if (data.meta.status == 200) {
					data.message.forEach(floor => {
						floor.product_list.forEach(item => {
							item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
						})
					})
					this.floorList = data.message
				} else {
					return uni.$showMsg()
				}
			},
			navHandle(val) {
				if (val.name == '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/goodsSearch/goodsSearch'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search{
		position: sticky;
		top: 0;
		z-index: 99;
	}
	
	swiper {
		height: 300rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.cateNav {
		display: flex;
		justify-content: space-around;

		.cateNavItem {
			margin: 30rpx 0;
		}

		.cateNavItem image {
			width: 130rpx;
			height: 140rpx;
		}
	}

	.floor-item {
		padding-left: 10rpx;
	}

	.floor-bottom {
		display: flex;

		.floor-right {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
		}
	}
</style>
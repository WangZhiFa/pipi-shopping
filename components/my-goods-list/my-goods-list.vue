<template>
	<view>
		<view class="goods-list">
			<uni-swipe-action>
				<view class="goods-list-item" v-for="(item,index) in goodsList" :key="index"
					@click="gotoDetail(item.goods_id)">
					<uni-swipe-action-item :right-options="options" :disabled="showSwiper" @click="delSwiperItem(item.goods_id)">
						<view style="display: flex;">
							<view class="goods-list-img">
								<radio :checked="item.goods_state" color="red" v-if="showBtn" @click="radioHandle(item)">
								</radio>
								<image :src="item.goods_small_logo"></image>
							</view>
							<view class="goods-list-right">
								<view class="goods-list-title">{{item.goods_name}}</view>
								<view class="goods-list-bottom">
									<view class="goods-list-price">￥{{item.goods_price | toFixed}}</view>
									<uni-number-box :min="1" :value="item.goods_count" v-if="showNum"
										@change="changHandle(item.goods_id,$event)"></uni-number-box>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		props: {
			goodsList: {
				type: Array,
				default: []
			},
			showBtn: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			},
			showSwiper:{
				type:Boolean,
				default:true
			}
		},
		name: "my-goods-list",
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('cart',['deleteCartGoods']),
			gotoDetail(id) {
				this.$emit('click', id)
			},
			radioHandle(val) {
				this.$emit('radioClick', {
					goods_id: val.goods_id,
					goods_state: !val.goods_state
				})
			},
			changHandle(id, num) {
				this.$emit('changeNum', {
					goods_id: id,
					goods_count: num
				})
			},
			delSwiperItem(id){
				this.deleteCartGoods(id)
			}
		},
		filters: {
			toFixed(num) {
				return num.toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-list-item {
		display: flex;
		border-bottom: 1px solid lightgray;
		padding: 5px;

		.goods-list-img {
			display: flex;
			align-items: center;

			image {
				width: 110px;
				height: 110px;
			}
		}

		.goods-list-right {
			font-size: 13px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 5px;
			flex: 1;

			.goods-list-bottom {
				display: flex;
				justify-content: space-between;

				.goods-list-price {
					color: red;
					font-size: 14px;
					font-weight: bold;
				}
			}
		}
	}
</style>
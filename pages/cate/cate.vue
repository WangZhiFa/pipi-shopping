<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-box">
			<scroll-view class="left-scroll" scroll-y="true" style="height: 100vh;">
				<view v-for="(item,index) in cateList" :key="item.cat_id" 
				:class="['left-item',index == active ? 'active' : '' ]" @click="activeHandle(index)">
				{{item.cat_name}}
				</view>
			</scroll-view>
			<scroll-view class="right-scroll" :scroll-top="scrollTop" scroll-y="true" style="height: 100vh;">
				<view class="right-box" v-for="item in cateList2" :key="item.cat_id">
					<view class="right-title">/{{item.cat_name}}/</view>
					<view class="right-content">
						<view class="right-item" v-for="item2 in item.children" :key="item2.cat_id">
							<image :src="item2.cat_icon" @click="goodsListHandle(item2.cat_id)"></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import tabarMixins from '../../mixins/tabar-badge.js'
	export default {
		mixins:[tabarMixins],
		data() {
			return {
				cateList:[],
				active:0,
				cateList2:[],
				scrollTop:0
			};
		},
		methods:{
			async getCateList(){
				const {data} = await uni.$http.get('/public/v1/categories')
				const {meta,message} = data
				if(meta.status == 200){
					this.cateList = message
					this.cateList2 = this.cateList[0].children
				}
			},
			activeHandle(index){
				this.active = index
				this.cateList2 = this.cateList[index].children
				this.scrollTop = this.scrollTop == 0 ? 1 : 0
			},
			goodsListHandle(id){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cate_id=' + id
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/goodsSearch/goodsSearch'
				})
			}
		},
		onLoad(){
			this.getCateList()
		}
	}
</script>

<style lang="scss">
.scroll-box{
	display: flex;
	
	.left-scroll{
		width: 120px;
		
		.left-item{
			line-height: 60px;
			text-align: center;
			background-color: #f2f2f3;
			border-bottom: 1px solid #dfdfdf;
			font-size: 14px;
			
			&.active{
				background-color: #f3f2f0;
				color: #6c6952;
				position: relative;
				
				&::before{
					content: ' ';
					display: block;
					width: 1px;
					height: 50px;
					background-color: orange;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
	
	.right-scroll{
		text-align: center;
		.right-title{
				padding: 15px 0;
				font-weight: bold;
		}
		
		.right-content{
			display: flex;
			flex-wrap: wrap;
			
			.right-item {
				display: flex;
				flex-direction: column;
				width: 33.33%;
				justify-content: center;
				align-items: center;
				margin-bottom: 15px;
				
				image{
					width: 60px;
					height: 60px;
				}
				
				text{
					font-size: 13px;
				}
			}
		}
	}
}
</style>

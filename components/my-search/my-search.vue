<template>
	<view class="search-box" @click="search">
		<view class="search-content">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			search(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	height: 100rpx;
	padding: 0 15px;
	background-color: #e6e6e6;
	display: flex;
	align-items: center;
	border: none;
	
	.search-content{
		background-color: white;
		width: 100%;
		height: 75%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 18px;
		
		text{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>
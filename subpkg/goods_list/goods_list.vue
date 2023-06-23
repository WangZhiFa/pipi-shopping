<template>
	<view>
		<my-goods-list :goodsList="goodsList" @click="gotodetail"></my-goods-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:'',
				isloading:false
			};
		},
		onLoad(options){
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(cb){
				this.isloading = true
				
				const {data:{message,meta}} = await uni.$http.get('/public/v1/goods/search',this.queryObj)
				cb && cb()
				this.isloading = false
				if(meta.status == 200){
					this.goodsList = [...this.goodsList,...message.goods]
					this.total = message.total
				}else{
					uni.$showMsg()
				}
			},
			gotodetail(id){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id=" + id
				})
			}
		},
		onReachBottom() {
			if(this.isloading) return
			if(this.goodsList.length >= this.total) {
				uni.$showMsg('已经到底了！！！')
				return
			}
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.goodsList = []
			this.total = 0
			this.queryObj.pagenum = 1
			this.isloading = false
			
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
<template>
	<view class="search-box">
		<view>
			<uni-search-bar class="uni-mt-10" radius="100" 
			placeholder="搜索" v-model="keyword" @input="searchHandle" clearButton="auto" cancelButton="none" />
		</view>
		
		<view class="search-list">
			<view v-if="searchList.length == 0 ? true : false">
				<view class="search-history">
					<view>搜索历史</view>
					<uni-icons type="trash-filled" size="25" @click="delSearchHistory"></uni-icons>
				</view>
				<view class="search-history-item">
					<view class="tag-view" v-for="(item,index) in searchHistory" :key="index" @click="historyHandle(item)">
						<uni-tag :text="item" />
					</view>
				</view>
			</view>
			<view class="search-item" v-for="(item,index) in searchList" :key="item.goods_id" @click="gotoGoodsList(item)">
				<view class="search-name">{{item.goods_name}}</view>
				<uni-icons type="forward" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				keyword:'',
				searchList:[],
				searchHistory:[]
			};
		},
		onLoad() {
			this.searchHistory = JSON.parse(uni.getStorageSync('searchHistory') || '[]')
		},
		methods:{
			searchHandle(e){
				clearTimeout(this.timer)
				
				this.timer = setTimeout(() => {
					this.keyword = e
					this.getSearchList()
				},1000)
				
			},
			async getSearchList(){
				if(this.keyword.trim() == '') {
					this.searchList = []
					return
				}
				const {data:{message,meta}} = await uni.$http.get(`/public/v1/goods/qsearch`,{query: this.keyword})
				if(meta.status == 200){
					this.searchList = message
				}else{
					uni.$showMsg()
				}
			},
			gotoGoodsList(val){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?id=' + val.goods_id
				})
				this.saveSearchHistory()
			},
			saveSearchHistory(){
				this.searchHistory.unshift(this.keyword)
				this.keyword = ''
				const result = new Set(this.searchHistory)
				this.searchHistory = Array.from(result)
				uni.setStorageSync('searchHistory',JSON.stringify(this.searchHistory))
			},
			delSearchHistory(){
				const flag = uni.showModal({
				title: '提示',
				content: '你确定清空历史记录吗？',
				success: (res) => {
						if (res.confirm) {
							this.searchHistory = [],
							uni.removeStorageSync('searchHistory')
						} 
					}
				})
			},
			historyHandle(val){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + val
				})
			}
		}
	}
</script>

<style lang="scss">
.uni-searchbar{
	background-color: #e6e6e6;
}

.uni-searchbar__box {
	background-color: white !important;
}

.search-item{
	display: flex;
	height: 50px;
	justify-content: space-between;
	align-items: center;
	font-size: 12px;
	border-bottom: 1px solid #ececec;
	
	.search-name{
		//文字不换行
		white-space: nowrap;
		overflow: hidden;
		//文本溢出省略
		text-overflow: ellipsis;
	}
}

.search-history{
	display: flex;
	height: 45px;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
	border-bottom: 1px solid #ececec;
}

.search-history-item{
		display: flex;
		justify-content: flex-start;
		padding: 0 5px;
		flex-wrap: wrap;
		
		.tag-view{
			margin: 10px 5px;
		}
		
		.uni-tag{
			background-color: #ececec !important;
			color: black;
		}
}
</style>

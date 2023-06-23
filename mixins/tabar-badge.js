import { mapState } from 'vuex'
export default {
	onShow() {
		this.setTabBarBadgeHandle()
	},
	watch:{
		cartList(){
			this.setTabBarBadgeHandle()
		}
	},
	computed: {
		...mapState('cart', ['cartList'])
	},
	methods:{
		setTabBarBadgeHandle(){
			uni.setTabBarBadge({
				index: 2,
				text: this.cartList.length == 0 ? uni.removeTabBarBadge({index:2}) : this.cartList.length + ''
			})
		}
	}
}
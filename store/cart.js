export default {
	
	namespaced:true,
	
	state:() => ({
		cartList:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		addCart(state,goods){
			const result = state.cartList.find(item => item.goods_id == goods.goods_id)
			if(!result){
				state.cartList.push(goods)
			}else{
				result.goods_count++
			}
			this.commit('cart/saveCart')
		},
		saveCart(state){
			uni.setStorageSync('cart',JSON.stringify(state.cartList))
		},
		updateGoodsState(state,goods){
			const result = state.cartList.find(item => item.goods_id == goods.goods_id)
			if(result){
				result.goods_state = goods.goods_state
				this.commit('cart/saveCart')
			}
		},
		updateGoodsCount(state,goods){
			const result = state.cartList.find(item => item.goods_id == goods.goods_id)
			if(result){
				result.goods_count = goods.goods_count
				this.commit('cart/saveCart')
			}
		},
		deleteCartGoods(state,id){
			const result = state.cartList.filter(item => item.goods_id !== id)
			state.cartList =result
			this.commit('cart/saveCart')
		},
		updateAllGoodsState(state,newState){
			state.cartList.forEach(item => item.goods_state = newState)
			this.commit('cart/saveCart')
		}
	},
	
	getters:{
		checkCount(state){
			return state.cartList.filter(item => item.goods_state).length
		},
		isChecked(state){
			return state.cartList.every(item => item.goods_state)
		},
		total(state){
			const res = state.cartList.filter(item => item.goods_state)
			return res.reduce((amt,item) => amt += item.goods_price * item.goods_count,0)
		}
	}
}
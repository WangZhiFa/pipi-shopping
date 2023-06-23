<template>
	<view>
		<my-login v-if="!token"></my-login>
		<my-login-info v-else></my-login-info>
	</view>
</template>

<script>
	import tabarMixins from '../../mixins/tabar-badge.js'
	import { mapState } from 'vuex'
	export default {
	mixins:[tabarMixins],
		data() {
			return {
				show:null
			};
		},
		onLoad() {
		},
		computed:{
			...mapState('user',['token'])
		}
	}
</script>

<style lang="scss">

</style>
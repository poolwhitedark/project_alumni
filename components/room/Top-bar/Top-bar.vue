<template>
	<view class="top">
		<uni-icons type="back" size="37" @click="goback"></uni-icons>
		<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/45736ed0-a7ba-11ea-9e8b-05a3242b26f2.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goback(){
				this.$emit('back')
			}
		}
	}
</script>

<style lang="scss">
.top{
	width: 100%;
	image{
		margin-right: 24rpx;
		margin-top: 15rpx;
		float: right;
		width: 50rpx;
		height: 50rpx;
	}
}
</style>

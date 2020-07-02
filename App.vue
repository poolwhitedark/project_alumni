<template>
  <view id="app">
    <router-view/>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>-->
  </view>
</template>
<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// uni.getStorage({
		// 	key: 'token',
		// 	success: function(res) {
		// 		console.log(res.data);
		// 		if (res.data == 'ok') {
		// 			uni.switchTab({
		// 				url: '/pages/home/home',
		// 				fail(err) {
		// 					console.log(err);
		// 				}
		// 			});
		// 		}
		// 	}
		// });
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import './common/style/module.scss';s
#app{
	color:#333;
	}

</style>

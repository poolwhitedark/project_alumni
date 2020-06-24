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

<style>
	/*每个页面公共css */
	/* 头部标题的样式 */
	uni-page-head .uni-page-head__title {
		font-family: 'PingFang_Regular' !important;
		color: #333333 !important;
		font-size: 32rpx !important;
	}

	uni-page-head .uni-page-head .uni-page-head-ft {
		padding-right: 60rpx;
	}
	/* 弹框的样式 */
	uni-modal .uni-modal {
	    position: fixed;
	    z-index: 999;
	    width: 80%;
	    max-width: 300px;
	    top: 50%;
	    left: 50%;
	    -webkit-transform: translate(-50%,-50%);
	    transform: translate(-50%,-50%);
	    background-color: #fff;
	    text-align: center;
	    border-radius: 20px;
	    overflow: hidden;
	}
</style>

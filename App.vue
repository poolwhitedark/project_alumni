
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
@import './common/style/module.scss';
@import './common/style/font-face.css';
uni-app, uni-page-head {
    display: block;
    box-sizing: border-box;
	color: #333;
}
uni-tabbar .uni-tabbar-border {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0px; 
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
uni-tabbar .uni-tabbar{
	box-shadow:0px 2px 29px 0px rgba(0,20,48,0.08);
}
</style>

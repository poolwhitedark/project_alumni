<template>
	<view class="user_info">
		<view class="image-box">
			<image src='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/2922bfd0-a6eb-11ea-9e8b-05a3242b26f2.jpeg'></image>
		</view>
		<view class="user_info-box">
			<view class="num">
				<text>{{info.collection}}</text>
				<text>{{info.followers}}</text>
				<text>{{info.followings}}</text>
			</view>
			<view class="text">
				<text>动态</text>
				<text>收藏</text>
				<text>关注</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			info: {
				type: Object,
				default : {
						avatar_url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/2922bfd0-a6eb-11ea-9e8b-05a3242b26f2.jpeg',
						collection: 123,
						followers: 555,
						followings: 666
					
				
			}
			

			}
		}
	}
</script>

<style lang="scss">
	.user_info {
		width: 100%;
		padding: 0 20rpx;
		display: flex;
		align-items: center;

		.image-box {
			display: flex;
			margin-left: 20rpx;

			height: 170rpx;
			width: 170rpx;
			box-sizing: border-box;
			align-items: center;
			justify-content: center;

			image {
				width: 155rpx;
				height: 155rpx;
			}
		}

		.user_info-box {
			display: flex;
			margin-left: 58rpx;

			height: 150rpx;
			width: 450rpx;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.num {

				display: flex;
				height: 50rpx;
				width: 370rpx;

				align-items: center;
				justify-content: center;

				text {
					margin-right: 65rpx;
				}
			}

			.text {

				display: flex;
				height: 50rpx;
				width: 370rpx;

				align-items: center;
				justify-content: center;
				box-sizing: border-box;

				text {
					margin-right: 45rpx;
				}
			}

		}
	}
</style>

<template >
	<view class="user_card" >
		<view class="user_card-box">
			<view class="add-image" >
				<view class="image-box">
					<image  @click="gotoWatch()" :src='list.actionBg'></image>

					<view >
						<image class="add" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/83960970-a7ec-11ea-b244-a9f5e5565f30.png"
						 @click="add"></image>
					</view>

				</view>
			</view>

			<view class="text-box">
				<text>
					{{list.text}}
				</text>
			</view>
			<view class="icon-text">
				<view class="icon-box">
					<view class="num1">
						<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/bde7a3e0-a7e7-11ea-8bd0-2998ac5bbf7e.png"></image>
						<text>{{list.see_number}}</text>
					</view>
					<view class="num2">
						<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/bdf5fbc0-a7e7-11ea-9e8b-05a3242b26f2.png"></image>
						<text>{{list.thumbs_up}}</text>
					</view>
					<view class="num3">
						<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/bdf6e620-a7e7-11ea-b43d-2358b31b6ce6.png"></image>
						<text>{{list.chatnumber}}</text>
					</view>
				</view>

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
			list: {
				type: Object,
				default: {
					actionBg: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/2922bfd0-a6eb-11ea-9e8b-05a3242b26f2.jpeg',
					text: '我是大漂亮,我怎么这么可爱啊  哈哈哈哈哈哈hhhghhhh',
					see_number: 123,
					thumbs_up: 555,
					chatnumber: 666
				}


			}
		},
		methods: {
			add() {
				console.log(666)
				this.$emit('add')
			},
			gotoWatch() {
				// uni.navigateTo({
				// 	url: '../../../pages/watchArticle/watchArticle'


				// })
				this.$emit('gotoWatch')
			}
		}
	}
</script>

<style lang="scss">
	.user_card {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;

		image {

			height: 50rpx;
			width: 40rpx;
		}

		.user_card-box::before {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			right: 0;
			bottom: 0;
			left: 0;
			opacity: 0.5;
			background: linear-gradient(0deg, #943c08, #262287);
			z-index: -1;
		}

		.user_card-box {
			background-size: cover;
			display: flex;
			border-radius: 30rpx;
			position: relative;
			overflow: hidden;
			box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			z-index: 1;
			align-items: center;
			margin-top: 25rpx;
			width: 600rpx;
			height: 500rpx;

			flex-direction: column;

			.add-image {
				display: flex;

				.image-box {

					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 20rpx;
					width: 500rpx;
					height: 300rpx;

					box-sizing: border-box;

					.add {
						margin-bottom: 240rpx;
						width: 70rpx;
						height: 70rpx;
						margin-right: -100rpx;
						margin-left: 30rpx;

					}

					image {
						width: 340rpx;
						height: 280rpx;
						border-radius: 20rpx;
					}
				}
			}

			.text-box {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 10rpx;
				width: 500rpx;
				height: 80rpx;

				text {
					font-size: 30rpx;
					letter-spacing: 2rpx;
				}
			}

			.icon-box {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 15rpx;
				width: 500rpx;
				height: 40rpx;

				.num1 {
					margin-right: 40rpx;

					image {
						height: 26rpx;
						width: 30rpx;
					}

					text {
						font-size: 34rpx;
						letter-spacing: 2rpx;
					}

				}

				.num2 {
					margin-right: 40rpx;

					image {
						height: 26rpx;
						width: 30rpx;
					}

					text {
						font-size: 34rpx;
						letter-spacing: 2rpx;
					}

				}

				.num3 {

					image {
						height: 26rpx;
						width: 30rpx;
					}

					text {
						font-size: 34rpx;
						letter-spacing: 2rpx;
					}

				}
			}
		}
	}
</style>

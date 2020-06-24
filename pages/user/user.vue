<template>
	<view class="content">
		<view class="tap-main">
			<view class="tap-main-top"><useredit :user="user" @up_avatar="upAvatar" @up_name="upName" @up_sex="upSex"></useredit></view>
			<view class="tap-main-bottom">
				<view class="tap-bottom-item">
					<text>{{ user.friends }}</text>
					<p>我的职友</p>
				</view>
				<view class="tap-bottom-item">
					<text>{{ user.followings }}</text>
					<p>关注</p>
				</view>
				<view class="tap-bottom-item">
					<text>{{ user.collection }}</text>
					<p>收藏</p>
				</view>
			</view>
		</view>
		<view class="bottom-main">
			<view class="bottom-main-item">
				<view class="bottom-main-item-left">
					<image src="../../static/images/user/realname.png"></image>
					<p>实名认证</p>
				</view>
				<view class="bottom-main-item-right">
					<p>认证后可解锁各项功能</p>
					<image src="../../static/images/user/right.png"></image>
				</view>
			</view>
			<view class="bottom-main-item">
				<view class="bottom-main-item-left">
					<image src="../../static/images/user/git.png"></image>
					<p>学生认证</p>
				</view>
				<view class="bottom-main-item-right">
					<p>完善自己各项信息</p>
					<image src="../../static/images/user/right.png"></image>
				</view>
			</view>
			<view class="bottom-main-item">
				<view class="bottom-main-item-left">
					<image src="../../static/images/user/talk.png"></image>
					<p>客服</p>
				</view>
				<view class="bottom-main-item-right">
					<p>客服小姐姐等你来信</p>
					<image src="../../static/images/user/right.png"></image>
				</view>
			</view>
			<view class="bottom-main-item">
				<view class="bottom-main-item-left">
					<image src="../../static/images/user/history.png"></image>
					<p>商业合作</p>
				</view>
				<view class="bottom-main-item-right">
					<p></p>
					<image src="../../static/images/user/right.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import useredit from '@/components/user-edit/user-edit.vue';
export default {
	onShow() {
		this.goUser();
	},
	onLoad() {
		this.goUser();
		setTimeout(function() {
			console.log('start pulldown');
		}, 1000);
		uni.startPullDownRefresh();
	},
	onPullDownRefresh() {
		console.log('refresh');
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	data() {
		return {
			user: {},
			user_id: ''
		};
	},
	components: {
		useredit
	},
	methods: {
		goUser() {
			uni.getStorage({
				key: 'user_id'
			}).then(res => {
				console.log(res[1].data);
				this.user_id = res[1].data;
				uniCloud
					.callFunction({
						name: 'goUser',
						data: {
							user_id: this.user_id
						}
					})
					.then(res => {
						this.user = res.result.data[0];
					});
			});
		},
		upAvatar(e) {
			const avatarUrl = e;
			console.log(avatarUrl);
			uniCloud
				.callFunction({
					name: 'updataUser',
					data: {
						avatarUrl: avatarUrl,
						user_id: this.user_id
					}
				})
				.then(res => {
					this.goUser();
				});
		},
		upName(e) {
			const userName = e;
			uniCloud
				.callFunction({
					name: 'updataUser',
					data: {
						user_name: userName,
						user_id: this.user_id
					}
				})
				.then(res => {
					this.goUser();
				});
		},
		upSex(e) {
			const Sex = e;
			uniCloud
				.callFunction({
					name: 'updataUser',
					data: {
						sex: Sex,
						user_id: this.user_id
					}
				})
				.then(res => {
					this.goUser();
				});
		}
	}
};
</script>

<style lang="scss">
.content {
	position: absolute;
	width: 100%;
	height: 100%;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	background-color: #f8f8f8;
	.tap-main {
		position: absolute;
		height: 450rpx;
		width: 100%;
		background-color: white;
		.tap-main-top {
			height: 300rpx;
		}
		.tap-main-bottom {
			position: relative;
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			.tap-bottom-item {
				padding: 0rpx 85rpx 0rpx 85rpx;
				text-align: center;
				p {
					font-family: 'Microsoft YaHei UI Light';
					font-size: 20rpx;
					font-weight: bold;
					color: rgba(146, 145, 145, 0.95);
					margin-top: 20rpx;
				}
				h {
					font-family: 'Microsoft YaHei UI Light';
					font-size: 40rpx;
					font-weight: bold;
				}
			}
		}
	}
	.bottom-main {
		position: absolute;
		width: 100%;
		top: 470rpx;
		line-height: 10rpx;
		height: 360rpx;
		.bottom-main-item {
			&:active {
				background-color: $uni-bg-color-grey;
			}
			display: flex;
			width: 100%;
			height: 90rpx;
			margin-top: 10rpx;
			background-color: white;
			.bottom-main-item-left {
				display: flex;
				margin-top: 30rpx;
				image {
					margin-left: 20rpx;
					width: 50rpx;
					height: 50rpx;
				}
				p {
					margin-top: 15rpx;
					margin-left: 30rpx;
					font-weight: bold;
				}
			}
			.bottom-main-item-right {
				display: flex;
				margin-top: 30rpx;
				image {
					position: fixed;
					right: 20rpx;
					width: 35rpx;
					height: 35rpx;
				}
				p {
					position: fixed;
					margin-top: 10rpx;
					right: 60rpx;
					color: #969799;
					text-align: right;
				}
			}
		}
	}
}
</style>

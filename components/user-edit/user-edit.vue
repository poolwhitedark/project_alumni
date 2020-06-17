<template>
	<view>
		<view class="tap-main" @click="goedit">
			<view class="tap-main-left"><image :src="user.avatar_url"></image></view>
			<view class="tap-main-right">
				<view class="name">{{ user.user_name }}</view>
				<view class="profession">{{ user.profession }}</view>
				<view class="school">{{ user.university_id }}</view>
			</view>
		</view>
		<view class="pop-content" v-if="show">
			<view class="top-bar">
				<view class="back" @click="this.show = false"><image src="../../static/images/register/back.png"></image></view>
				<view class="mine">{{ user.user_name }}</view>
			</view>
			<view class="pop-cell" style="height: 150rpx;" @click="updataImg">
				<view class="pop-cell-left" style="padding-top: 20rpx;">头像</view>
				<view class="pop-cell-center">
					<image
						:src="user.avatar_url"
						style="	width: 52px;
				height: 52px;
				border-radius: 10px;"
					></image>
				</view>
				<view class="pop-cell-right" style="padding-top: 20rpx;"><image src="../../static/images/user/right.png"></image></view>
			</view>
			<view class="pop-cell">
				<view class="pop-cell-left">昵称</view>
				<view class="pop-cell-center"><input :placeholder="user.user_name" v-model="user_name" @blur="updataName" /></view>
				<view class="pop-cell-right"><image src="../../static/images/user/right.png"></image></view>
			</view>
			<picker :value="Sex" :range="array" @change="bindPickerChange">
				<view class="pop-cell">
					<view class="pop-cell-left">性别</view>
					<view class="pop-cell-center">{{ array[user.sex] }}</view>
					<view class="pop-cell-right"><image src="../../static/images/user/right.png"></image></view>
				</view>
			</picker>
			<view class="out" @click="outuser"><view class="out-button">退出登陆</view></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			default() {
				return {
					sex:''
				};
			}
		}
	},
	components: {},
	data() {
		return {
			show: false,
			avatar_url: '',
			user_name: '',
			phone: '',
			Sex: '',
			array: ['女', '男']
		};
	},
	methods: {
		goedit() {
			this.show = true;
		},
		outuser() {
			uni.clearStorage();
			uni.navigateTo({
				url: '/pages/login/login'
			}).then(res => {
				this.show = false;
			});
		},
		updataImg() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'] //从相册选择
			}).then(res => {
				this.avatar_url = res[1].tempFilePaths[0];
				console.log(this.avatar_url);
				this.$emit('up_avatar', this.avatar_url);
			});
		},
		updataName() {
			this.$emit('up_name', this.user_name);
			console.log(this.user_name);
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.Sex = e.target.value;
			this.$emit('up_sex',this.Sex)
		}
	}
};
</script>

<style lang="scss">
.tap-main {
	.tap-main-left {
		position: absolute;
		top: 60rpx;
		left: 30rpx;
		float: left;
		image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 80rpx;
		}
	}
	.tap-main-right {
		position: absolute;
		top: 60rpx;
		left: 250rpx;
		text-align: left;
		line-height: 50rpx;
		font-weight: bold;
		.name {
			font-size: 50rpx;
		}
		.profession {
			margin-top: 20rpx;
			font-size: 20rpx;
			color: #636262;
		}
		.school {
			font-size: 20rpx;
			color: #636262;
		}
	}
}
.pop-content {
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: white;
	z-index: 2;
	.top-bar {
		width: 100%;
		height: 88rpx;
		.back {
			float: left;
			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
		.mine {
			text-align: center;
			font-size: 20px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(39, 40, 50, 1);
			line-height: 28px;
		}
	}
	.pop-cell {
		&:active {
			background-color: $uni-bg-color-grey;
		}
		display: flex;
		width: 100%;
		height: 90rpx;
		margin-top: 20rpx;
		.pop-cell-left {
			margin-top: 25rpx;
			margin-left: 30rpx;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(39, 40, 50, 1);
			line-height: 22px;
		}
		.pop-cell-center {
			margin-top: 25rpx;
			margin-left: 30rpx;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(39, 40, 50, 0.6);
			line-height: 22px;
		}
		.pop-cell-right {
			position: fixed;
			right: 20rpx;
			margin-top: 25rpx;
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.out {
		position: fixed;
		right: 300rpx;
		bottom: 50rpx;
		.out-button {
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 93, 91, 1);
			line-height: 22px;
		}
	}
}
</style>

<template>
	<movable-area class="content">
		<movable-view
			direction="all"
			inertia="true"
			out-of-bounds="true"
			class="card-content"
			v-for="(item , index) in lastDataList"
			:key="index"
			@change="onChange"
			@touchend="nextcard"
			@touchcancel="nextcard"
			@longpress="nextcard"
			:x="x"
			:y="y"
		>
			<view class="card-main">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/83eabac0-a9fd-11ea-8a36-ebb87efcf8c0.png" class="chat" @click="gochat(item.user_id)"></image>
				<image :src="item.avatar_url"></image>
				<view class="name">{{ item.user_name }}</view>
				<view class="label">
					<view v-for="label in item.label" v-bind:key="label" class="label-main">
						<p>{{ label }}</p>
					</view>
				</view>
				<view class="card-icon">
					<view class="card-icon-left">
						<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/5f7c65b0-a7a2-11ea-b94e-47f67ecf8268.png"></image>
						<text>{{ item.address }}</text>
					</view>
					<view class="card-icon-right">
						<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/65de9d10-a7a2-11ea-9e8b-05a3242b26f2.png"></image>
						<text>{{ item.profession }}</text>
					</view>
				</view>
				<view class="card-bottom">
					<view class="card-bottom-item">
						<p>动态</p>
						<text>{{ item.collection }}</text>
					</view>
					<view class="card-bottom-item">
						<p>粉丝</p>
						<text>{{ item.followers }}</text>
					</view>
					<view class="card-bottom-item">
						<p>关注</p>
						<text>{{ item.followings }}</text>
					</view>
				</view>
			</view>
		</movable-view>
	</movable-area>
</template>
<script>
export default {
	created() {
		this.getusers();
	},
	data() {
		return {
			lastDataList: [],
			x: 0,
			y: 0,
			old: {
				x: 0,
				y: 0
			}
		};
	},
	methods: {
		getusers() {
  
			uniCloud
				.callFunction({
					name: 'home'
				})
				.then(res => {
					console.log(res.result.data);
					this.lastDataList = res.result.data;
				});
		},
		onChange(e) {
			this.old.x = e.detail.x;
			this.old.y = e.detail.y;
		},
		nextcard() {
			if (this.old.x != 0 || this.old.x != 0) {
				this.old.x = 0;
				this.old.y = 0;
				console.log('右移');
				this.lastDataList.splice(this.lastDataList.length - 1, 1);
				if (this.lastDataList.length < 1) {
					this.getusers();
				}
			}
		},
		gochat(fid){
			uni.navigateTo({
				url:'/pages/chat/chat?fid='+encodeURIComponent(JSON.stringify(fid))
			})
		}
	}
};
</script>

<style lang="scss">
.content {
	position: fixed;
	height: 100%;
	width: 100%;
	left: 40rpx;
	right: 0;
	top: 35rpx;
	bottom: 35rpx;
}
.card-content {
	position: absolute;
	display: flex;
	align-items: center;
	width: 666rpx;
	height: 1000rpx;
	border-radius: 30rpx;
	bottom: 20rpx;
	.card-main {
		background-size: cover;
		margin-top: 60rpx;
		margin-bottom: 20rpx;
		width: 666rpx;
		height: 1000rpx;
		position: relative;
		overflow: hidden;
		border-radius: 30rpx;
		box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		z-index: -1;
		.chat {
			position: fixed;
			width: 80rpx;
			height: 80rpx;
			top: 70rpx;
			right: 50rpx;
			z-index: 2;
		}
		image {
			width: 666rpx;
			height: 1000rpx;
			position: relative;
			z-index: -3;
		}
		.name {
			position: absolute;
			top: 250rpx;
			padding-left: 220rpx;
			padding-right: 200rpx;
			font-weight: bolder;
			font-size: 50rpx;
			color: white;
			font-family: 'Microsoft YaHei UI Light';
			z-index: 0;
		}
		.label {
			position: absolute;
			width: 100%;
			height: 400rpx;
			top: 350rpx;
			display: flex;
			.label-main {
				padding: 10rpx 20rpx 10rpx 20rpx;
				margin-left: 100rpx;
				background-color: #808080;
				opacity: 0.5;
				width: 80rpx;
				height: 40rpx;
				border-radius: 50rpx;
				z-index: -1;
				p {
					font-size: 30rpx;
					text-align: center;
					font-weight: bold;
					color: white;
					font-family: 'Microsoft YaHei UI Light';
				}
			}
		}
		.card-icon {
			position: absolute;
			bottom: 220rpx;
			width: 100%;
			height: 50rpx;
			z-index: 1;
			.card-icon-left {
				float: left;
				margin-left: 20rpx;
				display: flex;
				image {
					width: 60rpx;
					height: 60rpx;
				}
				h {
					margin-top: 5rpx;
					font-weight: bold;
					color: white;
					font-family: 'Microsoft YaHei UI Light';
				}
			}
			.card-icon-right {
				float: right;
				display: flex;
				margin-right: 20rpx;
				image {
					width: 60rpx;
					height: 60rpx;
				}
				h {
					margin-top: 5rpx;
					font-weight: bold;
					color: white;
					font-family: 'Microsoft YaHei UI Light';
				}
			}
		}
		.card-bottom {
			display: flex;
			position: absolute;
			bottom: 0rpx;
			flex-wrap: wrap;
			width: 100%;
			height: 200rpx;
			background-color: #ffffff;
			.card-bottom-item {
				padding: 40rpx 60rpx 100rpx 80rpx;
				p {
					font-family: 'Microsoft YaHei UI Light';
					font-size: 30rpx;
					font-weight: bold;
					color: rgba(146, 145, 145, 0.95);
					margin-bottom: 30rpx;
				}
				h {
					font-family: 'Microsoft YaHei UI Light';
					font-size: 40rpx;
					font-weight: bolder;
				}
			}
		}
	}
	.card-main:before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		opacity: 0.5;
		background: linear-gradient(0deg, #943c08, #262287);
		z-index: -1;
	}
}
.mov-area-all {
	width: 750rpx;
	position: relative;
	top: -66rpx;
	box-sizing: border-box;
	.mov-view-list {
		position: absolute;
		left: 0;
		top: 0;
		width: 750rpx;
		height: 100%;
		transform: translateX(0rpx);
		.mov-area-con {
			height: 100%;
			position: absolute;
			background: #fff;
			border-radius: 10px;
			border: 1px solid #ccc;
		}
		&.one {
			z-index: 1;
			.mov-area-con {
				width: 678rpx;
				left: 36rpx;
				top: 2rpx;
				&.animate {
					transition: all 0.5s;
				}
			}
		}
		&.two {
			z-index: 2;
			.mov-area-con {
				width: 686rpx;
				left: 32rpx;
				top: 10rpx;
				&.animate {
					transition: all 0.5s;
				}
			}
		}
		&.three {
			z-index: 3;
			.mov-area-con {
				width: 694rpx;
				left: 28rpx;
				top: 20rpx;
				&.animate {
					transition: all 0.5s;
				}
			}
		}
		&.four {
			z-index: 4;
			.mov-area-con {
				width: 702rpx;
				left: 24rpx;
				top: 30rpx;
				&.animate {
					transition: all 0.5s;
				}
			}
		}
		&.left {
			left: -750rpx;
			z-index: 5;
			.mov-area-con {
				width: 702rpx;
				left: 24rpx;
				top: 30rpx;
				&.animate {
					transition: all 0.5s;
				}
			}
		}
		&.animate {
			z-index: 5;
			transition: all 0.5s;
		}
	}
}
</style>

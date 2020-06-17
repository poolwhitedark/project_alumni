<template>
	<view class="content">
		<!--    聊天窗口-->
		<view class="xw-content" scroll-y="true">
			<view class="xw-chat-wrap" v-for="e in chat" v-bind:key="e">
				<view class="xw-chat-wrap-left" v-show="e.fid == fid">
					<view class="xw-chat-time">{{ e.time }}</view>
					<view class="xw-chat-servicer">
						<view class="xw-servicer-avantar-wrap" v-for="item in friend" v-bind:key="item"><img :src="item.avatar_url" class="xw-servicer-avantar" /></view>
						<view class="xw-chat-msg">
							<p class="notice">{{ e.neir }}</p>
						</view>
					</view>
					<view class="xw-chat-wrap-right" v-show="e.fid == uid">
						<view class="xw-chat-time">{{ e.time }}</view>
						<view class="xw-chat-customer">
							<view class="xw-customer-avantar-wrap" v-for="item in user" v-bind:key="item"><img :src="item.avatar_url" class="xw-customer-avantar" /></view>
							<view class="xw-chat-msg" style="display:inline-block">
								<p class="notice">{{ e.neir }}</p>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bg"></view>
			<!--      发送信息-->
			<view class="xw-footer-wrap">
				<view class="xw-footer-content">
					<view class="xw-vmodel-wrap"><input class="xw-content-textarea" type="text" v-model="content" /></view>
					<view class="xw-chat-tool">
						<view class="xw-chat-tool-item" @click="send"><img src="../../static/images/chat/send.png" /></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onLoad: function(option) {
		const Fid = JSON.parse(decodeURIComponent(option.fid));
		this.fid = Fid
		console.log(this.fid)
		this.getFri()
	},
	data() {
		return {
			friend: {},
			user: {},
			chat: [],
			content: '',
			uid: '',
			fid: ''
		};
	},
	methods: {
		// fid: 代表from消息来源
		// uid: 代表消息发送者
		// 获取对象信息
		getFri() {
			uniCloud.callFunction({
				name:'goUser',
				data:{user_id: this.fid}
			})
			.then(res => {
				console.log(res.result.data[0])
				this.friend = res.result.data[0]
			})
		}
	}
};
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
}

.xw-content {
	top: 120rpx;
	position: relative;
	z-index: -1;

	.xw-chat-wrap {
		top: 60rpx;

		.xw-chat-wrap-left {
			display: block;
			padding-bottom: 100rpx;

			.xw-chat-time {
				text-align: center;
				line-height: 1;
				margin-bottom: 20rpx;
				font-size: 24rpx;
				color: #999;
				text-shadow: 2rpx 2rpx 2rpx hsla(0, 0%, 100%, 0.6);
			}

			.xw-chat-servicer {
				margin-bottom: 60rpx;
				padding-left: 40rpx;

				.xw-servicer-avantar-wrap {
					float: left;
					left: 0;
					padding-top: 0px;
					line-height: 0;

					img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 20rpx;
					}
				}

				.xw-chat-msg {
					float: left;
					background: rgba(244, 244, 244, 1);
					border-radius: 0rpx 20rpx 20rpx 20rpx;
					margin-left: 10px;

					.notice {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						padding: 0rpx 20rpx;
						color: rgba(39, 40, 50, 1);
						line-height: 44rpx;
					}
				}
			}
		}

		.xw-chat-wrap-right {
			display: block;
			padding-bottom: 160rpx;

			.xw-chat-time {
				text-align: center;
				line-height: 1;
				margin-bottom: 20rpx;
				font-size: 24rpx;
				color: #999;
				text-shadow: 2rpx 2rpx 2rpx hsla(0, 0%, 100%, 0.6);
			}

			.xw-chat-customer {
				bottom: 0;
				line-height: 0;

				.xw-customer-avantar-wrap {
					float: right;
					padding-right: 16rpx;

					img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 20rpx;
					}
				}

				.xw-chat-msg {
					float: right;
					margin-right: 20rpx;
					background: rgba(255, 234, 222, 1);
					border-radius: 20rpx 0rpx 20rpx 20rpx;

					.notice {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						padding: 0rpx 20rpx;
						color: rgba(39, 40, 50, 1);
						line-height: 44rpx;
					}
				}
			}
		}
	}
}

.xw-footer-wrap {
	position: fixed;
	bottom: 24rpx;
	height: 88rpx;

	.xw-footer-content {
		position: fixed;
		width: 100%;
		height: 120rpx;
		background: white;

		.xw-vmodel-wrap {
			position: fixed;
			width: 100%;
			height: 88rpx;
			color: white;

			.xw-content-textarea {
				margin-left: 30rpx;
				width: 700rpx;
				height: 88rpx;
				background: rgba(242, 242, 242, 1);
				border-radius: 24rpx;
				border: white;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(25, 29, 35, 1);
				line-height: 40rpx;
			}
		}

		.xw-chat-tool {
			.xw-chat-tool-item {
				position: fixed;
				right: 46rpx;
				bottom: 40rpx;

				img {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
}

.bg {
	z-index: -1;
	position: relative;
	width: 100%;
	height: 220rpx;
	color: white;
}
</style>

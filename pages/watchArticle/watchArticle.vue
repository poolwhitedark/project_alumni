<template>
	<view class="detail">
		<view class="detail-title">
			我是一个前端工程师，我们要不要学 node js
		</view>
		<view class="detail-header">
			<view class="detail-header-logo">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/2922bfd0-a6eb-11ea-9e8b-05a3242b26f2.jpeg" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					meHao
				</view>
				<view class="detail-header-content-info">

					<text>{{collection}} 动态</text>
					<text>{{followers}} 赞</text>
				</view>
			</view>
			<button type="default" class="detail-header__button"@click="follow">{{is_author_like? '取消关注':'关注'}}</button>
		</view>
		<view class="detail-content">
			<u-parse :content="content" :noData="noData"></u-parse>
			
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text >谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons :type="aixin?'heart-filled':'heart'" size="22" color="#F07373" @click="aixin1"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons :type="dianzan?'hand-thumbsup-filled':'hand-thumbsup' " size="22" color="#F07373" @click="dianzan1"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" >
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header__item" @click="close">取消 </text>
					<text class="popup-header__item" @click="submit">发布 </text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容" />
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		onLoad(data) {
			this.collection=data.collection
			this.followers=data.followers
			this.article_id=data.article_id
			console.log(this.article_id)
			uni.getStorage({
				key:'user_id'
			})
			.then(res => {
				const userId = res[1].data
				
				this.userId = userId
				console.log(this.userId)
				this.getDetail()
			})
			
			
			
			
			
			
			
		},
		onReady() {
			
		},
		data() {
			return {
				//假数据
				aixin:false,
				dianzan:false,
				collection:0,
				followers:0,
				commentsValue:'',
				article_id:'',
				userId: '',
				content:'',
					noData:'<p style="text-align:center;color:#666">详情加载中...</p>',
					is_author_like:false

			}
		},
		methods: {
			dianzan1(){
				this.dianzan=!this.dianzan
				uni.showToast({
					title:this.dianzan?'点赞成功':'取消点赞',
					icon:'none'
				})
			},
			aixin1(){
				this.aixin=!this.aixin
				uni.showToast({
					title:this.aixin?'收藏成功':'取消收藏',
					icon:'none'
				})
			},
			follow(){
				uni.showLoading({
					
				})
				uniCloud.callFunction({
					name:'updata_author',
					data:{
						user_id:this.userId,
						article_id:this.article_id
					}
				}).then(res=>{
					uni.hideLoading()
					this.is_author_like=!this.is_author_like
					uni.showToast({
						title:this.is_author_like?'关注作者成功':'取消关注作者',
						icon:'none'
					})
					console.log(res)
				})
			},
				
			submit(){
				uniCloud.callFunction({
					name:'updata_comment',
					data:{
						user_id:this.userId,
						article_id:this.article_id,
						content:this.commentsValue
					}
				}).then(res=>{
					uni.showModal({
						title: '提示',
						content: '添加成功',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					this.$refs.popup.close()
				})
			},
			openComment(){
				this.$refs.popup.open()
			},
			close(){
				// 关闭窗口清空内容 
				this.commentsValue = ''
				this.$refs.popup.close()
			},
			getDetail(){
				
				
				uniCloud.callFunction({
					name:'get_detail',
					data:{
						user_id:this.userId,
						article_id:this.article_id	
					}
				}).then(res=>{
					this.content=res.result.data[0].content
					console.log(this.content)
					this.is_author_like=res.result.data[0].is_author_like
				})
			}

		},
		components:{
			uParse
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;
	
		.detail-header-logo {
			flex-shrink: 0;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			overflow: hidden;
	
			image {
				width: 100%;
				height: 100%;
			}
		}
	
		.detail-header-content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
	
			.detail-header-content-title {
				font-size: 14px;
				color: #333;
			}
	
			.detail-header-content-info {
				color: #999;
	
				text {
					margin-right: 10px;
				}
			}
		}
		.detail-header__button {
			padding: 0 15px;
			flex-shrink: 0;
			height: 30px;
			line-height: 30px;
			border-radius: 5px;
			font-size: 12px;
			color: #fff;
			background-color: #007aff;
		}
		}
	.detail-content {
		margin-top: 20px;
		min-height: 500px;}
	.detail-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			border-top: 1px #f5f5f5 solid;
			background-color: #fff;
			box-sizing: border-box;
		
			.detail-bottom__input {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 10px;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border: 1px #ddd solid;
				border-radius: 5px;
		
				text {
					font-size: 14px;
					color: #999;
				}
			}
		
			.detail-bottom__icons {
				display: flex;
				flex-shrink: 0;
				padding: 0 10px;
		
				.detail-bottom__icons-box {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 44px;
				}
			}
		}
	
	.popup-wrap {
			background-color: #fff;
			.popup-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #F5F5F5 solid;
				.popup-header__item {
					height: 50px;
					line-height: 50px;
					padding: 0 15px;
				}
			}
			.popup-content {
				width: 100%;
				padding: 15px;
				box-sizing: border-box;
				.popup-textarea {
					width: 100%;
					height: 200px;
					
				}
				.popup-count {
					display: flex;
					justify-content: flex-end;
					font-size: 12px;
					color: #999;
				}
			}
		}	
		
		
</style>

<template>
	<view>
		<view class="zhtx-imgs">
			<view class="zhtx-single" v-for="(item, index) in list" :key="index" >
				<image :src="item" :data-src="item" mode="aspectFit"  @tap="previewImg" />
				<view class="zhtx-del" @tap="deleteItem(index)">x</view> 
			</view>
			<view v-if="limit>list.length" class="zhtx-single zhtx-addNew" :class="'bg'+loadbgurl" @tap="chooseFile" >
				<!-- <text class="zhtx-add">+</text> -->
				<image src="../../common/images/相机@2x.png"></image>
			</view>
		</view>
		<!-- <view class="num">
			<text style="color: #007AFF;font-size: 14px;">{{list.length}}</text>
			
			/{{limit}}
		</view> -->
	</view>
</template>

<script>
	
	let toast= msg=>{
		uni.showToast({
			title: msg,
			icon:'none'
		});
	}
	
	export default {
		props: {
			uImgList: {
				type: Array, //附件列表
				default () {
					return {}
				}
			},
			uploadFileUrl: {
				type: String,
				dafault: '#' // 上传文件的服务器url
			},
			header: {
				type: Object, //上传图片到服务器时，HTTP 请求 Header
				default () {
					return {}
				}
			},
			limit: {
				type: Number, //限制可上传的图片数量
				default: 9 //这里有问题???
			},
			fileKeyName: {
				type: String,
				default: 'file' //用于在服务端通过自定义key值获取该文件数据
			},
			canUploadFile: { //是否更新
				type: Boolean,
				default: true
			},
			loadbgurl: Number
		},
		computed: {
			list: {
				get(){
					return this.uImgList
				}
			}
		},
		data() {
			return {
				imageList: [],
			};
		},
		methods: {
			//预览
			previewImg(e) {
				console.log(...this.list);
				uni.previewImage({
					current: e.target.dataset.src,
					loop: true,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success:(data)=> {
							//可以自定义分享操作
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					},
					urls: this.list   //this.imageList,保持删除了的不在
				});
			},
			//删除
			deleteItem(index) {
				console.log(index);
				uni.showModal({
					title: '提示',
					content: '确定要删除此项吗？',
					success: res => {
						if (res.confirm) {
							this.imageList.splice(index,1)
							this.list.splice(index, 1); //已经达到了数据更新的状态
							// this.$forceUpdate(); //强制更新
							this.$emit('update:uImgList', this.list); //类似双向数据绑定
						}
					}
				});
			},

			chooseFile() {
				this.$emit('toIdentify')
				//双重保证
				// console.log(this.list,'pppp');
				// if (this.list.length >= this.limit) {
				// 	toast('已达到最大上传数量')
				// 	return; 
				// }
				
				// let canUploadFile = this.canUploadFile;
				// let tempFiles;
				// if (canUploadFile) {
				// 	uni.chooseImage({
				// 		count: this.limit - this.list.length,
				// 		sizeType: ['original', 'compressed'], 
				// 		sourceType: ['album', 'camera'],
				// 		success: (res) => {
				// 			// console.log(res.tempFilePaths);
				// 			tempFiles = res.tempFilePaths;
							
				// 			this.imageList = this.imageList.concat(tempFiles)
							
				// 			console.log(this.imageList);
				// 			this.list.push(...tempFiles)//如果图片一次性就超过这个值怎么使他赋的值回退
							
				// 			// #ifdef H5
				// 			if (this.list.length >= this.limit) {
				// 				this.list.splice(this.limit)
				// 				toast('已达到最大上传数量')
				// 				return; 
				// 			}
				// 			// #endif
							
				// 			this.$emit('update:uImgList', this.list); //类似双向数据绑定,更新数据, 使用.sync修饰
				// 			this.$forceUpdate();
				// 			console.log(this.list);
				// 		},
				// 		fail:err=>{
				// 			console.log(err);
				// 		}
				// 	});
						
				// } 
			},
			
			upload(){
				let files=[];
				uni.showLoading({
					title: '上传中...',
					mask: false
				});
				//这里改成异步上传会不会更好(对于跨端请求,只能重复调用api)
	
				for(let i=0; i<this.list.length;i++){
					let path=this.list[i]
					let index=i.toString()
					let files={name:index,uri:path}
					console.log(path);
					uni.uploadFile({
						url: this.uploadFileUrl,
						name: this.fileKeyName,
						filePath: path, // 使用files上传数组列表,上面两者都会失效
						files:[ //使用files仅支持app与H5
							{name:index,uri:path}
						],
						success:res=>{
							uni.hideLoading()
							console.log(res);
							this.$emit('uploadSuccess', res);
							if (res.statusCode == 200) {
								//上传成功将原信息,直接删除,
								this.list.splice(i,1)
								console.log(this.list);
								console.log(res);
								this.$forceUpdate();
							} else {
								uni.hideLoading()
								toast('上传失败,请稍后重试')				
							}
						},
						fail:err=>{
							uni.hideLoading()
							toast(err.errMsg)
							console.log(err);
						}
					})
								
				}
				
			},
			inter(inx) {
				const _self = this;
				const PPOCR = uni.requireNativePlugin('PP-BaiduOCR');
			
				if (inx == 1) {
					PPOCR.IDFront({ "auto": false }, result => {
						_self.sendmsg(result);
					});
				} else if (inx == 2) {
					PPOCR.IDFront({ "auto": true }, result => {
						_self.sendmsg(result);
					});
				} else if (inx == 3) {
					PPOCR.IDBack({ "auto": false }, result => {
						_self.sendmsg(result);
					});
				} else if (inx == 4) {
					PPOCR.IDBack({ "auto": true }, result => {
						_self.sendmsg(result);
					});
				} else if (inx == 5) {
					PPOCR.Text({ "exact": false }, result => {
						_self.sendmsg(result);
					});
				} else if (inx == 6) {
					PPOCR.Text({ "exact": true }, result => {
						_self.sendmsg(result);
					});
				} else if (inx == 7) {
					PPOCR.CustomOrder({ "order": 122 }, result => {
						_self.sendmsg(result);
					});
				}
				else if (inx == 8) {
					PPOCR.CustomOrder({ "order": 121 }, result => {
						_self.sendmsg(result);
					});
				}
			},
			sendmsg(result) {
				let _self = this;
				_self.msg = JSON.stringify(result);
				if (result.imgbase64)
					_self.bitmapsave(result.imgbase64)
			},
			bitmapsave(basedata) {
				let _self = this;
				var bitmap = new plus.nativeObj.Bitmap("test");
				console.log(_self.logoSrcs)
				bitmap.loadBase64Data(basedata, function(e) {
					bitmap.save('_doc/_tmp/ocr' + new Date().getTime() + '.png', {}, function(e) {
						_self.logoSrcs = e.target;
					});
				}, function() {
					console.log('加载Base64图片数据失败：' + JSON.stringify(e));
				});
			}
			
		}
	};
</script>

<style  lang="scss">
	.zhtx-imgs {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}
	.zhtx-del {
		position: absolute;
		width: 35rpx;
		height: 35rpx;
		background: #f56c6c;
		color: #fff;
		top: 0;
		text-align: center;
		right: 0;
		line-height: 28rpx;
		font-size: 30rpx;
		z-index: 100;
	}
	.zhtx-single {
		position: relative;
		width: 354rpx;
		height: 245rpx;
		border: 1px dashed #ccc;
		margin: 20rpx 10rpx;
		
	}
	.bg0{
		background:url("../../common/images/组 7@2x.png") no-repeat  center/100% 100%;
	}
	.bg1{
		background:url("../../common/images/反@2x.png") no-repeat  center/100% 100%;
	}
	.bg2{
		width: 526rpx;
		height: 366rpx;
		margin: 20rpx auto;
		background:url("../../common/images/yyzz.png") no-repeat  center/100% 100%;
	}
	.zhtx-addNew {
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 121rpx;
			height: 121rpx;
			display: block;
		}
			
	}
	text {
		font-size: 50rpx;
		color: #999;
	}
	image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.num{
		float: right;
		color: #ccc;
		font-size: 12px;
	}
	.num::after{
		clear: both;
	}
</style>

<template>
	<view class="content">
		<jxImgTextEdit ref="jxImgTextEdit" :editData="edits" @delImg="delImg"></jxImgTextEdit>
		<!-- 底部 -->
		<view class="footer" id="footer">
			<view class="upImg_btn" @click="uploadImg()">
				<image class="image" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/54ec1440-a97f-11ea-8bd0-2998ac5bbf7e.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
import jxImgTextEdit from '@/components/jx-imgText-edit/jx-imgText-edit.vue';
export default {
	components: {
		jxImgTextEdit
	},
	data() {
		return {
			edits: []
		};
	},
	onLoad(option) {
		this.edits = [];
		this.edits.push({
			type: 'textarea',
			value: ''
		});
	},
	onNavigationBarButtonTap(e) {
		this.submit();
	},
	methods: {
		uploadImg() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], //从相册选择
				success: res => {
					res.tempFilePaths.forEach(ele => {
						let data = this.$refs.jxImgTextEdit.submit();
						data.push({
							type: 'img',
							value: ele
						});
						data.push({
							type: 'textarea',
							value: ''
						});
						this.edits = data;
					});
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		//删除图片
		delImg(index) {
			console.log(index);
			this.edits.splice(index, 1);
			if (this.edits[index].value == '') {
				this.edits.splice(index, 1);
			}
		},
		//提交
		submit() {
			let data = this.$refs.jxImgTextEdit.submit();
			console.log(data);
			let content = ``; //富文本html
			let content_raw = ``; //获取输入的文字
			data.forEach(ele => {
				if (ele.type == 'textarea' && ele.value != '') {
					content += `<p style="margin: 0">${ele.value}</p>`;
					content_raw += `${ele.value}。`;
				} else if (ele.type == 'img' && ele.value != '') {
					content += `<div style="margin-top: 10px"><img style="max-width:100%" src="${ele.value}"/></div>`;
				}
			});
			console.log(content);
			console.log(content_raw);
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	padding-bottom: 88rpx;
}
.footer {
	width: 100%;
	height: 88rpx;
	position: fixed;
	z-index: 80;
	left: 0;
	bottom: 0px;
	border-top: 1rpx solid #e6e6e6;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	background: #fff;
	.upImg_btn {
		width: 100rpx;
		height: 88rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.image {
			width: 50rpx;
			height: 50rpx;
		}
	}
}
</style>

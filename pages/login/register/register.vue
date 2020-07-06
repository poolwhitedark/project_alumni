<template>
	<view class="content">
		<!-- 图标 -->
		<view class="title">
			<text class="f18 fb"  @click="$Router.push('/pages/text/index')">{{ resetPwd ? '忘记密码' : '注册小哈账号' }}</text>
			<p class="f12 pt_10">{{ resetPwd ? '下次不要忘了呦！' : '输入手机号进行注册' }}</p>
		</view>
		<!-- 登陆 -->
		<view class="main">
			<view class="inputs">
				<view class="inputs-div">
					<p class="f12 pt_10">手机号</p>
					<input class="input" type="number" maxlength="11" v-model="phoneNum" />
				</view>

				<view class="inputs-div">
					<p class="f12">验证码</p>
					<input class="input" type="text" v-model="code" />
					<button class="f12" :style="smsFlag ? 'background:rgb(38, 113, 255);color:#fff;' : ''" @click="checkPhone">{{ smsFlag ? '获取验证码' : '剩余' + startVal + 's' }}</button>
				</view>
				<view class="inputs-div">
					<p class="f12">新密码</p>
					<input class="input" :type="type1" @blur="checknumber()" v-model="password" />
					<image :src="showurl1" class="show" @click="showon(1)"></image>
				</view>
				<view class="inputs-div">
					<p class="f12">确认密码</p>
					<input class="input" :type="type2" @blur="check()" v-model="check_password" />
					<text class="checknumber" v-show="checkshow">{{ rulesTxt }}</text>
					<image :src="showurl2" class="show" @click="showon(2)"></image>
				</view>
			</view>
		</view>
		<!-- 登陆按钮 -->
		<view class="submit" @click="submit">{{ registerTxt }}</view>
	</view>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
let phoneVerify = /^1[3456789]\d{9}$/;
let Password = /^[a-zA-Z][a-zA-Z0-9]*$/;
export default {
	data() {
		return {
			type1: 'password',
			type2: 'password',
			isemail: 0, //邮箱是否占位
			show1: false, // 是否显示密码
			show2: false, // 是否显示密码
			invalid: false, // 邮箱是否符合
			employ: false, //是否被占用
			showurl1: '../../../static/images/register/showin.png',
			showurl2: '../../../static/images/register/showin.png',
			email: '',
			phoneNum: '',
			code: '',
			password: '',
			checkshow: false,
			check_password: '',
			registerTxt: '注册',
			rulesTxt: '',
			smsFlag: true,
			startVal: 60,
			codeDisabled: true,
			appId: 'EUCP-EMY-SMS0-252MR',
			timestamp: '20200619110912',
			secretKey: '0033140387416947',
			resetPwd: false
		};
	},
	onLoad() {
		if(this.$route.query.resetPwd){
			this.resetPwd = this.$route.query.resetPwd
			this.registerTxt='提交'
			}
	},
	methods: {
		//验证码倒计时
		settime() {
			//倒计时
			var that = this;
			if (that.startVal > 0) {
				that.smsFlag = false;
				that.startVal--;
				setTimeout(function() {
					that.settime();
				}, 1000);
			} else {
				that.startVal = 60;
				that.smsFlag = true;
				that.codeDisabled = true;
			}
		},
		//密码是否显隐
		showon: function(e) {
			console.log(e);
			if (e == 1) {
				if (this.show1) {
					this.type1 = 'password';
					this.show1 = !this.show1;
					this.showurl1 = '../../../static/images/register/showin.png';
				} else {
					this.type1 = 'text';
					this.show1 = !this.show;
					this.showurl1 = '../../../static/images/register/showon.png';
				}
			} else {
				if (this.show2) {
					this.type2 = 'password';
					this.show2 = !this.show1;
					this.showurl2 = '../../../static/images/register/showin.png';
				} else {
					this.type2 = 'text';
					this.show2 = !this.show;
					this.showurl2 = '../../../static/images/register/showon.png';
				}
			}
		},

		goLogin: function() {
			uni.navigateBack({
				delta: 1
			});
		},
		checknumber() {
			var reg = /^[A-Za-z0-9]{6,20}$/;
			if (reg.test(this.password)) {
				this.checkshow = false;
			} else {
				this.checkshow = true;
				return (this.rulesTxt = '请输入6-20位字母数字组合的新密码');
			}
		},
		check() {
			if (this.check_password.length > 0 && this.password !== this.check_password) {
				this.checkshow = true;
				return (this.rulesTxt = '确认密码必须与首次密码一致');
			} else {
				this.checkshow = false;
			}
		},
		submit() {
			if (this.phoneNum == '') {
				this.checkshow = true;
				return (this.rulesTxt = '请输入手机号/账号');
			} else if (!phoneVerify.test(this.phoneNum)) {
				this.checkshow = true;
				return (this.rulesTxt = '请输入正确的手机号码');
			} else if (this.code == '') {
				this.checkshow = true;
				return (this.rulesTxt = '请输入验证码');
			} else if (this.password == '') {
				this.checkshow = true;
				return (this.rulesTxt = '请输入密码');
			}
			uniCloud
				.callFunction({
					name: 'register',
					data: {
						user_id: this.phoneNum,
						code: this.code,
						password: this.password
					}
				})
				.then(res => {
					uni.navigateTo({
						url: '../login'
					});
				});
		},
		checkPhone() {
			if (this.phoneNum == '') {
				this.checkshow = true;
				return (this.rulesTxt = '请输入手机号/账号');
			} else if (!phoneVerify.test(this.phoneNum)) {
				this.checkshow = true;
				return (this.rulesTxt = '请输入正确的手机号码');
			}
			if (this.codeDisabled) {
				this.checkshow = false;
				this.codeDisabled = false;
				let sign = this.$md5(this.appId + this.timestamp + this.secretKey);

				uni.navigateTo('http://www.btom.cn:8080/simpleinter/sendSMS')
				// window.location.href =
				// 	'http://www.btom.cn:8080/simpleinter/sendSMS?appId=' +
				// 	this.appId +
				// 	'&timestamp=' +
				// 	this.timestamp +
				// 	'&sign=' +
				// 	sign +
				// 	'&mobiles=' +
				// 	this.phoneNum +
				// 	'&content=' +
				// 	'欢迎加入百仁小哈!';
				// this.$http({
				// 	method: 'get',
				// 	url: 'http://www.btom.cn:8080/simpleinter/sendSMS',
				// 	contentType: 'application/json;charset=UTF-8',
				// 	data: {
				// 		appId: this.appId,
				// 		timestamp: this.timestamp,
				// 		sign,
				// 		mobiles: this.phoneNum,
				// 		content: '欢迎加入百仁小哈!'
				// 	},
				// 	dataType: 'json'
				// }).then(res=>{
				// 	console.log(res,"sendSMS");

				// })
					uniCloud
						.callFunction({
							name: 'checkRegister',
							data: {
								user_id: this.phoneNum
							}
						})
						.then(res => {
							if (res.result.status === true) {
								console.log('0000000')
								uni.showModal({
									content: '该手机号已经存在',
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
								this.codeDisabled = true;
							} else {
								this.settime();

							}
						});
			}
		}
	}
};
</script>

<style lang="scss">
.top-bar {
	position: absolute;
	top: 0;
	width: 100%;
	height: 88rpx;
	padding-top: var(--status-bar-height);
	box-sizing: border-box;
	background: $uni-bg-color;
	margin-top: 16rpx;

	.top-bar-left {
		float: left;
		padding-left: 24rpx;
		padding-top: 20rpx;

		.back {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.top-bar-right {
		float: right;
		margin-bottom: 30rpx;
		padding-right: 24rpx;
		padding-top: 20rpx;

		.close {
			width: 48rpx;
			height: 48rpx;
		}
	}
}

.uni-input-placeholder {
	position: absolute;
	top: auto !important;
	left: 0;
	color: #999;
	padding-left: 39rpx;
	font-size: 12rpx;
}
.title {
	padding: 100rpx 0 0 80rpx;
	color: rgba(34, 34, 34, 1);
	.logo-image {
		width: 400rpx;
		height: 400rpx;
	}
	> p {
		color: rgba(102, 102, 102, 1);
	}
}

.main {
	padding: 54rpx $uni-spacing-row-lg 120rpx;
	p {
		color: #666;
	}
	.inputs {
		.input {
			border: none;
			height: 60rpx;
			width: 590rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 88rpx;
			border-bottom: 1rpx solid $uni-border-color;
		}
		.inputs-div {
			position: relative;
			padding: 20rpx 20rpx 0;
			> button {
				width: 180rpx;
				line-height: 44rpx;
				color: rgba(161, 175, 200, 1);
				position: absolute;
				// top:0;
				bottom: 14rpx;
				right: 20rpx;
			}
		}

		.employ,
		.checknumber {
			position: absolute;
			top: 100rpx;
			left: 10rpx;
			margin-top: 20rpx;
			margin-left: 5rpx;
			font-size: 28rpx;
			color: #f07373;
		}
		.invalid {
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			float: right;
			font-size: $uni-font-size-base;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255, 93, 91, 1);
			line-height: 40rpx;
			padding-left: 10rpx;
		}
		.show {
			position: absolute;
			right: 30rpx;
			top: 70rpx;
			width: 42rpx;
			height: 32rpx;
		}
		.ok {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			width: 42rpx;
			height: 32rpx;
		}
	}
}

.submit {
	margin: 140rpx auto 0;
	width: 560rpx;
	height: 96rpx;
	background: #2658ff;
	box-shadow: 0px 20px 16px -18px #2658ff;
	border-radius: 20rpx;
	font-size: $uni-font-size-lg;
	font-weight: 520;
	color: rgba(255, 255, 255, 1);
	line-height: 96rpx;
	text-align: center;

	&:active {
		background-color: #48689e;
	}
}
</style>

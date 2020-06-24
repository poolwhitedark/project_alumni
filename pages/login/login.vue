<template>
	<view class="content">
		<!-- 图标 -->
		<view class="logo tc"><image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/a81c29e0-a7a2-11ea-b244-a9f5e5565f30.png" class="logo-image"></image></view>
		<!-- 登陆 -->
		<view class="main">
			<view class="slogan tc fb">欢迎来到小哈</view>
			<view class="inputs">
				<input class="input pt_10" type="number" placeholder="请输入手机号/账号" maxlength="11" v-model="user" @blur="getUser" />
				<input class="input pt_10" type="text" :placeholder="LoginMethod ? '请输入验证码' : '请输入密码'" password="true" v-model="password" @blur="getPwd" />
				<text v-if="LoginMethod" class="pwdCol f12" @click="checkPhone">{{ smsFlag ? '获取验证码' : '剩余' + startVal + 's' }}</text>
				<view v-else class="pwdCol fr tr f12" @click="$router.push({path:'/pages/register/register',query:{resetPwd:true}})">忘记密码</view>
			</view>
			<view class="tips f14" v-show="login">{{ rulesTxt }}</view>
		</view>
		<!-- 登陆按钮 --> 
		<view class="submit" @click="onlogin">登录</view>
		<view class="pwdCol mt_10 tc f12" @click="setLoginMethod">{{ LoginMethod ? '账号密码登录' : '手机快速登录' }}</view>
		<view class="pt_20 tc">
			<image src="/static/images/signin/wx.png" class="wxIcon"></image>
			<view class="pwdCol f12">其他方式登录</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
let phoneVerify = /^1[3456789]\d{9}$/;
let Password = /^[a-zA-Z][a-zA-Z0-9]*$/;
export default {
	data() {
		return {
			login: false,
			user: '',
			password: '',
			LoginMethod: true,
			rulesTxt: '',
			smsFlag: true,
			startVal: 60,
			codeDisabled : true
		};
	},
	onLoad() {},
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
		//跳转到注册页面
		onNavigationBarButtonTap: function(e) {
			uni.navigateTo({
				url: '../register/register'
			});
		},
		getUser() {
			console.log(this.user);
		},
		getPwd() {
			console.log(this.password);
		},
		setLoginMethod(){
			this.login = false;
			this.LoginMethod=!this.LoginMethod
		},
		onlogin() {
			if (this.user == '') {
				this.login = true;
				return (this.rulesTxt = '请输入手机号/账号');
			} else if (!phoneVerify.test(this.user)) {
				this.login = true;
				return (this.rulesTxt = '请输入正确的手机号码');
			} else if (this.password == '') {
				this.login = true;
				return (this.rulesTxt = this.LoginMethod ? '请输入验证码' : '请输入密码');
			}
			uniCloud
				.callFunction({
					name: 'login',
					data: {
						user_id: this.user,
						password: this.password
					}
				})
				.then(res => {
					console.log(res);
					if (res.result.status === 0) {
						const userId = this.user;
						uni.switchTab({
							url: '/pages/home/home',
							success() {
								uni.setStorage({
									key: 'token',
									data: 'ok'
								});
								uni.setStorage({
									key: 'user_id',
									data: userId
								});
							}
						});
						this.$store.commit('setUser_id', this.user);
					} else {
						console.log('登陆失败');
					}
				});
		},
		checkPhone() {
			if (this.user == '') {
				this.login = true;
				return (this.rulesTxt = '请输入手机号/账号');
			} else if (!phoneVerify.test(this.user)) {
				this.login = true;
				return (this.rulesTxt = '请输入正确的手机号码');
			}
			if(this.codeDisabled){
				this.codeDisabled = false;
				
				this.settime()
				
				
			}
			
		}
	}
};
</script>

<style lang="scss">
.pwdCol {
	line-height: 80rpx;
	color: rgba(162, 175, 200, 1);
}
.uni-input-placeholder {
	position: absolute;
	top: auto !important;
	left: 0;
	color: #999;
	padding-left: 39rpx;
	font-size: 12rpx;
}

.top-bar {
	position: absolute;
	top: 0;
	width: 100%;
	height: 88rpx;
	box-sizing: border-box;
	background: $uni-bg-color;
	.top-bar-left {
		float: right;
		margin-left: 50rpx;
		.text {
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 510;
			color: rgba(51, 51, 51, 1);
			line-height: 88rpx;
			padding-right: 56rpx;
		}
	}
}

.logo {
	.logo-image {
		width: 320rpx;
		height: 300rpx;
	}
}

.main {
	width: 100%;
	padding: 0 100rpx 160rpx;

	.title {
		font-size: 56rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(39, 40, 50, 1);
		line-height: 80rpx;
	}

	.slogan {
		text-align: center;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #32373f;
	}

	.inputs {
		padding-top: 52rpx;
		position: relative;
		.input {
			height: 88rpx;
			width: 560rpx;
			font-size: $uni-font-size-lg;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 88rpx;
			border-bottom: 0.2rpx solid $uni-border-color;
		}
		> text {
			position: absolute;
			bottom: 0;
			right: 50rpx;
		}
	}

	.tips {
		float: left;
		color: $uni-color-warning;
		line-height: 56rpx;
	}
}
.wxIcon {
	width: 76rpx;
	height: 76rpx;
}
.submit {
	margin: 0 auto;
	width: 360rpx;
	height: 96rpx;
	background: #2658ff;
	box-shadow: 0px 20px 16px -18px #2658ff;
	border-radius: 16rpx;
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

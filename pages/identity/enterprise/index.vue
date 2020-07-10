<template>
  <view class="personal-container">
    <view class="steps">
      <view class="steps-line">
        <view class="steps-line-item" v-for="(item,i) in 3" :key="i">
          <view :style="step>=i?'border: 1px solid #2658FF;':''">
            <view :style="step>=i?'background: #2658FF;':''"></view>
          </view>
          <view v-if="item!=3" :style="step-1>=i?'border: 1px solid #2658FF;':''"></view>
        </view>
      </view>
      <view class="steps-txt">
        <view v-for="(item,i) in stepsTxt" :key="i" :style="step>=i?'color:#2658FF;':''">{{item}}</view>
      </view>
    </view>
    <view v-if="step==0" class="realname">
        <view class="subhead">请扫描身份证</view>
		<view class="idCard">
			<view>
				<uImg
					ref="upimg"
					:canUploadFile="true"
					:limit="limitNum"
					:uploadFileUrl="uploadFileUrl"
					:heaer="header"
					:loadbgurl="0"
					:fileKeyName="name"
					:uImgList.sync="uImgList"
					@tap="chooseFile"
				></uImg>
				<view class="grey f12"  align='center'>请上传身份证正面</view>
			</view>
			<view>
				<uImg
					ref="upimg"
					:canUploadFile="true"
					:limit="limitNum"
					:uploadFileUrl="uploadFileUrl"
					:heaer="header"
					:loadbgurl="1"
					:fileKeyName="name"
					:uImgList.sync="uImgList"
				></uImg>
				<view class="grey f12"  align='center'>请上传身份证反面</view>
			</view>
		</view>
        <view class="subhead">基本信息</view>
        <tj_field class="f15" title="职业" align="r" v-model="field" placeholder="请输入真实姓名"></tj_field>
        <tj_field class="f15" title="毕业院校" align="r" v-model="field" placeholder="保存后无法修改"></tj_field>
		<view align='center' @click="onlogin">下一步</view>
    </view>
    <view v-if="step==1" class="enterprise">
      <view class="subhead">营业执照</view>
	  <view  class="pb_20">
		  <view>
				<uImg
					ref="upimg"
					:canUploadFile="true"
					:limit="limitNum"
					:uploadFileUrl="uploadFileUrl"
					:heaer="header"
					:loadbgurl="2"
					:fileKeyName="name"
					:uImgList.sync="uImgList"
					@toIdentify="toIdentify(1)"
				></uImg>
				<view class="grey f12"  align='center'>请上传身份证正面</view>
			</view>
	  </view>
      <view class="subhead">基本信息</view>
      <tj_field
        labelWidth="180rpx"
        class="f15"
        title="企业名称"
        align="r"
        v-model="field"
        placeholder="请输入企业名称"
      ></tj_field>
      <tj_field
        labelWidth="180rpx"
        class="f15"
        title="企业负责人"
        align="r"
        v-model="field"
        placeholder="请输入企业法人"
      ></tj_field>
      <!-- <tj_cell class="f15" title="企业类型" value="请选择取车地点"></tj_cell> -->
	  <view align='center' @click="onlogin">提交</view>
    </view>
	
    <view v-if="step==2" class="submit">
		<view align='center'>
			<image :src='submitState[0].url'></image>
		</view>
		<view align='center' class="grey f14" >{{submitState[0].txt}}</view>
		<view align='center' @click="onlogin">登录</view>
	</view>
  </view>
</template>
<script>
import tj_panel from "library/panel/index.vue";
import tj_row from "library/row/index.vue";
import tj_field from "library/field/index.vue";
import tj_cell from "library/cell/index.vue";
import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';
let toast = msg => {
	uni.showToast({
		title: msg,
		icon: 'none'
	});
};
export default {
  data() {
    return {
      field: "",
      stepsTxt: ["实名认证", "企业认证", "提交"],
	  step: 1,
	  submitState:[{url:require('common/images/组 3@2x.png'),txt:'请耐心等待，后台正在快马加鞭审核！'},{url:require('common/images/组 1@2x.png'),txt:'认证成功啦！'},{url:require('common/images/圆角矩形 3 拷贝@2x.png'),txt:'很遗憾，认证失败啦！'}],
	  msg: '',
	  length: 140,
	  placeholder: '欢迎反馈任何意见和问题,您的反馈也是我们产品的动力哦',
	  limitNum: 1,
	  uploadFileUrl: '', //替换成你的后端接收文件地址
	  name: '', //上传的名字
	  header: {
	  	// 如果需要header，请上传
	  },
	  uImgList: [],
    };
  },
  components: {
    tj_panel,
    tj_row,
    tj_field,
	uImg
  },
  computed: {
  	computeLength() {
  		return (this.length = 140 - this.msg.length);
  	}
  },
  methods: {
	  toIdentify(e){
		  console.log(e)
		  this.$refs.upimg.inter(e);
	  },
	  uploadSuccess(result) {
		  console.log(111)
		  console.log(result,'result')
	  	if (result.statusCode == 200) {
	  		//上传成功的回调处理
	  		toast('上传成功');
	  	} else {
	  		toast('上传失败');
	  	}
	  },
    formSubmit: function(e) {
      console.log(
        "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value)
      );
      var formdata = e.detail.value;
      uni.showModal({
        content: "表单数据内容：" + JSON.stringify(formdata),
        showCancel: false
      });
    },
    formReset: function(e) {
      console.log("清空数据");
    }
  }
};
</script>

<style lang="scss">
.personal-container {
  .steps {
    height: 142rpx;
    padding: 30rpx 0 0;
    .steps-line,
    .steps-txt {
      display: flex;
      vertical-align: baseline;
    }
    .steps-line {
      padding: 0 134rpx;
      .steps-line-item {
        display: flex;
        vertical-align: baseline;
        > view:nth-of-type(1) {
          display: inline-block;
          width: 22rpx;
          height: 22rpx;
          border-radius: 50%;
          border: 1px solid rgba(213, 213, 213, 1);
          padding: 2rpx;
          > view {
            width: 14rpx;
            height: 14rpx;
            background: rgba(213, 213, 213, 1);
            border-radius: 50%;
          }
        }
        > view:nth-of-type(2) {
          margin: 10rpx 0;
          width: 209rpx;
          height: 1px;
          border: 1px solid rgba(213, 213, 213, 1);
        }
      }
    }
    .steps-txt {
      padding: 0 30rpx;
      > view {
        flex: 1;
        font-size: 32rpx;
        text-align: center;
        font-weight: 600;
        color: #d5d5d5;
        line-height: 70rpx;
      }
    }
  }
  .realname,.enterprise{
	  >view:nth-last-child(1){
		  width: 690rpx;
		  line-height: 88rpx;
		  border-radius: 16rpx;
		  color: #fff;
		  margin:60rpx auto;
		  background-image: linear-gradient(to right, #1777f9 , #2658ff);
	  }
  }
  .subhead {
    font-weight: 500;
    padding: 0 30rpx;
    font-size: 14px;
    height: 60rpx;
    line-height: 60rpx;
    background: rgba(241, 247, 254, 1);
  }
  .realname{
	  .idCard{
		  padding: 0 0 40rpx;
		  display: flex;
	  }
  }
  .tj-field {
    padding: 0 30rpx;
  }
  .tj-cell {
    margin: 0 30rpx;
    border-bottom: 1px solid #eee;
  }
  .submit{
	  >view:nth-of-type(1){
		  padding: 59rpx 0;
		  image{
			  width: 479rpx;
			  height: 460rpx;
		  }
	  }
	  >view:nth-of-type(3){
		  width: 450rpx;
		  line-height: 88rpx;
		  color: #fff;
		  margin:100rpx auto;
		  border-radius: 16rpx;
		  background-image: linear-gradient(to right, #1777f9 , #2658ff);
		    
	  }
  }

  
}
</style>
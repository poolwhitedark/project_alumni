<template>
  <view class="personal-container">
    <form @submit="formSubmit">
      <view class="uni-form-item uni-column f15">
        <text class="mainColor title fb">身份选择</text>
        <radio-group @change="typeChange">
          <label v-for="(item, index) in types" :key="item.value">
            <radio
              :class="index==1&&'ml_30'"
              class="f12"
              :value="item.value"
              :checked="item.checked"
            />
            <text>{{item.name}}</text>
          </label>
        </radio-group>
      </view>
      <tj_field class="mainColor fb f15" title="姓名" v-model="personalInfo.name"></tj_field>
      <view class="uni-form-item uni-column f15">
        <text class="mainColor title fb">性别</text>
        <radio-group name="sex">
          <label v-for="(item, index) in sexs" :key="item.value">
            <radio
              :class="index==1&&'ml_30'"
              class="f12"
              :value="item.value"
              :checked="item.checked"
            />
            <text>{{item.name}}</text>
          </label>
        </radio-group>
      </view>
      <tj_field
        class="mainColor fb f15"
        type="number"
        :maxlength="11"
        title="手机号码"
        v-model="personalInfo.phone"
      ></tj_field>
      <tj_field
        v-if="personalInfo.type=='2'"
        class="grey f15"
        title="职业"
        v-model="personalInfo.occupation"
      ></tj_field>
      <tj_field
        v-if="personalInfo.type=='2'"
        class="grey f15"
        title="毕业院校"
        v-model="personalInfo.school_finish"
      ></tj_field>
      <tj_field v-else class="grey f15" title="在读学校" v-model="personalInfo.school_in"></tj_field>
      <view class="uni-form-item f15">
        <view class="title grey">职业生涯</view>
      </view>
      <textarea
        maxlength="300"
        v-model="personalInfo.career_describe"
        placeholder="让更多人了解你吧！(限300字)"
      />
      <view class="uni-form-item f15">
        <view class="title grey">签名</view>
      </view>
      <textarea
        maxlength="50"
        v-model="personalInfo.word"
        style="height: 88rpx;"
        placeholder="设计自己的签名"
      />
      <view class="uni-form-item uni-column f15">
        <view class="notes">注意：蓝字必填，黑字选填</view>
      </view>
      <view class="uni-btn-v">
        <button form-type="submit">确定</button>
      </view>
    </form>
  </view>
</template>
<script>
import tj_panel from "library/panel/index.vue";
import tj_row from "library/row/index.vue";
import tj_field from "library/field/index.vue";
let phoneVerify = /^1[3456789]\d{9}$/;
export default {
  data() {
    return {
      personalInfo: {
        type: "1", //1是学生 3是职友
        name: "", //姓名
        sex: "", // 1是男 2是女
        phone: "", //电话
        occupation: "", // 职业
        school_in: "", //在职学校
        school_finish: "", //毕业学业
        career_describe: "", // 职业生涯模型
        word: "" // 名言
      },

      types: [
        
        {
          value: "1",
		  name: "学生",
          checked: "true"
		},
		{
          value: "2",
          name: "职友"
        },
      ],
      sexs: [
        {
          value: "1",
          name: "男",
          checked: "true"
        },
        {
          value: "2",
          name: "女"
        }
      ]
    };
  },
  components: {
    tj_panel,
    tj_row,
    tj_field
  },
  methods: {
    formSubmit(e) {
      this.personalInfo.sex = e.detail.value.sex;
      if (this.personalInfo.name == "")
        return uni.showToast({ title: "请填写姓名", icon: "none" });
      else if (this.personalInfo.phone == "")
        return uni.showToast({ title: "请输入手机号", icon: "none" });
      else if (!phoneVerify.test(this.personalInfo.phone))
        return uni.showToast({ title: "请输入正确的手机号码", icon: "none" });
      else if (this.personalInfo.occupation == ""&&this.personalInfo.type=='2')
        return uni.showToast({ title: "请输入职业", icon: "none" });
      else if (this.personalInfo.school_in == ""&&this.personalInfo.type=='1')
        return uni.showToast({ title: "请输入在职学校", icon: "none" });
      else if (this.personalInfo.school_finish == ""&&this.personalInfo.type=='2')
        return uni.showToast({ title: "请输入毕业学校", icon: "none" });
      else if (this.personalInfo.career_describe == "")
        return uni.showToast({ title: "请输入职业生涯", icon: "none" });
      else if (this.personalInfo.word == "")
        return uni.showToast({ title: "请输入签名", icon: "none" });
      uniCloud
        .callFunction({
          name: "createInfo",
          data: this.personalInfo
        })
        .then(res => {
          console.log(res);
          if (res.result.code === 200) {
            uni.switchTab({
              url: "/pages/home/index",
            });
          } else {
            uni.showToast({
              title: res.result.msg,
              icon: "none"
            });
          }
        });
    },
    typeChange(evt) {
      this.personalInfo.type = evt.detail.value;
    }
  }
};
</script>

<style lang="scss">
.personal-container {
  padding: 30rpx 30rpx 60rpx;
  .uni-form-item {
    height: 90rpx;
    line-height: 90rpx;

    .title {
      display: inline-block;
      width: 148rpx;
    }

    radio-group {
      display: inline-block;
    }
  }
  .uni-column {
    border-bottom: 1px solid #eee;
  }

  textarea {
    width: 100%;
    padding: 24rpx;
    height: 270rpx;
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 20rpx;
  }
  .uni-btn-v {
    uni-button {
      border-radius: 14rpx;
      color: #fff;
      background: linear-gradient(
        -45deg,
        rgba(39, 89, 255, 1) 0%,
        rgba(23, 119, 249, 1) 100%
      );
    }
  }
}
</style>

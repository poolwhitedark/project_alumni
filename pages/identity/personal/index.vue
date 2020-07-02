<template>
  <view class="personal-container">
    <form @submit="formSubmit" @reset="formReset">
      <view class="uni-form-item uni-column f15">
        <text class="mainColor title  fb">身份选择</text>
        <radio-group name="radio">
          <label>
            <radio class="f12" value="radio1" />
            <text>职业</text>
          </label>
          <label>
            <radio value="radio2" />
            <text>学生</text>
          </label>
        </radio-group>
      </view>
      <tj_field class="mainColor fb f15" title="姓名" v-model="field" placeholder=''></tj_field>
      <view class="uni-form-item uni-column f15">
        <text class="mainColor title  fb">性别</text>
        <radio-group name="radio">
          <label>
            <radio class="f12" value="radio1" />
            <text>职业</text>
          </label>
          <label>
            <radio value="radio2" />
            <text>学生</text>
          </label>
        </radio-group>
      </view>
      <tj_field class="mainColor fb f15" title="手机号码" v-model="field" placeholder=''></tj_field>
      <tj_field class="mainColor fb f15" title="职业" v-model="field" placeholder=''></tj_field>
      <tj_field class="mainColor fb f15" title="毕业院校" v-model="field" placeholder=''></tj_field>
    </form>
  </view>
</template>
<script>
import tj_panel from "library/panel/index.vue";
import tj_row from "library/row/index.vue";
import tj_field from "library/field/index.vue";
export default {
  data() {
    return {
      field: ""
    };
  },
  components: {
    tj_panel,
    tj_row,
    tj_field
  },
  methods: {
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

<style  lang="scss">
.personal-container {
  padding: 30rpx;
  .uni-form-item{
      height: 55px;
    line-height: 55px;
    text{
        width: 148rpx;
    }
      radio-group{
          display: inline-block;
      }
  }
}
</style>

const app = getApp()
let phoneVerify = /^1[3456789]\d{9}$/;
Page({
  data: {
    max: 1000, //限制最大输入字符数
    min: 10, //限制最小输入字符数
    minWord: '', //提示语句
    content: '',
    phone: '',
  },
  onLoad: function (options) {

  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getValueLength: function (e) {
    let value = e.detail.value
    let len = parseInt(value.length)
    this.setData({
      content: value
    })
    //最少字数限制
    if (len < this.data.min)
      this.setData({
        minWord: "至少填写10个字～"
      })
    else if (len > this.data.min)
      this.setData({
        minWord: " "
      })
    //最多字数限制
    if (len > 1000) return;
    this.setData({
      currentWordNumber: len //当前字数 
    })
  },
  Submit() {
    let that = this;
    if (that.data.content.length < 10)return wx.showToast({
      title: "意见反馈不能少于10字以下！",
      icon: 'none',
    })
    app
      .request('commitFeedBack', 'POST', {
        content: that.data.content,
        phone: that.data.phone,
      })
      .then((res) => {
        that.setData({
          content: '',
          phone: '',
        })
        wx.showToast({
          title: "反馈成功",
          icon: 'none',
        })
      }).catch(err => {

      })
  },
})
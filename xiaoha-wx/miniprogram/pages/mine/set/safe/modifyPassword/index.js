const app = getApp()
let phoneVerify = /^1[3456789]\d{9}$/;
let clearList=wx.getStorageSync('clearList')||[]
Page({
  data: {
    type: "",
    phone: "",
    vcode: "",
    password: "",
    smsFlag: true,
    startVal: 60,
    codeDisabled: true,
    clearList:[]
  },
  onLoad: function (options) {
    this.setData({
      type: options.type,
    })
    if (options.type == 1) {
      this.setData({
        phone: options.phone
      })
    }
    try {
      let clearList = wx.getStorageSync('clearList')
     if (clearList) {
       this.setData({
         clearList
       })
     }
   } catch (e) {}
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getVcode(e) {
    this.setData({
      vcode: e.detail.value
    })
  },
  getPwd(e) {
    this.setData({
      password: e.detail.value
    })
  },
  checkPhone() {
    let that = this;
    if (that.data.phone == '') return wx.showToast({
      title: "请输入新手机号",
      icon: 'none',
    })
    else if (!phoneVerify.test(that.data.phone)) return wx.showToast({
      title: "请输入正确的新手机号码",
      icon: 'none',
    })
    if (that.data.codeDisabled) {
      that.setData({
        codeDisabled: false
      })
      app
        .request('sms/sendSms', 'POST', {
          phone: that.data.phone,
          type: that.data.type == 1 ? 1 : 2,
        })
        .then((res) => {
          that.settime()
        }).catch(err => {

        })

    }

  },
  settime() {
    //倒计时
    var that = this;
    if (that.data.startVal > 0) {
      let startVal = that.data.startVal - 1
      that.setData({
        smsFlag: false,
        startVal
      })
      setTimeout(function () {
        that.settime();
      }, 1000);
    } else {
      that.setData({
        smsFlag: true,
        startVal: 60,
        codeDisabled: true
      })
    }
  },
  submit() {
    let that = this,url = '',params = {};
    let reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(.{6,16})$/;
      if (that.data.phone == '') return wx.showToast({
        title: "请输入新手机号",
        icon: 'none',
      })
    else if (!phoneVerify.test(that.data.phone)) return wx.showToast({
      title: "请输入正确的新手机号码",
      icon: 'none',
    })
    else if (that.data.vcode == '') return wx.showToast({
      title: "验证码不能为空",
      icon: 'none',
    })
    else if (that.data.password == '' && that.data.type == 1) return wx.showToast({
      title: "密码不能为空",
      icon: 'none',
    })
    else if (!reg.test(that.data.password) && that.data.type == 1) return wx.showToast({
      title: "请输入6-16位字母数字组合的新密码",
      icon: 'none',
    })
    url = that.data.type == 1 ? "resetLoginPwd" : 'updateLoginName'
    params = {
      phone: that.data.phone,
      vcode: that.data.vcode
    }
    that.data.type == 1 ? params.password = that.data.password : params
    app
      .request(url, 'POST', params)
      .then((res) => {
        wx.showToast({
          title: that.data.type == 1 ? "密码修改成功" : "手机号修改成功",
          icon: 'none',
        })
        that.data.clearList.forEach(element => {
          wx.removeStorageSync(element)
        });
       
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }).catch(err => {

      })
  }
})
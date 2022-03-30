//index.js
const app = getApp()
let phoneVerify = /^1[3456789]\d{9}$/;
let Password = /^[a-zA-Z][a-zA-Z0-9]*$/;
var reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(.{6,16})$/;
Page({
  data: {
    type1: 'password',
    type2: 'password',
    isemail: 0, //邮箱是否占位
    show1: false, // 是否显示密码
    show2: false, // 是否显示密码
    invalid: false, // 邮箱是否符合
    employ: false, //是否被占用
    showurl1: app.Constants.imgHost + 'register/showin.png',
    showurl2: app.Constants.imgHost + 'register/showin.png',
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
    resetPwd: false,
    submitFlag: true
  },

  onLoad: function (e) {
    if (e.resetPwd) {
      this.setData({
        resetPwd: e.resetPwd,
        registerTxt: '提交'
      })
    }
  },
  onNavigationBar: function (e) {
    wx.navigateTo({
      url: './register/register'
    });
  },
  //验证码倒计时
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
  //密码是否显隐
  showon: function (type) {
    let e = type.target.dataset.type
    if (e == 1) {
      if (this.data.show1) {
        this.setData({
          type1: 'password',
          show1: !this.data.show1,
          showurl1: app.Constants.imgHost + 'register/showin.png'
        })
      } else {
        this.setData({
          type1: 'text',
          show1: !this.data.show1,
          showurl1: app.Constants.imgHost + 'register/showon.png'
        })
      }
    } else {
      if (this.data.show2) {
        this.setData({
          type2: 'password',
          show2: !this.data.show2,
          showurl2: app.Constants.imgHost + 'register/showin.png'
        })
      } else {
        this.setData({
          type2: 'text',
          show2: !this.data.show2,
          showurl2: app.Constants.imgHost + 'register/showon.png'
        })
      }
    }
  },
  getPhoneNum(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  getCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  getCheck_password(e) {
    this.setData({
      check_password: e.detail.value
    })
  },
  checknumber() {
    
    if (reg.test(this.data.password)) {
      this.setData({
        checkshow: false
      })
    } else {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '请输入6-16位字母数字组合的新密码'
      }));
    }
  },
  check() {
    if (this.data.password !== this.data.check_password) {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '确认密码必须与首次密码一致'
      }));
    } else {
      this.setData({
        checkshow: false
      })
      this.checkshow = false;
    }
  },
  submit() {
    let url = '',
      params = {};
    if (this.data.phoneNum == '') {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '请输入手机号/账号'
      }));
    } else if (!phoneVerify.test(this.data.phoneNum)) {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '请输入正确的手机号码'
      }));
    } else if (this.data.code == '') {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '请输入验证码'
      }));
    } else if (this.data.password == '') {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '请输入密码'
      }));
    } else if (!reg.test(this.data.password)) {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '请输入6-16位字母数字组合的新密码'
      }));
    }else if (this.data.password != this.data.check_password) {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '确认密码必须与首次密码一致'
      }));
    }

    if (this.data.resetPwd) {
      url = "resetLoginPwd"
      params = {
        phone: this.data.phoneNum,
        vcode: this.data.code,
        password: this.data.password
      }
    } else {
      url = "register"
      params = {
        loginName: this.data.phoneNum,
        vcode: this.data.code,
        loginPwd: this.data.password
      }
    }


    if (this.data.submitFlag) {
      this.setData({
        submitFlag: false,
      })
      app
        .request(url, 'POST', params)
        .then((res) => {
          wx.showToast({
            title: res,
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../login'
            });
            this.setData({
              submitFlag: true,
            })
          }, 1000);
        }).catch(err => {
          this.setData({
            submitFlag: true,
          })
        })
    }

  },
  checkPhone() {
    if (this.data.phoneNum == '') {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '请输入手机号/账号'
      }));
    } else if (!phoneVerify.test(this.data.phoneNum)) {
      this.setData({
        checkshow: true
      })
      return (this.setData({
        rulesTxt: '请输入正确的手机号码'
      }));
    }
    if (this.data.codeDisabled) {
      this.setData({
        checkshow: false,
        codeDisabled: false
      })
      app
        .request('sms/sendSms', 'POST', {
          phone: this.data.phoneNum,
          type: this.data.resetPwd ? 1 : 2,
        })
        .then((res) => {
          this.settime();
        });

    }
  }

})
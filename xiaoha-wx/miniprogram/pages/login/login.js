const {
  err
} = require("../../common/vendor");

//index.js
let WebIM = require("../../utils/WebIM")["default"];
const app = getApp()
let phoneVerify = /^1[3456789]\d{9}$/;
let Password = /^[a-zA-Z][a-zA-Z0-9]*$/;
let clearList = wx.getStorageSync('clearList') || []
Page({
  data: {
    login: false,
    loginFlag: true,
    user: '',
    password: '',
    LoginMethod: true,
    rulesTxt: '',
    smsFlag: true,
    startVal: 60,
    codeDisabled: true,
    hasUserInfo: false,
    latitude: '',
    longitude: '',
    rawData: '',
    signature: '',
    vcode: '',
    code: '',
    wxIcon: app.Constants.imgHost + "singin/wx.png",
    checked: false
  },

  onLoad: function () {
    let that = this;
    try {
      let token = wx.getStorageSync('token');
      if (token) {
        app.globalData.token = token;
        that.getUserinfo()
      }
    } catch (e) { }
    // 获取用户信息
    wx.login({
      success: (item) => {
        that.setData({
          code: item.code
        });
        wx.getSetting({
          success: pop => {
            if (pop.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: res => {
                  that.setData({
                    hasUserInfo: true,
                    rawData: res.rawData,
                    signature: res.signature
                  });
                }
              })
            }
          }
        })
      },
    });
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        that.setData({
          latitude: JSON.stringify(res.latitude),
          longitude: JSON.stringify(res.longitude)
        });
      }
    })
  },
  // onNavigationBar: function (e) {
  //   wx.navigateTo({
  //     url: 'register/register'
  //   });
  // },
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
  getUserinfo() {
    app
      .request('getUserInfo', 'GET', {})
      .then((res) => {
        wx.setStorage({
          data: res.id + "",
          key: "myUsername"
        })
        wx.setStorage({
          data: res.avatar,
          key: 'user_avatar',
        })
        wx.setStorage({
          data: res.nickname,
          key: 'nickname',
        })
        let options = {
          apiUrl: WebIM.config.apiURL,
          user: res.id + "",
          pwd: '123456',
          appKey: WebIM.config.appkey
        };
        WebIM.conn.open(options);

        if (res.isEnter) {
          wx.switchTab({
            url: '/pages/activity/index'
          });
        } else {
          wx.navigateTo({
            url: '/pages/identity/origin/index'
          });
        }
      }).catch(err => {

      })
  },
  agreement() {
    wx.navigateTo({
      url: 'agreement/agreement',
      success: () => {
        this.setData({
          checked: true,
        })
      }
    });

  },
  setLoginMethod() {
    let LoginMethod = !this.data.LoginMethod
    this.setData({
      login: false,
      LoginMethod
    })
  },
  getUser(e) {
    this.setData({
      user: e.detail.value
    })
  },
  getPwd(e) {
    this.setData({
      password: e.detail.value
    })
  },
  getVcode(e) {
    this.setData({
      vcode: e.detail.value
    })
  },

  checkPhone() {
    let that = this;
    if (that.data.user == '') {
      that.setData({
        login: true
      })
      return (that.setData({
        rulesTxt: '请输入手机号/账号'
      }));
    } else if (!phoneVerify.test(that.data.user)) {
      that.setData({
        login: true
      })
      return (
        that.setData({
          rulesTxt: '请输入正确的手机号码'
        }));
    }
    if (that.data.codeDisabled) {
      that.setData({
        codeDisabled: false
      })
      app
        .request('sms/sendSms', 'POST', {
          phone: that.data.user,
          type: 1,
        })
        .then((res) => {

          that.settime()
        }).catch(err => {
          that.setData({
            codeDisabled: true
          })
        })

    }

  },
  onGotUserInfo: function (e) {
    console.log(e);
    let type = e.currentTarget.dataset.type;
    if (e.detail.errMsg == 'getUserInfo:ok') {
      let that = this;
      this.setData({
        hasUserInfo: true,
        rawData: e.detail.rawData,
        cloudID: e.detail.cloudID,
        signature: e.detail.signature
      });
      if (this.data.LoginMethod) {
        this.onLogin(2, type)
      } else {
        this.onLogin(1, type)
      }
      wx.reLaunch({
        url: '../home/index',
      })
    }
  },
  onLogin(type, pop) {
    let that = this;
    if (!pop) {
      if (that.data.user == '') {
        that.setData({
          login: true
        })
        return (that.setData({
          rulesTxt: '请输入手机号/账号'
        }));
      } else if (!phoneVerify.test(that.data.user)) {
        that.setData({
          login: true
        })
        return (
          that.setData({
            rulesTxt: '请输入正确的手机号码'
          }));
      } else if (type == 1 && that.data.password == '') {
        that.setData({
          login: true
        })
        return (that.setData({
          rulesTxt: '请输入密码'
        }));
      } else if (type == 2 && that.data.vcode == '') {
        that.setData({
          login: true
        })
        return (that.setData({
          rulesTxt: '请输入验证码'
        }));
      }

      if (that.data.loginFlag) {
        that.setData({
          loginFlag: false
        })
        let params = {
          lat: that.data.latitude,
          lng: that.data.longitude,
          type,
          username: that.data.user,
          rawData: that.data.rawData,
          signature: that.data.signature,
          code: that.data.code
        }
        type == 1 ? params.password = that.data.password : params.vcode = that.data.vcode;
        app
          .request('login', 'POST', params)
          .then((res) => {
            wx.setStorageSync("token", res)
            if (clearList.findIndex(item => item == "token") === -1 || clearList.length <= 0) {
              clearList.push("token", "clearList")
            }
            wx.setStorageSync('clearList', clearList)
            app.globalData.token = res;
            that.getUserinfo()
            setTimeout(() => {
              that.setData({
                loginFlag: true
              })
            }, 500)
          }).catch((err) => {
            that.setData({
              loginFlag: true,
              smsFlag: true,
              startVal: 0
            })

          })
      }
    }


  },
  getPhone: function (e) {
    let that = this;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      let params = {
        lat: that.data.latitude,
        lng: that.data.longitude,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
        rawData: that.data.rawData,
        signature: that.data.signature,
        code: that.data.code
      }
      app
        .request('wechatLogin', 'POST', params)
        .then((res) => {
          wx.setStorageSync("token", res)
          if (clearList.findIndex(item => item == "token") === -1 || clearList.length <= 0) {
            clearList.push("token", "clearList")
          }
          app.globalData.token = res;
          that.getUserinfo()
          wx.setStorageSync('clearList', clearList)
        }).catch((err) => {
          if (err.status == 400) {
            wx.login({
              success: (item) => {
                that.setData({
                  code: item.code
                });
              }
            })
          }
        })
    } else {
      console.log('获取手机号授权~~~~~~~~~~失败');
    }
  },

})
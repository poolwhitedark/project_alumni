const app = getApp()
Page({
  data: {
    mineeditorInfo: [{
        title: '账户与安全',
        url: app.Constants.imgHost + "mine/safe.png"
      },
      {
        title: '隐私',
        url: app.Constants.imgHost + "mine/suo.png"
      }, {
        title: '关于小哈',
        url: app.Constants.imgHost + "mine/about.png"
      }
    ],
    phone: '',
    arrowIcon: app.Constants.imgHost + 'find/icon.png',
    clearList:[],
    isShowPhone:false
  },
  onLoad(e) {
    this.setData({
      phone: e.phone,
      isShowPhone:JSON.parse(e.isShowPhone)
    })
    // console.log(e);
    
    try {
       let clearList = wx.getStorageSync('clearList')
      if (clearList) {
        this.setData({
          clearList
        })
      }
    } catch (e) {}
  },
  tochange(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      wx.navigateTo({
        url: '/pages/mine/set/safe/safe?phone=' + this.data.phone
      })
    }
    if (id == 1) {
      wx.navigateTo({
        url: '/pages/mine/set/privacy/privacy'
      })
    }
    if (id == 2) {
      wx.navigateTo({
        url: '/pages/mine/set/about/about'
      })
    }
  },
  toExit(e) {
    app
    .request('signout', 'GET', {})
    .then((res) => {
      this.data.clearList.forEach(element => {
        wx.removeStorageSync(element)
      });
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }).catch(err => {
    })

  },
  onUnload: function () {},   
})
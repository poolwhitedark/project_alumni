const app = getApp()
Page({
  data: {
    mineInfo: [
      {
        title: '意见反馈',
        url: app.Constants.imgHost+'mine/yijianfankui.png'
      }, {
        title: '设置',
        url: app.Constants.imgHost+'mine/shezhi.png',

      }
    ],
    userInfo: {},
    arrowIcon:app.Constants.imgHost+'find/icon.png',
    bgu:app.Constants.imgHost+'mine/beijing.png',
    locationIcon:app.Constants.imgHost+'mine/dingwei.png',
    images: [
      app.Constants.imgHost + "mine/renzheng.png",
      app.Constants.imgHost + "mine/man.png",
      
      app.Constants.imgHost + "mine/kefu.png",
      app.Constants.imgHost + "mine/woman.png",
    ]
  },
  onShow() {
    this.getUserinfo()
  },
  getUserinfo() {
    app
      .request('getUserInfo', 'GET', {})
      .then((res) => {
        this.setData({
          userInfo: res
        })
      });
  },
  toFollow(e) {
    wx.navigateTo({
      url: '/pages/mine/follow/index?type=' + e.currentTarget.dataset.type,
    })
  },
  toEditor(e) {
    wx.navigateTo({
      url: '/pages/mine/editor/editor'
    })
  },
  changebtn(e) {
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    
    if (id == 0) {
      wx.navigateTo({
        url: '/pages/mine/feedback/feedback',
      })
    }else if (id == 1){
      // console.log(this.data.userInfo.isShowPhone);
      wx.navigateTo({
        url: '/pages/mine/set/set?phone='+this.data.userInfo.phone+"&isShowPhone="+this.data.userInfo.isShowPhone
      })
    }
    
  },
  onShareAppMessage: function () {
    return {
      title: '小哈职友',
      path: '/pages/mine/index'
      // imageUrl: '../../image/ssrxbfxt_img_bj.png'
    }
  }
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
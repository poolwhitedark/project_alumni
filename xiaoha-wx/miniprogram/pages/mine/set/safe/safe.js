const app = getApp()
Page({

  data: {
    accountSafe: [{
        title: '修改手机号',
        content: "15348264526"
      },
      {
        title: '修改密码',
        content: ""
      }
    ],
    arrowIcon:app.Constants.imgHost+'find/icon.png',
  },
  onLoad(e) {
    this.setData({
      "accountSafe[0].content": e.phone
    })
  },

  modifyPhone(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mine/set/safe/modifyPassword/index?type=' + id+'&phone='+this.data.accountSafe[0].content
    })
  }

})
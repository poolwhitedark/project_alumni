const app = getApp()

let disp = require("../../utils/broadcast")
var WebIM = require("../../utils/WebIM")["default"];
Page({
  data: {
    findInfo: [{
        title: '个人生涯圈',
        content: '生涯社区',
        url: app.Constants.imgHost + 'find/shengyaquan.png'
      },
      {
        title: '收信箱',
        content: '接受消息',
        url: app.Constants.imgHost + 'find/shouxinxiang.png'
      },
    ],
    arrowIcon: app.Constants.imgHost + 'find/icon.png',
    inviteIcon: app.Constants.imgHost + 'find/yaoqinghaoyou.png',
    unReadSpotNum: 0
  },
  onLoad() {
  },
  handleContact(e) {
    let dataset = e.currentTarget.dataset
    if (dataset.index == 0) {
      wx.navigateTo({
        url: '/pages/find/careerCircle/index',
      })
    }
    if (dataset.index == 1) {
      wx.navigateTo({
        url: '/pages/chat/chat',
      })
    }
  }
})
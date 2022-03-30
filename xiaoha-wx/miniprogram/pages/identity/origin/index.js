
const app = getApp()
Page({
  data: {
    images: [
      app.Constants.imgHost + "home/img_logo.png",
      app.Constants.imgHost + "home/img_beijng.png",
    ]
  },
  
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  handleClick(){
    wx.navigateTo({
      url: '/pages/activity/seleteTests/detail/detail?type='+0+'&origin='+true
    });
  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
})
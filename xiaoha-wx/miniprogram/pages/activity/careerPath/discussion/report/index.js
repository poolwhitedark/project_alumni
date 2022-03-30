var app = getApp()
Page({
  data: {
    reportType: ["垃圾广告", "淫秽色情", "诈骗", "讨论敏感话题", "不雅昵称"],
    userId: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "对" + options.title + "的举报"
    })
    this.setData({
      userId:options.userId
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  report(e) {
    app
      .request('report', 'POST', {
        content:e.currentTarget.dataset.content,
        userId:this.data.userId,
      })
      .then((res) => {
        wx.showToast({
          title: res,
          icon: 'none',
        })
      });
  },
  agreement(){
    wx.navigateTo({
      url: 'agreement/agreement',
      success:()=>{
        this.setData({
          checked: true,
        })
      }
    });
    
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {
    console.log(888);

  },
  onReachBottom: function () {},
  onShareAppMessage: function () { }
})
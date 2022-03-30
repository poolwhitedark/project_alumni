const app = getApp()
Page({

  data: {
    id:null,
    content:'',
    type:1
  },
  onLoad: function (options) {
    this.setData({
      id:JSON.parse(options.id)
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },
  getContent(e){
    this.setData({
      content:e.detail.value
    })
  },
  addComment(){
let that =this
    app
      .request('addComment', 'POST', {
        content: that.data.content,
        careerId: that.data.id,
        type: 1
      })
      .then((res) => {
        wx.showToast({
          title: "添加成功",
          icon: 'none',
        })
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          discussionInfo: {
            careerId: that.data.id,
            content: that.data.content,
            type: 1
          },
        })
        wx.navigateBack({
          delta: 1 //想要返回的层级
        })
      });
  },
  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  // onShareAppMessage: function () {

  // }
})
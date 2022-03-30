// pages/CircleFriends/CircleFriends.js
var app = getApp()
var that

Page({
  /**
   * 页面的初始数据
   */
  data: {
    reply: {},
    careerId: null
  },


  onLoad(e) {
    if (e.item) {
      this.setData({
        reply: JSON.parse(e.item),
        careerId: JSON.parse(e.careerId)
      })
    }

    var query = wx.createSelectorQuery();
    query.select('#wdy').boundingClientRect();
    query.exec((res) => {
      var height = res[0].height;
      this.data.reply.colNum = Math.ceil(height / 25)
      this.setData({
        reply: this.data.reply,
      })
      console.log("行数==", this.data.reply)
    })

  },
  //展开  收起
  change: function (e) {
    var that = this;
    that.setData({
      "reply.isF": !that.data.reply.isF
    })
  },
  goback(event) {
    // let pages = getCurrentPages();
    // let prevPage = pages[pages.length - 2];
    // prevPage.setData({
    //   toView: "i" + this.data.reply.id,
    // })
    wx.navigateBack({
      delta: 1 //想要返回的层级
    })
  },
  getContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  addComment() {
    app
      .request('addComment', 'POST', {
        careerId: this.data.careerId,
        content: this.data.content,
        commentId: this.data.reply.id,
        type: 2
      })
      .then((res) => {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        let avatar=wx.getStorageSync("user_avatar")
        let nickname=wx.getStorageSync("nickname")
        prevPage.setData({
          discussionInfo: {
            careerId: this.data.careerId,
            content: this.data.content,
            commentId: this.data.reply.id,
            starType:1,
            avatar,
            id:res,
            createTime:"刚刚",
            starNum:0,
            nickname,
            type: 2
          },
        })
        wx.navigateBack({
          delta: 1 //想要返回的层级
        })
      });
  },
  onReachBottom: function () {
    console.log(9999);

  },

})
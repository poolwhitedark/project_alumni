const app = getApp()
Page({
  data: {
    title: "",
    newsList: [],
    type: 0
  },
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
  },
  onShow: function (options) {
    if (this.data.type == "0") {
      this.getFollowList()
      wx.setNavigationBarTitle({
        title: '我的关注'
      })
      this.setData({
        title: "我的关注"
      })
    } else if (this.data.type == "1") {
      wx.setNavigationBarTitle({
        title: '我的粉丝'
      })
      this.setData({
        title: "我的粉丝"
      })
      this.getFansList()
    } else if (this.data.type == "2") {
      wx.setNavigationBarTitle({
        title: '我的足迹'
      })
      this.setData({
        title: "我的足迹"
      })
      this.getHistory()
    }

  },
  setfollow(e) {
    app
      .request('follow', 'POST', {
        userId: e.currentTarget.dataset.item.id,
        status: e.currentTarget.dataset.item.status
      })
      .then((res) => {
        if (this.data.type == "0") {
          this.getFollowList()
        } else if (this.data.type == "1") {
          this.getFansList()
        } else if (this.data.type == "2") {
          this.getHistory()
        }
        wx.showToast({
          title: res,
          icon: 'none',
        })

      });
  },
  getHistory() {
    app
      .request('historyList', 'GET', {})
      .then((res) => {
        this.setData({
          newsList: res,
        })
      }).catch(err => {

      })
  },
  changebtn(e) {
    wx.navigateTo({
      url: "/pages/home/card/index?id=" + e.currentTarget.dataset.id
    })
  },
  getFollowList() {
    app
      .request('followList', 'GET', {})
      .then((res) => {
        this.setData({
          newsList: res,
        })
      }).catch(err => {

      })
  },
  getFansList() {
    app
      .request('fansList', 'GET', {})
      .then((res) => {
        this.setData({
          newsList: res,
        })
      }).catch(err => {

      })
  },
  ontabchange(e) {
    let index = e.detail.current;
    this.switchTab(index);
  },
  ontabtap(e) {
    let index = e.target.dataset.current || e.currentTarget.dataset.current;
    this.switchTab(index);
  },
  switchTab(index) {
    // if (this.newsList[index].data.length === 0) {
    // 	this.getList(index);
    // }
    if (this.data.tabIndex === index) {
      return;
    }
    this.setData({
      tabIndex: index,
      scrollInto: this.data.newsList[index].Identity
    })
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})
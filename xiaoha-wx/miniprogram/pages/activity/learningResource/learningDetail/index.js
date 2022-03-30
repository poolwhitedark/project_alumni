const app = getApp()
// pages/activity/careerTribe、index.js
Page({
  data: {
    learning: {},
    id: '',
    title:'',
    share:false,
    url:''
  },
  onLoad: function (options) {
    let that = this
    that.setData({
      id: options.id,
      title:options.title,
    })
    wx.setNavigationBarTitle({
      title: options.title
    }) 
  },
  onShow: function () {
    let that = this;
    // console.log(this.data.share);
    try {
      let token = wx.getStorageSync('token');
      if (token) {
        app.globalData.token = token;
        that.getStudyAssetsDetail()
      }
    } catch (e) {}
  },
  getStudyAssetsDetail() {
    app
      .request('getStudyAssetsDetail', 'GET', {
        assetsId: this.data.id
      })
      .then((res) => {
        let url=res.url.substring(0, 6)+"..."+res.url.substring(res.url.length- 8)
        this.setData({
          learning: res,
          url:url,
          share:res.state
        });
      });
  },
  getCopyTxt(e){
    // console.log(e);
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  onShareAppMessage: function (res) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: that.data.title+'分享',
      path:  '/pages/activity/learningResource/learningDetail/index?id='+ that.data.id+"&title="+ that.data.title,
      // imageUrl: 'https://......./img/groupshare.png',
    }
    setTimeout(() => {
      this.setData({
        share:true
      })
      
      app
        .request('shareAssets', 'GET', {
          assetsId: this.data.id
        })
        .then((res) => {
        });
    }, 500);
    return shareObj;

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
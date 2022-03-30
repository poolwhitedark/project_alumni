
const app = getApp()
Page({
  data: {
    isShow:false
  },
  onLoad(e){
    this.getUserinfo()    
  },
  getUserinfo() {
    app
      .request('getUserInfo', 'GET', {})
      .then((res) => {
        this.setData({  
          isShow:res.isShow
        })
      });
  },
  listenerSwitch(e){
    this.setData({
      isShow:e.detail.value
    })
    app
        .request('saveUserInfo', 'POST', {
          isShow: e.detail.value,
        })
        .then((res) => {
          if (e.detail.value) {
            wx.showToast({
              title: "公开",
              icon: 'none',
            })
          }else{
            wx.showToast({
              title: "隐藏",
              icon: 'none',
            })
          }
          
        }).catch((err) => {
          
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
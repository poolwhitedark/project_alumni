const app = getApp()
// pages/activity/careerTribe、index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    learningList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let that = this;
		try {
			let token = wx.getStorageSync('token');
			if (token) {
				app.globalData.token = token;
				that.getStudyAssets()
			}
		} catch (e) {}
  },
  getStudyAssets() {
		app
			.request('getStudyAssets', 'GET', {})
			.then((res) => {

				this.setData({
          learningList:res
				});
				// if (res.type == 1) {
				// 	this.setData({questionList: res.questionList});
				// }else{
				// 	this.setData({recommentList: res.recommentList});
				// }
			});
  },
  gotoDetail(e){
  
    wx.navigateTo({
      url: '/pages/activity/learningResource/learningDetail/index?id='+ e.currentTarget.dataset.id+"&title="+ e.currentTarget.dataset.title
    });
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
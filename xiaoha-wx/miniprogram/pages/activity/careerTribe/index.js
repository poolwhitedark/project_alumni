const app = getApp()
// pages/activity/careerTribe、index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bestTribeList:[],
    myTribeList:[],
    recommendTribeList:[],
    images: [
      app.Constants.imgHost + "mine/renzheng.png",
    ],
    moreMyTribeList:[],
    text:'更多'
  },

  onLoad: function (options) {
    let that = this;
		try {
			let token = wx.getStorageSync('token');
			if (token) {
				app.globalData.token = token;
				that.getCareerTribe()
			}
		} catch (e) {}
  },
  onShow: function () {
    
  },
  getBestTribe(){
    app
			.request('getBestTribe', 'GET', {})
			.then((res) => {

				this.setData({
					bestTribeList: res
				});
			});
  },
  getMoreMyTribeList(){
    // console.log(this.data.myTribeList);
    
    if(this.data.myTribeList.length>3){
      this.setData({
        text:"更多",
        myTribeList:this.data.myTribeList.slice(0,3)
      });
    }else{
      this.setData({
        text:"收起",
        myTribeList: this.data.moreMyTribeList
      });
    }
    
  },
  getCareerTribe() {
		app
			.request('getCareerTribe', 'GET', {})
			.then((res) => {

				this.setData({
					bestTribeList: res.bestTribeList,
          myTribeList: res.myTribeList.length>3?res.myTribeList.slice(0,3):res.myTribeList,
          moreMyTribeList:res.myTribeList,
          recommendTribeList:res.recommendTribeList,
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
      url: '/pages/activity/careerTribe/tribeDetail/index?id='+ e.currentTarget.dataset.id
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
const app = getApp()
// pages/activity/careerTribe、index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx:3,
    name:'',
    show:true,
    groomList:[],
    careerList:[],
    studyAssetsList:[],
    tribeList:[],
    normal:false,
    images: [
      app.Constants.imgHost + "activity/nofind.png",
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  search(){
    this.search()
    this.setData({
      name:this.data.name
    })
  },
  del(){
  
  },
  refull(){
   this.getSearchGroom()
  },
  getSearchGroom() {
		app
			.request('getSearchGroom', 'GET', {})
			.then((res) => {

				this.setData({
          groomList:res
				});
			
			});
  },

  getInputValue(e){
    // console.log(e.detail)// {value: "ff", cursor: 2}  
    
    this.setData({
      name:e.detail.value
    })
    if(!this.data.name){
       this.setData({
        show:true
       })
    }
  },
  search() {
    let param={
      name:this.data.name
    }
		app
			.request('search', 'GET', param)
			.then((res) => {

				this.setData({
          careerList:res.careerList,
          studyAssetsList:res.studyAssetsList,
          tribeList:res.tribeList,
        });
        if(res.careerList.length>0||res.studyAssetsList.length>0||res.tribeList.length>0){
          // console.log(55);
          
            this.setData({
              show:false,
              normal:false
            })
        }else{
          // console.log(444);
          
          this.setData({
            show:false,
            normal:true
          })
        }
			
			});
  },
  onDetail(id) {
		wx.navigateTo({
			url: '/pages/activity/careerPath/index?id=' + id.currentTarget.dataset.id
		});
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
				that.getSearchGroom()
			}
		} catch (e) {}
  },
  // getCareerTribe() {
	// 	app
	// 		.request('getCareerTribe', 'GET', {})
	// 		.then((res) => {

	// 			this.setData({
	// 				bestTribeList: res.bestTribeList,
  //         myTribeList: res.myTribeList,
  //         recommendTribeList:res.recommendTribeList
	// 			});
	// 			// if (res.type == 1) {
	// 			// 	this.setData({questionList: res.questionList});
	// 			// }else{
	// 			// 	this.setData({recommentList: res.recommentList});
	// 			// }
	// 		});
  // },
  // gotoDetail(e){
  
  //   // wx.navigateTo({
  //   //   url: '/pages/activity/careerTribe/tribeDetail/index?id='+ e.currentTarget.dataset.id
  //   // });
  // },
  gotoDetail(e){
  
    wx.navigateTo({
      url: '/pages/activity/learningResource/learningDetail/index?id='+ e.currentTarget.dataset.id+"&title="+ e.currentTarget.dataset.title
    });
  },

  gotocaree(e){
  
    wx.navigateTo({
      url: '/pages/activity/careerPath/index?id=' + e.currentTarget.dataset.id
    });
  },
  gototribe(e){
  
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
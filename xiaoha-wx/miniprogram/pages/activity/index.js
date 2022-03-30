const app = getApp()
Page({
	data: {
		status: 2,
		questionList: [],
		url: app.Constants.imgHost + 'activity/suo.png',
		url1: app.Constants.imgHost + 'activity/suokai.png',
		HotImg: app.Constants.imgHost + 'activity/huo@2x.png',
		recommendImg: app.Constants.imgHost + 'activity/tuijian@2x.png',
		recommentList: [],
		studyAssetsList: [],
		hotList: [],
		user_id: '',
		clearList: ['oo', 'pp']
	},
	onLoad: function () {},
	onShow: function () {
		let that = this;
		that.getActivityInfo()
	},
	getActivityInfo() {
		app
			.request('getCareerInfo', 'GET', {})
			.then((res) => {

				this.setData({
					recommentList: res.recommendList,
					studyAssetsList: res.studyAssetsList,
				});
				// if (res.type == 1) {
				// 	this.setData({questionList: res.questionList});
				// }else{
				// 	this.setData({recommentList: res.recommentList});
				// }
			});
	},
	goIdentity(i) {
		let type = parseInt(i.currentTarget.dataset.type)
		let state = i.currentTarget.dataset.state
		if (type == 1 && this.data.questionList[type - 1].state == false || type == 2 && this.data.questionList[type - 1].state == false) {
			wx.showModal({
				content: `请先完成${type==1?"初":"中"}级生涯测试`,
			});
		} else {
			if (this.data.questionList[type].state) {
				wx.navigateTo({
					url: '/pages/activity/seleteTests/detail/careerReport/index?type=' + type + '&state=' + state,
				})
			} else {
				wx.navigateTo({
					url: '/pages/activity/seleteTests/detail/detail?type=' + type
				});
			}
		}
	},
	onDetail(id) {
		// console.log(id.currentTarget.dataset.type);

		if (id.currentTarget.dataset.type == 1) {
			wx.navigateTo({
				url: '/pages/activity/careerPath/index?id=' + id.currentTarget.dataset.id
			});
		} else {
			wx.navigateTo({
				url: '/pages/activity/careerTribe/tribeDetail/index?id=' + id.currentTarget.dataset.id
			});
		}
	},
	goto(e) {
		// console.log(e)
		if (e.currentTarget.dataset.id == 1) {
			wx.navigateTo({
				url: '/pages/activity/seleteTests/index'
			});
		} else if (e.currentTarget.dataset.id == 3) {
			wx.navigateTo({
				url: '/pages/activity/careerTribe/index'
			});
		} else if (e.currentTarget.dataset.id == 2) {
			wx.navigateTo({
				url: '/pages/activity/learningResource/index'
			});
		} else if (e.currentTarget.dataset.id == 4) {
			wx.navigateTo({
				url: '/pages/activity/careerCircle/index'
			});
		}
	},
	gotoDetail(e) {

		wx.navigateTo({
			url: '/pages/activity/learningResource/learningDetail/index?id=' + e.currentTarget.dataset.id + "&title=" + e.currentTarget.dataset.title
		});
	},
	focus() {
		wx.navigateTo({
			url: '/pages/activity/search/index'
		});
	},
		
		
	onShareAppMessage: function () {
    return {
      title: '小哈职友',
      path: '/pages/activity/index'
      // imageUrl: '../../image/ssrxbfxt_img_bj.png'
    }
  }
})
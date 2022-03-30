const app = getApp()
Page({
	data: {
		questionList: [],
		url: app.Constants.imgHost+'activity/suo.png',
		url1:  app.Constants.imgHost+'activity/suokai.png'
	},
	onLoad: function () {
	},
	onShow: function () {
		let that = this;
		try {
			let token = wx.getStorageSync('token');
			if (token) {
				app.globalData.token = token;
				that.getTestList()
			}
		} catch (e) {}
	},
	getTestList() {
		app
			.request('getTestList', 'GET', {})
			.then((res) => {
					this.setData({questionList: res});
			});
	},
	goIdentity(i) {
		let type = parseInt(i.currentTarget.dataset.type)
		let state=i.currentTarget.dataset.state
		if (type == 1 && this.data.questionList[type - 1].state == false || type == 2 && this.data.questionList[type - 1].state == false) {
			wx.showModal({
				content: `请先完成${type==1?"初":"中"}级生涯测试`,
			});
		} else {
			if (this.data.questionList[type].state) {
				wx.navigateTo({
					url: '/pages/activity/seleteTests/detail/careerReport/index?type=' + type,
				})
			} else {
				wx.navigateTo({
					url: '/pages/activity/seleteTests/detail/detail?type=' + type
				});
			}
		}
	}
})
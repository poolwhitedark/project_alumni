let disp = require("../../../utils/broadcast");

Page({
	data: {
		username: {
			your: "",
			nickname:"",
			avatar_me:"",
			avatar_other:"",
			myName:""
		},
	
	},

	// options = 系统传入的 url 参数
	onLoad(options){
		let username = JSON.parse(options.username);
		this.setData({ username: username });
		wx.setNavigationBarTitle({
			title: username.nickname
		});
	},

	onUnload(){
		disp.fire("em.chatroom.leave");
	},

	onPullDownRefresh: function () {
	  	wx.showNavigationBarLoading();
	    this.selectComponent('#chat').getMore()
	    // 停止下拉动作
	    wx.hideNavigationBarLoading();
	    wx.stopPullDownRefresh();
  	},

});

let disp = require("../../utils/broadcast");
var WebIM = require("../../utils/WebIM")["default"];
let msgStorage = require("../../components/chat/msgstorage");
const app = getApp()
let isfirstTime = true
Page({
	data: {
		search_btn: true,
		search_chats: false,
		show_mask: false,
		yourname: "",
		unReadSpotNum: 0,
		unReadNoticeNum: 0,
		messageNum: 0,
		unReadTotalNotNum: 0,
		arr: [],
		show_clear: false,
		active: "",
		getMessage: []
	},

	onLoad(){
		let me = this;
		let options = {
			queue: "test1",
			isGroup: false,
			count: 10,
			success: function () {},
			fail: function () {}
		}
		WebIM.conn.fetchHistoryMessages(options)
		//监听加好友申请
		disp.on("em.xmpp.subscribe", function(){
			me.setData({
				messageNum: getApp().globalData.saveFriendList.length,
				unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
			});
		});

		//监听解散群
		disp.on("em.xmpp.invite.deleteGroup", function(){
			me.listGroups();
			me.getRoster();
			me.setData({
				arr: me.getChatList(),
				messageNum: getApp().globalData.saveFriendList.length
			});
		});

		//监听未读消息数
		disp.on("em.xmpp.unreadspot", function(message){
			me.setData({
				arr: me.getChatList(),
				unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
			});
		});

		//监听未读加群“通知”
		disp.on("em.xmpp.invite.joingroup", function(){
			me.setData({
				unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
				unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
			});
		});

		disp.on("em.xmpp.contacts.remove", function(){
			me.getRoster();
			// me.setData({
			// 	arr: me.getChatList(),
			// 	unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
			// });
		});

		this.getRoster();

		if (wx.canIUse('hideHomeButton')) {
			wx.hideHomeButton()
		}
	},
	onShow: function(){
		let saveGroupInvitedList= getApp().globalData.saveGroupInvitedList?getApp().globalData.saveGroupInvitedList.length:0
		let saveGFriendList= getApp().globalData.saveFriendList?getApp().globalData.saveFriendList.length:0
		this.setData({
			arr: this.getChatList(),
			unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
			messageNum: saveGFriendList,
			unReadNoticeNum: saveGroupInvitedList,
			unReadTotalNotNum: saveGFriendList + saveGroupInvitedList
		});


		if (getApp().globalData.isIPX) {
			this.setData({
				isIPX: true
			})
		}
	},
	
	getRoster() {
		let me = this;
		let rosters = {
			success(roster) {
				var member = [];
				for (let i = 0; i < roster.length; i++) {
					if (roster[i].subscription == "both") {
						member.push(roster[i]);
					}
				}
				wx.setStorage({
					key: "member",
					data: member
				});
				me.setData({
					member: member
				});

				//if(!systemReady){
				disp.fire("em.main.ready");
				//systemReady = true;
				//}
				me.setData({
					arr: me.getChatList(),
					unReadSpotNum: app.globalData.unReadMessageNum > 99 ? '99+' : app.globalData.unReadMessageNum,
				});
			},
			error(err) {
			}
		};
		WebIM.conn.getRoster(rosters);
	},
	getChatList() {
		let that = this;
		var array = [];
		var member = wx.getStorageSync("member");
		var myName = wx.getStorageSync("myUsername");
		for (let i = 0; i < member.length; i++) {
			let newChatMsgs = wx.getStorageSync(member[i].name + myName) || [];
			let historyChatMsgs = wx.getStorageSync("rendered_" + member[i].name + myName) || [];
			let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
			if (curChatMsgs.length > 0) {
				let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
				lastChatMsg.unReadCount = newChatMsgs.length;

				if (lastChatMsg.unReadCount > 99) {
					lastChatMsg.unReadCount = "99+";
				}
				let dateArr = lastChatMsg.time.split(' ')[0].split('-')
				let timeArr = lastChatMsg.time.split(' ')[1].split(':')
				let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
				lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
				lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`

				array.push(lastChatMsg);
			}
		}




		array.sort((a, b) => {
			return b.dateTimeNum - a.dateTimeNum
		})
		let id = []
		for (var i = 0; i < array.length; i++) {
			id.push(array[i].username)
		}
		app
			.request('getMessages', 'GET', {
				ids: JSON.stringify(id)
			}).then((res) => {
				//发送请求获取图片资源
				for (var i = 0; i < array.length; i++) {
					array[i].image_url = res[i].avatar
					array[i].nickname = res[i].nickName
				}
				that.setData({
					arr: array,
					unReadSpotNum: app.globalData.unReadMessageNum > 99 ? '99+' : app.globalData.unReadMessageNum,
					getMessage: res
				});
			})



	},
	cancel: function () {
		this.setData({
			search_btn: true,
			search_chats: false,
			arr: this.getChatList(),
			unReadSpotNum: app.globalData.unReadMessageNum > 99 ? '99+' : app.globalData.unReadMessageNum,
			gotop: false
		});
	},

	clearInput: function () {
		this.setData({
			input_code: '',
			show_clear: false
		})
	},

	onInput: function (e) {
		let inputValue = e.detail.value
		if (inputValue) {
			this.setData({
				show_clear: true
			})
		} else {
			this.setData({
				show_clear: false
			})
		}
	},

	tab_contacts: function () {
		wx.redirectTo({
			url: "../main/main?myName=" + wx.getStorageSync("myUsername")
		});
	},

	close_mask: function () {
		this.setData({
			search_btn: true,
			search_chats: false,
			show_mask: false
		});
	},


	tab_notification: function () {
		wx.redirectTo({
			url: "../notification/notification"
		});
	},


	//	单聊
	into_singleChatRoom: function (detail) {
		this.data.active = detail.currentTarget.dataset.index
		var my = wx.getStorageSync("myUsername");
     let your=detail.currentTarget.dataset.item.info.from==my?detail.currentTarget.dataset.item.info.to:detail.currentTarget.dataset.item.info.from
	
		var avatar = wx.getStorageSync("user_avatar")
		var nameList = {
			myName: my,
			your: your,
			avatar_me:avatar,
			avatar_other:this.data.getMessage[this.data.active].avatar,
			nickname:this.data.getMessage[this.data.active].nickName
		};


		wx.navigateTo({
			url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
		});
	},




	del_chat: function (event) {
		let detail = event.currentTarget.dataset.item;
		let that = this;
		let nameList;
		nameList = {
			your: detail.username
		};
		var myName = wx.getStorageSync("myUsername");
		var currentPage = getCurrentPages();
		wx.showModal({
			title: "删除该聊天记录",
			confirmText: "删除",
			success: function (res) {
				if (res.confirm) {
					wx.setStorageSync(nameList.your + myName, "");
					wx.setStorageSync("rendered_" + nameList.your + myName, "");
					if (currentPage[0]) {
						currentPage[0].onShow();
					}
					disp.fire("em.chat.session.remove");
					that.getChatList()
				}
			},
			fail: function (err) {}
		});

	},
	ready(event){
		let me = this;
		if (getApp().globalData.isIPX) {
			this.setData({
				isIPX: true
			})
		}
		
		msgStorage.on("newChatMsg", function(renderableMsg, type, curChatMsg, sesskey){
			me.curChatMsg = curChatMsg;
			if(!me.__visibility__) return;
			// 判断是否属于当前会话
			if(username.groupId){
				// 群消息的 to 是 id，from 是 name
				if(renderableMsg.info.from == username.groupId || renderableMsg.info.to == username.groupId){
					if (sesskey == sessionKey) {
						me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
					}
					
				}
			}
			else if(renderableMsg.info.from == username.your || renderableMsg.info.to == username.your){
				if (sesskey == sessionKey) {
					me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
				}
			}

		});


	},

});
require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')
let WebIM = wx.WebIM = require("utils/WebIM")["default"];
let msgStorage = require("components/chat/msgstorage");
let msgType = require("components/chat/msgtype");
let disp = require("utils/broadcast");
App({
  Constants: {
    appId: 1002,
    appSecret: 'b5ec232d1d1a84ac4917a1be94226a95',
    // 正式环境
    // host: 'https://xiaoha-api.barondata.com/api/',
    // host: 'http://120.26.178.143:8080/api/',
    host: 'http://localhost:8080/api/',
    imgHost: 'https://xiaoha.oss-cn-hangzhou.aliyuncs.com/',
  },
  globalData: {
    saveFriendList: [],
  },
  onLaunch: function () {
    wx.setInnerAudioOption({
      obeyMuteSwitch: false
    })
    var me = this;
    WebIM.conn.listen({
      onOpened(message) {
        let identityToken = WebIM.conn.context.accessToken
        let identityName = WebIM.conn.context.jid
      },
      onReconnect() {
        wx.showToast({
          title: "重连中...",
          duration: 2000
        });
      },
      onSocketConnected() {
        wx.showToast({
          title: "socket连接成功",
          duration: 2000
        });
      },
      onClosed() {
        wx.redirectTo({
          url: "../login/login"
        });
        me.conn.closed = true;
        WebIM.conn.close();
      },
      onInviteMessage(message) {
        me.globalData.saveGroupInvitedList.push(message);
        disp.fire("em.xmpp.invite.joingroup", message);

      },
      onReadMessage(message) {},
      onPresence(message) {
        switch (message.type) {
          // 好友邀请列表
          case "subscribe":
            WebIM.conn.subscribed({
              to: message.from
            });
            // pages[0].handleFriendMsg(message);
            for (let i = 0; i < me.globalData.saveFriendList.length; i++) {
              if (me.globalData.saveFriendList[i].from === message.from) {
                me.globalData.saveFriendList[i] = message
                disp.fire("em.xmpp.subscribe");
                return;
              }
            }
            me.globalData.saveFriendList.push(message);
            disp.fire("em.xmpp.subscribe");
            break;
          case "subscribed":

            disp.fire("em.xmpp.subscribed");
            break;
             case 'deleteGroupChat':
              disp.fire("em.xmpp.invite.deleteGroup", message);
              break;
          default:
            break;
        }
      },
      onVideoMessage(message) {
        if (message) {
          msgStorage.saveReceiveMsg(message, msgType.VIDEO);
        }
        calcUnReadSpot(message);
        ack(message);
      },

      onAudioMessage(message) {
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.AUDIO);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onCmdMessage(message) {
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.CMD);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },
      onTextMessage(message) {
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.TEXT);
          }
          calcUnReadSpot(message);
          ack(message);
          if (message.ext.msg_extension) {
            let msgExtension = JSON.parse(message.ext.msg_extension)
            let conferenceId = message.ext.conferenceId
            let password = message.ext.password
            disp.fire("em.xmpp.videoCall", {
              msgExtension: msgExtension,
              conferenceId: conferenceId,
              password: password
            });
          }
        }
      },


      onEmojiMessage(message) {
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.EMOJI);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onPictureMessage(message) {
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.IMAGE);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onFileMessage(message) {
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.FILE);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      // 各种异常
      onError(error) {
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout) {
          if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
            return;
          }
          wx.showToast({
            title: "server-side close the websocket connection",
            duration: 1000
          });
          wx.redirectTo({
            url: "../login/login"
          });
          logout = true
          return;
        }
        // 8: offline by multi login
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
          wx.showToast({
            title: "offline by multi login",
            duration: 1000
          });
          wx.redirectTo({
            url: "../login/login"
          });
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
          wx.hideLoading()
          disp.fire("em.xmpp.error.passwordErr");
          // wx.showModal({
          // 	title: "用户名或密码错误",
          // 	confirmText: "OK",
          // 	showCancel: false
          // });
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
          wx.hideLoading()
          disp.fire("em.xmpp.error.tokenErr");
        }
        if (error.type == 'socket_error') { 
          wx.showToast({
            title: "网络已断开",
            icon: 'none',
            duration: 2000
          });
          disp.fire("em.xmpp.error.sendMsgErr", error);
        }
      },
    });
  },
  //封装请求
  request: function (path, method, data = {}) {
    let url = this.Constants.host + path;
    return new Promise((resolve, reject) => {
      // wx.showLoading();
      wx.request({
        url,
        data,
        method,
        header: {
          Authentication: this.globalData.token || ''
        },
        success: (res) => {
          // console.log('request success ><><><><><><><><', res);
          // wx.hideLoading();
          if (res.data.status === 200) {
            resolve(res.data.data);
          } else if (res.data.status === 401) {
            let clearList = wx.StorageSync('clearList')
            if (clearList) {
              clearList.forEach(element => {
                wx.removeStorageSync(element)
              });
            }
            wx.reLaunch({
              url: '/pages/login/login'
            })
          }else {
            reject(res.data);
            wx.showModal({
              content: res.data.message,
              showCancel: false,
            });
          }
        },
        fail: (res) => {
          wx.hideLoading();
          console.log('request fail ><><><><><><><><><', res);
          reject(res);
          wx.showModal({
            content: '网络出错，请稍后重试...',
            showCancel: false,
          });
        },
      });
    });
  },
  uploadimg: function (path, count,data = {}){
    let url = this.Constants.host + path;
    let token=this.globalData.token || ''
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          res.tempFilePaths.forEach((item,index)=>{
            wx.uploadFile({
              url: url,
              filePath:item,
              method: 'POST',
              name: 'file',
              formData:data,
              header: {
                "content-type": "multipart/form-data",
                "Authentication":token
              },
              success: function(pop) {
                if (res.tempFilePaths.length-1==index) {
                  resolve(JSON.parse(pop.data));
                }
                
              }
            })
          })
          
        }
      })
    })
   
  }
  
})

function ack(receiveMsg) {
  // 处理未读消息回执
  var bodyId = receiveMsg.id; // 需要发送已读回执的消息id
  var ackMsg = new WebIM.message("read", WebIM.conn.getUniqueId());
  ackMsg.set({
    id: bodyId,
    to: receiveMsg.from
  });
  WebIM.conn.send(ackMsg.body);
}

function onMessageError(err) {
  if (err.type === "error") {
    wx.showToast({
      title: err.errorText
    });
    return false;
  }
  return true;
}

function getCurrentRoute() {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  return currentPage.route;
}

function calcUnReadSpot(message) {
  let myName = wx.getStorageSync("myUsername");
  let members = wx.getStorageSync("member") || []; //好友
  var listGroups = wx.getStorageSync('listGroup') || []; //群组
  let allMembers = members.concat(listGroups)
  let count = allMembers.reduce(function (result, curMember, idx) {
    let chatMsgs;
    if (curMember.groupid) {
      chatMsgs = wx.getStorageSync(curMember.groupid + myName.toLowerCase()) || [];
    } else {
      chatMsgs = wx.getStorageSync(curMember.name.toLowerCase() + myName.toLowerCase()) || [];
    }
    return result + chatMsgs.length;
  }, 0);
  getApp().globalData.unReadMessageNum = count;
  disp.fire("em.xmpp.unreadspot", message);
}

function saveGroups() {
  var me = this;
  return WebIM.conn.getGroup({
    limit: 50,
    success: function (res) {
      wx.setStorage({
        key: "listGroup",
        data: res.data
      });
    },
    error: function (err) {
      console.log(err)
    }
  });
}
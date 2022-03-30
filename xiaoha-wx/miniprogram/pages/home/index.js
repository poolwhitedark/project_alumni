var WebIM = require("../../utils/WebIM")["default"];
const app = getApp()
var startPoint;
Page({
  data: {
    buttonTop: 120,
    buttonLeft: 15,
    windowHeight: '',
    windowWidth: '',
    closure: false,
    active: 0,
    images: [
      app.Constants.imgHost + "home/icon_jiantou.png",
      app.Constants.imgHost + "home/man.png",
      app.Constants.imgHost + "home/woman.png",
      app.Constants.imgHost + "home/location.png",
      app.Constants.imgHost + "home/icon_shengfen.png",
      app.Constants.imgHost + "home/icon_zhuanye.png",
      app.Constants.imgHost + "home/icon_guanzhu.png",
      app.Constants.imgHost + "home/icon_siliao.png",
      app.Constants.imgHost + "home/icon_fenxiang.png",
      app.Constants.imgHost + "home/img_myxc.png",
      app.Constants.imgHost + "home/img_weiruzhu.png",
      app.Constants.imgHost + "mine/man.png",
      app.Constants.imgHost + "mine/woman.png",
    ],
    pageNum: 1,
    pageSize: 10,
    total: 0,
    particulars: false,
    animation: false,
    card: false,
    tempFilePath: '',
    shareFalse: false
  },
  onLoad(e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // // 屏幕宽度、高度
        // console.log('height=' + res.windowHeight);
        // console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    that.getHomeInfo()
  },
  open(e) {

    // this.setData({
    //   particulars: true,
    //   card: false
    // })
    wx.navigateTo({
      url: "/pages/home/card/index?id=" + e.currentTarget.dataset.id + "&back=" + true
    })
  },
  goMycard() {
    wx.navigateTo({
      url: "/pages/home/card/index"
    })
  },
  retract() {
    this.setData({
      particulars: false,
      animation: true,
    })
  },
  close(e) {
    let type = e.currentTarget.dataset.type
    if (type == 2) {
      this.setData({
        card: false,
      })
    } else {
      this.setData({
        card: true,
      })
    }
  },
  onDetail(id) {
    wx.navigateTo({
      url: '/pages/activity/careerPath/index?id=' + id.currentTarget.dataset.id
    });
  },
  getHomeInfo(id) {
    let params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    app
      .request('getHomeInfo', 'GET', {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      })
      .then((res) => {
        this.setData({
          userList: res.userList,
          active: 0,
          total: res.total
        })
      });
  },
  addHistory(userId) {
    app
      .request('addHistory', 'GET', {
        userId,
      })
      .then((res) => {

      });
  },
  buttonStart: function (e) {
    startPoint = e.touches[0]
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  buttonMove: function (e) {
    let endPoint = e.touches[e.touches.length - 1]
    let translateX = endPoint.clientX - startPoint.clientX
    let translateY = endPoint.clientY - startPoint.clientY
    startPoint = endPoint
    let buttonTop = this.data.buttonTop + translateY
    let buttonLeft = this.data.buttonLeft + translateX
    if (buttonTop <= 0) {
      buttonTop = 0
    }
    if (buttonTop + 300 >= this.data.windowHeight) {
      buttonTop = this.data.windowHeight - 300;
    }
    this.setData({
      buttonTop: buttonTop,
      buttonLeft: buttonLeft
    })
  },
  async buttonEnd(e) {
    let that = this.data;
    let userId = e.currentTarget.dataset.userid;

    if (that.active < that.userList.length - 1) {
      if (that.buttonLeft + 245 >= that.windowWidth) {
        this.addHistory(that.userList[that.active].id)
        this.setData({
          closure: false,
          animation: false,
          active: this.data.active + 1
        })
      }
      if (that.buttonLeft <= -100) {
        this.addHistory(that.userList[that.active].id)
        this.setData({
          closure: true,
          animation: false,
          active: that.active + 1
        })
      }
    } else if (that.active == that.userList.length - 1) {

      if (that.buttonLeft + 245 >= that.windowWidth) {
        this.addHistory(that.userList[that.active].id)
        this.setData({
          closure: false,
          animation: false,
          active: this.data.active + 1
        })
      }
      this.setData({
        pageNum: that.pageNum * that.pageSize < that.total ? that.pageNum + 1 : 1,
      })
      if (that.buttonLeft <= -100) {
        this.addHistory(that.userList[that.active].id)
      }
      await this.getHomeInfo()
    }
    this.setData({
      buttonTop: 120,
      buttonLeft: 15
    })
  },
  into_singleChatRoom: function (detail) {
    // let that = this.data;
    // if (that.userList.length>0) {
    //   let id = that.userList[that.active].id
    //   var my = wx.getStorageSync("myUsername");
    //   var avatar = wx.getStorageSync("user_avatar")
    //   var nameList = {
    //     myName: my,
    //     your: id + "",
    //     avatar_me: avatar,
    //     avatar_other: that.userList[that.active].avatar,
    //     nickname: that.userList[that.active].nickname
    //   };
    //   wx.WebIM.conn.subscribe({
    //     to: id + ""
    //   });

    //   wx.navigateTo({
    //     url: '/pages/chatroom/chatroom?username=' + JSON.stringify(nameList)

    //   })
    // }

    wx.navigateTo({
      url: '/pages/chat/chat'
    });
  },
  onShareAppMessage: function () {
    return {
      title: '小哈职友',
      path: '/pages/home/index'
      // imageUrl: '../../image/ssrxbfxt_img_bj.png'
    }
  }

})
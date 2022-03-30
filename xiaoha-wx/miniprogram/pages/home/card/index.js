const app = getApp()
Page({
  data: {
    images: [
      app.Constants.imgHost + "home/icon_fenxiang.png",
      app.Constants.imgHost + "home/img_beijing.png",
      app.Constants.imgHost + "home/man.png",
      app.Constants.imgHost + "home/woman.png",
      app.Constants.imgHost + "home/location.png",
      app.Constants.imgHost + "home/icon_shengfen.png",
      app.Constants.imgHost + "home/icon_zhuanye.png",
      app.Constants.imgHost + "home/500766453_banner.png",
      app.Constants.imgHost + "home/img_weiruzhu.png",
      app.Constants.imgHost + "home/icon_shouji.png",
      app.Constants.imgHost + "home/icon_zhiye.png",
      app.Constants.imgHost + "home/icon_guanzhu.png",
      app.Constants.imgHost + "home/icon_siliao.png",
      app.Constants.imgHost + "home/img_myxc.png",
      app.Constants.imgHost + "home/icon_jiantou.png",
    ],
    userInfo: {},
    userId: 0,
    major: '',
    occupation: '',
    back: false
  },
  async onLoad(options) {
    // console.log(options);
    if (options.id) {
      this.setData({
        userId: options.id
      })
    }
    if (options.back) {
      this.setData({
        back: JSON.parse(options.back)
      })
    }
    this.getUserinfo()
  },
  retract() {
    wx.switchTab({
      url: '/pages/home/index'
    })
  },
  shareImg1() {
    let that = this;
    wx.showLoading({
      title: '努力生成中...',
      duration: 1000
    })
    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.userInfo.avatar,
        success: function (res) {
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: app.Constants.imgHost + "share/img_card.png",
        success: function (res) {
          resolve(res);
        }
      })
    });
    let promise3 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: app.Constants.imgHost + "xiaoha.png",
        success: function (res) {
          resolve(res);
        }
      })
    });

    Promise.all([
      promise1, promise2, promise3
    ]).then(res => {
      const ctx = wx.createCanvasContext('shareImg1')
      ctx.drawImage(res[0].path, 60, 166, 130, 130)
      ctx.drawImage(res[2].path, 330, 541, 250, 250)
      ctx.drawImage(res[1].path, 0, 0, 660, 869)

      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(36)
      ctx.fillText(that.data.userInfo.nickname + "的小哈卡片", 33, 79)
      ctx.fillText(that.data.userInfo.followCount, 184, 450)
      ctx.fillText(that.data.userInfo.fansCount, 485, 450)
      ctx.setFontSize(28)
      ctx.fillText(that.data.userInfo.nickname, 199, 200)
      if (that.data.userInfo.profile.length > 4) {
        ctx.fillText(that.data.userInfo.profile, 144, 367)
      } else {
        ctx.fillText(that.data.userInfo.profile, 164, 367)
      }
      ctx.fillText(that.data.userInfo.type == 1 ? that.data.major : that.data.occupation, 452, 367)
      ctx.setFontSize(24)
      ctx.fillText(that.data.userInfo.introduce != "" ? that.data.userInfo.introduce : "主人很懒,还未留下任何痕迹", 199, 252)
      ctx.stroke()
      ctx.draw()
      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 660,
          height: 869,
          destWidth: 660,
          destHeight: 869,
          canvasId: 'shareImg1',
          success: function (res) {
            wx.previewImage({
              current: res.tempFilePath,
              urls: [res.tempFilePath]
            })

            wx.hideLoading()
          },
          fail: function (res) {}
        }, that)
      }, 500);
    })
  },
  onDetail(id) {
    wx.navigateTo({
      url: '/pages/activity/careerPath/index?id=' + id.currentTarget.dataset.id
    });
  },
  shareImg2() {
    let that = this;
    const ctx = wx.createCanvasContext('shareImg2')
    ctx.drawImage(that.data.userInfo.avatar, 60, 166, 130, 130)
    ctx.drawImage(app.Constants.imgHost + "share/micro_resume.png", 0, 0, 660, 1417)
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(36)
    ctx.fillText(that.data.userInfo.nickname + "的小哈卡片", 33, 79)
    ctx.setFillStyle('#333')

    ctx.setFontSize(28)
    ctx.fillText(that.data.userInfo.nickname, 199, 200)
    ctx.fillText(that.data.userInfo.profile, 164, 367)
    ctx.fillText(that.data.userInfo.type == 1 ? that.data.userInfo.major : that.data.userInfo.occupation, 452, 367)
    ctx.setFillStyle('#2658FF')
    ctx.fillText(that.data.userInfo.followCount, 256, 240)
    ctx.fillText(that.data.userInfo.fansCount, 413, 240)
    ctx.setFontSize(22)
    ctx.setFillStyle('#999')
    ctx.fillText(that.data.userInfo.introduce != "" ? that.data.userInfo.introduce : "主人很懒,还未留下任何痕迹", 199, 277)
    ctx.stroke()
    ctx.draw()

  },
  previewImage(e) {
    let urls = this.data.userInfo.photoList.map(res => res.photo)
    wx.previewImage({
      current: e.currentTarget.dataset.photo, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  toFollow(e) {
    wx.navigateTo({
      url: '/pages/mine/follow/index?type=' + e.currentTarget.dataset.type,
    })
  },

  shareImg3() {
    let that = this;
    wx.showLoading({
      title: '努力生成中...',
      duration: 1000
    })
    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.userInfo.avatar,
        success: function (res) {
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: app.Constants.imgHost + "share/visiting_card.png",
        success: function (res) {
          resolve(res);
        }
      })
    });
    let promise3 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: app.Constants.imgHost + "xiaoha.png",
        success: function (res) {
          resolve(res);
        }
      })
    });
    Promise.all([
      promise1, promise2, promise3
    ]).then(res => {
      const ctx = wx.createCanvasContext('shareImg3')
      ctx.drawImage(res[0].path, 58, 168, 170, 170)
      ctx.drawImage(res[2].path, 330, 466, 250, 250)
      ctx.drawImage(res[1].path, 0, 0, 660, 787)
      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(36)
      ctx.fillText(that.data.userInfo.nickname + "的小哈卡片", 33, 79)
      ctx.setFontSize(28)
      ctx.fillText(that.data.userInfo.nickname, 304, 200)
      ctx.setFontSize(22)

      ctx.fillText(that.data.userInfo.type == 1 ? that.data.userInfo.major : that.data.userInfo.occupation, 343, 287)
      ctx.fillText(that.data.userInfo.phone, 423, 331)
      ctx.stroke()
      ctx.draw()
      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 660,
          height: 787,
          destWidth: 660,
          destHeight: 787,
          canvasId: 'shareImg3',
          success: function (res) {
            wx.previewImage({
              current: res.tempFilePath,
              urls: [res.tempFilePath]
            })
            wx.hideLoading()
          },
          fail: function (res) {}
        }, that)
      }, 500);
    })

  },
  share: function (e) {

    var that = this
    wx.showLoading({
      title: '努力生成中...',
      duration: 1000
    })
    that.shareImg1()
    // setTimeout(function () {
    //   wx.canvasToTempFilePath({
    //     x: 0,
    //     y: 0,
    //     width: 660,
    //     height: parseInt(e.currentTarget.dataset.height),
    //     destWidth: 660,
    //     destHeight: parseInt(e.currentTarget.dataset.height),
    //     canvasId: e.currentTarget.dataset.share,
    //     success: function (res) {
    //       console.log(res.tempFilePath);
    //       wx.navigateTo({
    //         url: '/pages/components/preview/index?prurl=' + res.tempFilePath,
    //       })

    //       wx.hideLoading()
    //     },
    //     fail: function (res) {
    //       console.log(res)
    //     }
    //   }, that)
    // }, 500);
  },

  getUserinfo() {
    let params = this.data.userId !== 0 ? {
      userId: this.data.userId
    } : {}
    app
      .request('getUserInfo', 'GET', params)
      .then((res) => {

        res.careerList = res.careerList.map(element => {
          element.careerName = element.careerName.length > 6 ? element.careerName.substring(0, 6) + '...' : element.careerName
          return element
        });
        this.setData({
          userInfo: res,
        })
        let major = res.major.length > 4 ? res.major.substring(0, 3) + '...' : res.major
        let occupation = res.occupation.length > 4 ? res.occupation.substring(0, 3) + '...' : res.occupation
        this.setData({
          major,
          occupation,
        })

      });
  },
  setfollow() {
    let that = this.data;
    if (that.userInfo.isFinish) {
      app
        .request('follow', 'POST', {
          userId: that.userInfo.id,
          status: that.userInfo.followStatus
        })
        .then((res) => {
          wx.showToast({
            title: res,
            icon: 'none',
          })
          this.getUserinfo()
        });
    } else {
      wx.showModal({
        content: "请先去个人页面完善资料",
        showCancel: false,
      });
    }
  },
  into_singleChatRoom: function (detail) {
    let that = this.data;
    if (that.userInfo.isFinish) {
      let id = that.userInfo.id
      var my = wx.getStorageSync("myUsername");
      var avatar = wx.getStorageSync("user_avatar")
      var nameList = {
        myName: my,
        your: id + "",
        avatar_me: avatar,
        avatar_other: that.userInfo.avatar,
        nickname: that.userInfo.nickname
      };
      wx.WebIM.conn.subscribe({
        to: id + ""
      });
      wx.navigateTo({
        url: '/pages/chatroom/chatroom?username=' + JSON.stringify(nameList)
      })
    } else {
      wx.showModal({
        content: "请先去个人页面完善资料",
        showCancel: false,
      });
    }


  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },
})
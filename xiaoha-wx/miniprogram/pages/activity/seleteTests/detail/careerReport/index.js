const app = getApp()
Page({
  data: {
    careerReportInfo: {},
    type: '',
    characterRatios: [{
        name: "E",
        describe: "外向"
      }, {
        name: "S",
        describe: "感觉"
      }, {
        name: "T",
        describe: "思维"
      }, {
        name: "J",
        describe: "判断"
      }, {
        name: "I",
        describe: "内向"
      },
      {
        name: "N",
        describe: "直觉"
      },
      {
        name: "F",
        describe: "情感"
      },
      {
        name: "P",
        describe: "知觉"
      },
    ],
    xingge: app.Constants.imgHost + 'activity/xingge.png',
    aiqingguan: app.Constants.imgHost + 'activity/aiqingguan.png',
    shengyatuijian: app.Constants.imgHost + 'activity/shengyatuijian.png',
    field: app.Constants.imgHost + 'activity/field.png',
    state: false,
    origin: false,
    backFlag: true,
    showModal:false
  },
  onLoad: function (options) {
    let that = this
    // console.log(options, 'options');

    that.setData({
      type: parseInt(options.type),
    })
    if (options.origin) {
      that.setData({
        origin: JSON.parse(options.origin)
      })
    }
    try {
      let token = wx.getStorageSync('token');
      if (token) {
        app.globalData.token = token;
        that.getCareerReport(that.data.type, parseInt(options.id))
      }
    } catch (e) {}
  },
  goHome() {
    this.setData({
      backFlag: false,
    })
    // wx.switchTab({
    //   url: '/pages/activity/index'
    // })
    wx.navigateTo({
      url: '/pages/identity/personal/index',
    })
  },
  settlement(e) {
    // console.log(e);
    let item =e.currentTarget.dataset.item
    var param
    if (item.state==1) {
      this.setData({
        showModal:true
      })
       param={
        careerId:item.id,
        type:item.status,
      }
    }else{
       param={
        careerId:item.id,
      type:item.status,
        tag:item.tag
      }
    }
    app
    .request('join', 'POST',param)
    .then((res) => {
      this.getCareerReport(this.data.type)
      wx.showToast({
        title: res,
        icon: 'none',
      })
    });
  },
 
  close(){
    this.setData({
      showModal:false
    })
  },
  shareImg1() {
    let that = this;
    wx.showLoading({
      title: '努力生成中...'
    })
    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.careerReportInfo.avatar,
        success: function (res) {
          // console.log(res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: app.Constants.imgHost + "share/Evaluation.png",
        success: function (res) {
          // console.log(res)
          resolve(res);
        }
      })
    });
    let promise3 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.careerReportInfo.image,
        success: function (res) {
          // console.log(res)
          resolve(res);
        }
      })
    });
    let promise4 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: app.Constants.imgHost + "xiaoha.png",
        success: function (res) {
          // console.log(res)
          resolve(res);
        }
      })
    });
    
    Promise.all([
      promise1, promise2, promise3,promise4
    ]).then(res => {
      const ctx = wx.createCanvasContext('shareImg1')
      ctx.drawImage(res[0].path, 30, 62, 60, 60)
      
      ctx.drawImage(res[2].path, 30, 245, 600, 263)
      ctx.drawImage(res[3].path, 330, 562, 250,250)
      ctx.drawImage(res[1].path, 0, 0, 660, 880)

      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(28)
      ctx.fillText(that.data.careerReportInfo.nickName, 107, 100)
      ctx.stroke()
      ctx.draw()
      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 660,
          height:880,
          destWidth: 660,
          destHeight: 880,
          canvasId: 'shareImg1',
          success: function (res) {
            wx.previewImage({
              current:res.tempFilePath,
              urls :[res.tempFilePath]
            })
            wx.hideLoading()
          },
          fail: function (res) {
            // console.log(res)
          }
        }, that)
      }, 500);
    })
  },
  share: function () {
    var that = this
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 660,
      height: 880,
      destWidth: 660,
      destHeight: 880,
      canvasId: 'shareImg1',
      success: function (res) {
        // console.log(res.tempFilePath);
        wx.navigateTo({
          url: '/pages/components/preview/index?prurl=' + res.tempFilePath,
        })

        wx.hideLoading()
      },
      fail: function (res) {
        // console.log(res)
      }
    })
  },
  getCareerReport(type, id) {
    let params = {
      type
    }
    id ? params.id = id : params
    app
      .request('getResult', 'GET', params)
      .then((res) => {
        // console.log(res,"res");
        
        this.setData({
          careerReportInfo: res,
          state:res.nextState
        });
      });
  },
  retest() {
    wx.navigateTo({
      url: '/pages/activity/seleteTests/detail/detail?type=' + this.data.type,
    })
  },
  continueTest() {
    if (this.data.state) {
      wx.navigateTo({
        url: '/pages/activity/seleteTests/detail/careerReport/index?type=' + (this.data.type + 1),
      })
    } else {
      wx.navigateTo({
        url: '/pages/activity/seleteTests/detail/detail?type=' + (this.data.type + 1),
      })
    }
  },
  onDetail(id) {
    wx.navigateTo({
      url: '/pages/activity/careerPath/index?id=' + id.currentTarget.dataset.id
    });
  },
  onUnload: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 2];
    
    // console.log(pages,currPage,'pppppp');

    if (this.data.backFlag&&currPage.route!="pages/activity/seleteTests/index") {
      wx.redirectTo({
        url: "/pages/activity/seleteTests/index",
      });
    } else {
      this.setData({
        backFlag: true,
      })
    }
  },
  // onShareAppMessage: function () {
  //   var referrer = this.data.careerReportInfo.id;
  //   let type = this.data.type
  //   let state = this.data.state
  //   return {
  //     title: '生涯测试结果',
  //     path: '/pages/activity/seleteTests/detail/careerReport/index?id=' + referrer + "&type=" + type + "&state=" + state,
  //     // imageUrl: '../../image/ssrxbfxt_img_bj.png'
  //   }
  // }
})
const app = getApp()
Page({
  data: {
    careerPath: [{
      title: '入门',
      url: app.Constants.imgHost + "activity/1.png"
    }, {
      title: '初级',
      url: app.Constants.imgHost + "activity/2.png"
    }, {
      title: '中级',
      url: app.Constants.imgHost + "activity/3.png"
    }, {
      title: '进阶',
      url: app.Constants.imgHost + "activity/4.png"
    }, ],
    recommends: [{
        name: "闫志宏",
        occupation: "视觉传达-UI设计师",
        type: "企业版",
        details: "展现企业文化",
        url: app.Constants.imgHost + "home/avatar1.png",
        follows: [{
            name: "关注",
            num: 5835
          },
          {
            name: "收藏",
            num: 5835
          },
          {
            name: "粉丝",
            num: 5835
          }
        ],
        address: "重庆",
        rate: 1
      },
      {
        name: "闫志宏",
        occupation: "视觉传达-UI设计师",
        type: "企业版",
        details: "展现企业文化",
        url: app.Constants.imgHost + "home/avatar1.png",

        follows: [{
            name: "关注",
            num: 5835
          },
          {
            name: "收藏",
            num: 5835
          },
          {
            name: "粉丝",
            num: 5835
          }
        ],
        address: "重庆",
        rate: 1
      }
    ],
    id: '',
    state: '',
    recommendUserList: [],
    careerName: '',
    tag: "",
    animation: false,
    showModal: false,
    wechatNumber: 'a13157191835',
    goutou: app.Constants.imgHost + 'activity/goutou.png',
    tribeList:[],
    commentNum:0,
    isFinish:false
  },
  onLoad(e) {
    let that = this;
    that.setData({
      id: e.id
    })
    that.getCareer_details()
  },
  copyText() {
    let data = this.data.wechatNumber
    if (data) {
      wx.setClipboardData({
        data,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功',
                icon: "success",
                duration: 1000
              })
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '复制失败',
        icon: "none",
        duration: 1000
      })
    }
  },
  getCareer_details(id) {
    let that = this
    app
      .request('getCareerDetail', 'GET', {
        id: that.data.id
      })
      .then((res) => {
        let recommendUserList = res.recommendUserList.map((item) => {
          item.follows = [{
              name: "关注",
              num: item.followCount
            },
            {
              name: "粉丝",
              num: item.fansCount
            }
          ]
          return item
        })
        that.setData({
          state: res.state,
          "careerPath[0].details": res.twoer,
          "careerPath[1].details": res.basic,
          "careerPath[2].details": res.intermediate,
          "careerPath[3].details": res.advance,
          isFinish:res.isFinish,
          careerName: res.careerName,
          recommendUserList,
          count: res.count,
          tag: res.tag,
          tribeList:res.tribeList,
          commentNum:res.commentNum
        });
      });
  },
  changebtn(e) {
    wx.navigateTo({
      url: "/pages/home/card/index?id=" + e.currentTarget.dataset.id
    })
  },
  discussion(){
    wx.navigateTo({
      url: "discussion/index?careerId="+this.data.id+"&title="+this.data.careerName
    })
  },
  settlement() {
    var param
    if (this.data.state == 1) {
      // this.setData({
      //   showModal:true
      // })
      param = {
        careerId: this.data.id,
        type: this.data.state,
      }
    } else {
      param = {
        careerId: this.data.id,
        type: this.data.state,
        tag: this.data.tag
      }
    }
    app
      .request('join', 'POST', param)
      .then((res) => {
        this.getCareer_details()
        wx.showToast({
          title: res,
          icon: 'none',
        })
      });
  },
  close() {
    this.setData({
      showModal: false
    })
  },
  getVenetica(index) {
    let i = index.currentTarget.dataset.index
    if (this.data.animation === i) {
      this.setData({
        animation: false
      })
    } else {
      this.setData({
        animation: i
      })
    }
  },
  
  gotoDetail(e) {

    wx.navigateTo({
      url: '/pages/activity/careerTribe/tribeDetail/index?id=' + e.currentTarget.dataset.id
    });
  },
  
})
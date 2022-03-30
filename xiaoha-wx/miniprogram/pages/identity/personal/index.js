//index.js
const app = getApp()
const date = new Date()
Page({
  data: {
    man_isShow: true,
    woman_isShow: true,
    label: [],
    prefer: [],
    userInfo: {},
    gender: '',
    formSubmitFlag: true,
    backFlag: true,
    region: [],
    ifClick: true,
    yearArray: [
      ['专科', '本科', '研究生', '博士']
    ],
    yearIndex: [],
    man_choose_url: app.Constants.imgHost + "activity/nangoutou.png",
    man_unchoose_url: app.Constants.imgHost + "activity/nangoutou_unchoose.png",
    woman_unchoose_url: app.Constants.imgHost + "activity/nvgoutou.png",
    woman_choose_url: app.Constants.imgHost + "activity/nvgoutou_choose.png",
    arrowIcon: app.Constants.imgHost + 'find/icon.png',
    images: [
      app.Constants.imgHost + "activity/zhanghao.png",
      app.Constants.imgHost + "activity/sex.png",
      app.Constants.imgHost + "activity/school.png",
      app.Constants.imgHost + "activity/professional.png",
      app.Constants.imgHost + "activity/school.png",
      app.Constants.imgHost + "activity/professional.png",
      app.Constants.imgHost + "mine/nianji.png",
      app.Constants.imgHost + "mine/jiaxiang.png",
    ],
  },
  onLoad() {
    this.getPrefer()
    this.yearList()

  },
  onShow() {
    this.getUserinfo()
  },
  yearList() {
    let yearList = [],
      that = this;
    for (let index = 1980; index <= date.getFullYear(); index++) {
      yearList.push(index + "级")
    }
    that.data.yearArray.push(yearList)
    that.setData({
      yearArray: that.data.yearArray
    })
  },
  getUserinfo() {
    app
      .request('getUserInfo', 'GET', {})
      .then((res) => {
        this.setData({
          userInfo: res
        })
      });
  },
  getPrefer() {
    app
      .request('getPrefer', 'GET'

      ).then(res => {
        for (var i = 0; i < res.length; i++) {
          this.data.label.push({
            name: res[i].name,
            ifclick: false
          })
        }
        this.setData({
          label: this.data.label
        })

      })
  },
  bindYearPickerChange(e) {
    this.setData({
      yearIndex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
    })
    // console.log(this.data.region);

  },
  itemClicked: function (e) {
    let name = e.currentTarget.dataset.item.name
    let index = e.currentTarget.dataset.index
    if (this.data.prefer.length > 0) {
      if (this.data.prefer.indexOf(name) == -1) {
        this.data.prefer.push(name)
      } else {
        for (var i = 0; i < this.data.prefer.length; i++) {
          if (this.data.prefer[i] == name) {
            this.data.prefer.splice(i, 1)
          }
        }


      }
    } else {
      this.data.prefer.push(name)
    }
    this.setData({
      prefer: this.data.prefer
    })


    this.data.label[index].ifclick = !this.data.label[index].ifclick
    this.setData({
      label: this.data.label
    })




  },
  man_image_click(e) {
    this.setData({
      man_isShow: !this.data.man_isShow
    })
    this.setData({
      //true不显示
      woman_isShow: true
    })
    this.setData({
      gender: !this.data.man_isShow ? "男" : ''
    })
  },
  woman_image_click(e) {
    this.setData({
      woman_isShow: !this.data.woman_isShow
    })
    this.setData({
      man_isShow: true
    })
    this.setData({
      gender: !this.data.woman_isShow ? "女" : ''
    })
  },
  formSubmit(e) {
    // console.log(e);

    // if (e.detail.value.nickname == "") return wx.showToast({
    //   title: "请填写姓名",
    //   icon: "none"
    // });
    // else if (this.data.gender == '') return wx.showToast({
    //   title: "请选择性别",
    //   icon: "none"
    // });
    // else if (this.data.userInfo.school == "" && this.data.userInfo.type == '1') return wx.showToast({
    //   title: "请输入在读学校",
    //   icon: "none"
    // });
    // else if (this.data.userInfo.major == "" && this.data.userInfo.type == '1') return wx.showToast({
    //   title: "请输入在读专业",
    //   icon: "none"
    // });
    // else if (this.data.userInfo.school == "" && this.data.userInfo.type == '2')
    //   return wx.showToast({
    //     title: "请输入毕业学校",
    //     icon: "none"
    //   });
    // else if (e.detail.value.occupation == "" && this.data.type == '2')
    //   return wx.showToast({
    //     title: "请输入职业",
    //     icon: "none"
    //   });
    // else if (this.data.region.length <= 0)
    //   return wx.showToast({
    //     title: "请选择您的家乡",
    //     icon: "none"
    //   });
    // else if (this.data.yearIndex.length <= 0)
    //   return wx.showToast({
    //     title: "请选择年级",
    //     icon: "none"
    //   });
    if (this.data.prefer.length <= 0) return wx.showToast({
      title: "请选择感兴趣得就业方向",
      icon: "none"
    });
    if (this.data.formSubmitFlag) {
      this.setData({
        formSubmitFlag: false
      })
      app
        .request('saveUserInfo', 'POST', {
          gender: this.data.gender,
          major: e.detail.value.major,
          nickname: e.detail.value.nickname,
          occupation: e.detail.value.occupation,
          prefer: this.data.prefer,
          school: e.detail.value.school,
          homeAddress: this.data.region[0] + " " + this.data.region[1] + " " + this.data.region[2],
          classes: this.data.yearArray[1][this.data.yearIndex[1]],
          education: this.data.yearArray[0][this.data.yearIndex[0]]
        })
        .then((res) => {
          this.setData({
            backFlag: false
          })
          wx.switchTab({
            url: '/pages/activity/index',
            success: () => {
              this.setData({
                formSubmitFlag: true,
              })
            }
          });
        }).catch((err) => {
          setTimeout(() => {
            this.setData({
              formSubmitFlag: true
            })
          }, 500);

        })
    }


  },
  cancel() {
    wx.switchTab({
      url: '/pages/activity/index',
      success: () => {
        this.setData({
          formSubmitFlag: true,
        })
      }
    });
  },
  handleClick: function (e) {
    let index = e.currentTarget.dataset.index
    let title = e.currentTarget.dataset.title
    let content = e.currentTarget.dataset.content
    let that = this
    let reviseData = {
      title,
      content,
      index,
      type: that.data.userInfo.type
    }
    wx.navigateTo({
      url: "/pages/mine/editor/revise/index?reviseData=" + JSON.stringify(reviseData),
    })
  },
  onUnload: function () {
    if (this.data.backFlag) {
      wx.redirectTo({
        url: "/pages/identity/identity",
      });
    } else {
      this.setData({
        backFlag: true,
      })
    }

  },

})
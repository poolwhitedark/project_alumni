const app = getApp()
const date = new Date()
Page({

  data: {
    region: [],
    mineeditorInfo: [{
        title: '头像',
        url: ""
      },
      {
        title: '昵称',
        content: ""
      },
      {
        title: '状态',
        content: "未填写"
      }, {
        title: '性别',
        content: "未填写"
      }, {
        title: '职业',
        content: "未填写"
      }, {
        title: '学校/毕业院校',
        content: "未填写"
      }, {
        title: '相册',
        content: ""
      }, {
        title: '个人介绍',
        content: "未填写"
      }, {
        title: '地区',
        content: ""
      },
      // {
      //   title: '家乡',
      //   content: ""
      // },{
      //   title: '年级',
      //   content: ""
      // },
    ],
    arrowIcon: app.Constants.imgHost + 'find/icon.png',
    type: null,
    backFlag: true,
    photoList: [],
    yearArray: [
      ['专科', '本科', '研究生', '博士']
    ],
    yearIndex: [],
    studentStateArray: ['在校', '已毕业']
  },
  onLoad() {
    this.yearList()
  },
  onShow(e) {
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
        res.introduce = res.introduce.length > 13 ? res.introduce.substring(0, 12) + '...' : res.introduce
        this.setData({
          "mineeditorInfo[0].url": res.avatar,
          "mineeditorInfo[1].content": res.nickname,
          "mineeditorInfo[2].content": this.data.studentStateArray[res.studentState],
          "mineeditorInfo[3].content": res.gender,
          "mineeditorInfo[4].title": res.studentState === 0 ? "专业" : "职业",
          "mineeditorInfo[5].title": res.studentState === 0 ? "在读学校" : "毕业学校",
          "mineeditorInfo[4].content": res.major != '' ? res.major : "未填写",
          "mineeditorInfo[5].content": res.school != '' ? res.school : "未填写",
          "mineeditorInfo[8].content": res.address,
          "mineeditorInfo[7].content": res.introduce != '' ? res.introduce : "未填写",
          "homeAddress": res.homeAddress != '' ? res.homeAddress : "未填写",
          "classes": res.classes != '' ? res.classes : "未填写",
          type: res.type,
          photoList: res.photoList
        })
      });
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      homeAddress: e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2]
    })
    this.saveUserInfo({
      homeAddress: this.data.homeAddress
    })
  },
  bindYearPickerChange(e) {
    this.setData({
      yearIndex: e.detail.value,
      classes: this.data.yearArray[1][e.detail.value[1]]
    })
    this.saveUserInfo({
      classes: this.data.yearArray[1][this.data.yearIndex[1]],
      education: this.data.yearArray[0][this.data.yearIndex[0]]
    })
  },
  saveUserInfo(parmas) {
    app
      .request('saveUserInfo', 'POST', parmas)
      .then((res) => {}).catch((err) => {

      })
  },
  handleClick: function (e) {
    let index = e.currentTarget.dataset.index
    let that = this
    if (index != 8 && index !== 6) {
      if (index == 0) {
        that.uploadimg(1)
      } else if (index == 2) {
        that.showActionSheet(['在校', '已毕业']).then(res => {
          console.log(res);
          that.saveUserInfo({
            studentState: res.tapIndex,
          })

          this.setData({
            "mineeditorInfo[2].content": res.text,
            "mineeditorInfo[4].title": res.tapIndex === 0 ? "专业" : "职业",
            "mineeditorInfo[5].title": res.tapIndex === 0 ? "在读学校" : "毕业学校",
          })


        })
      } else if (index == 3) {
        that.showActionSheet(['男', '女']).then(res => {
          console.log(res);
          that.saveUserInfo({
            gender: res.text
          })
          this.setData({
            "mineeditorInfo[3].content": res.text
          })
        })

      } else {
        that.setData({
          backFlag: false,
        })
        let reviseData = {
          title: that.data.mineeditorInfo[index].title,
          content: that.data.mineeditorInfo[index].content,
          index,
          type: that.data.type
        }
        wx.navigateTo({
          url: "/pages/mine/editor/revise/index?reviseData=" + JSON.stringify(reviseData),
        })

      }
    }


  },
  showActionSheet(itemList) {
    console.log(itemList);

    return new Promise(
      function (resolve, reject) {
        wx.showActionSheet({
          itemList: itemList,
          success(res) {
            resolve({
              text: itemList[res.tapIndex],
              tapIndex: res.tapIndex
            })
          },
          fail(res) {
            reject(res.errMsg)
            console.log(res.errMsg)
          }
        })
      }
    )

  },
  upload() {
    this.uploadimg(2)
  },
  uploadimg(type) {
    let count = type == 1 ? type : 10 - this.data.photoList.length;
    app.uploadimg('upload', count, {
      type
    }).then(res => {
      this.getUserinfo()
    })
  },
  onUnload: function () {
    if (this.data.backFlag) {
      wx.redirectTo({
        url: "/pages/mine/index",
      });
    } else {
      this.setData({
        backFlag: true,
      })
    }

  },
  delete(e) {
    app
      .request('deletePhoto', 'POST', {
        id: e.currentTarget.dataset.id
      })
      .then((res) => {
        this.getUserinfo()
      });
  },
  previewImage(e) {
    let urls = this.data.photoList.map(res => res.photo)
    wx.previewImage({
      current: e.currentTarget.dataset.photo, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  }

})
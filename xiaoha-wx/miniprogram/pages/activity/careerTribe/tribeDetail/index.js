// pages/activity/careerTribe/tribeDetail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: {},
    idx: 5,
    triblrName: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    let i = options.id
    that.setData({
      id: i

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  getCareerDetail() {
    app
      .request('getTribeDetail', 'GET', {
        id: this.data.id
      })
      .then((res) => {

        this.setData({
          info: res,
        });

      });
  },
  getTribe() {
    app
      .request('getTribe', 'GET', {
        tribeId: this.data.id
      })
      .then((d) => {
        if (this.data.info.state==false) {
          this.setData({
            "info.state":true
          })
        }
        wx.showModal({
          content: d,
          cancelText: '复制',
          success(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            } else if (res.cancel) {
              wx.setClipboardData({
                //准备复制的数据
                data: d,
                success: function (res) {
                  wx.showToast({
                    title: '复制成功',
                  });
                }
              });
            }
          }
        })
        this.setData({
          triblrName: res,
        });

      });
  },
  saveImage(e) {
    // console.log(e)
    let url = e.currentTarget.dataset.url;
    //用户需要授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              // 同意授权
              this.saveImg1(url);
            },
            fail: (res) => {
              // console.log(res);
            }
          })
        } else {
          // 已经授权了
          this.saveImg1(url);
        }
      },
      fail: (res) => {
        // console.log(res);
      }
    })
  },
  saveImg1(url) {
    wx.getImageInfo({
      src: url,
      success: (res) => {
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: (res) => {
            // console.log(res);
          },
          fail: (res) => {
            // console.log(res);
          }
        })
      },
      fail: (res) => {
        // console.log(res);
      }
    })
  },
  onShow: function () {
    let that = this;
    try {
      let token = wx.getStorageSync('token');
      if (token) {
        app.globalData.token = token;
        that.getCareerDetail()
      }
    } catch (e) {}
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})
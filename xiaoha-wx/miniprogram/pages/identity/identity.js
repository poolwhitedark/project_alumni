//index.js
const app = getApp()
Page({
  data: {
    identityData: [{
        type: '学生版',
        details: '在读大学生',
        url: app.Constants.imgHost+'singin/haoyou%402x.png'
      },
      {
        type: '职友版',
        details: '在职校友',
        url: app.Constants.imgHost+'singin/qiye%402x.png'
      }
    ],
    user_id: '',
    goIdentityFlag: true
  },
  onLoad: function () {
    let that = this;
    wx.getStorage({
      key: 'user_id',
      success: function success(res) {
        if (res.data !== '') {
          that.setData({
            user_id: res.data
          });
        }
      }
    });
  },
  goIdentity(i) {
    let status = i.currentTarget.dataset.type + 1
    if (this.data.goIdentityFlag) {
      this.setData({
        goIdentityFlag: false
      })
      app
        .request('choose', 'GET', {
          type: status,
        })
        .then((res) => {
          setTimeout(() => {
            this.setData({
              goIdentityFlag: true
            })
          }, 500);
          wx.navigateTo({
            url: '/pages/identity/personal/index'
          });
        }).catch(err=>{
          setTimeout(() => {
            this.setData({
              goIdentityFlag: true
            })
          }, 500);
        })
    }

  }

})
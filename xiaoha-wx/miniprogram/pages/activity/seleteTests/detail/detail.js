const app = getApp()

Page({
  data: {
    type: 0,
    questions: [],
    active: 0,
    user_id: '',
    answer: [],
    clearList:[],
    origin:false
  },
  onLoad(e) {
    let that = this
    if (e.type) {
      that.setData({
        type: parseInt(e.type),
        origin:e.origin
      })
    }
    
    try {
      let answer = wx.getStorageSync(`answer${that.data.type}`),
        token = wx.getStorageSync('token'),
        active = wx.getStorageSync(`active${that.data.type}`),
        clearList=wx.getStorageSync('clearList')
      if (answer) {
        that.setData({
          answer,
          
        })
      }
      if (clearList) {
        that.setData({
          clearList
        })
      }
      if (token) {
        app.globalData.token = token;
        if (that.data.type == 0) {
          wx.setNavigationBarTitle({
            title: '初级生涯题库'
          })
          that.getMiddleQuestions("question5")
        } else if (that.data.type == 1) {
          wx.setNavigationBarTitle({
            title: '中级生涯题库'
          })
          that.getMiddleQuestions("question28")
        } else {
          wx.setNavigationBarTitle({
            title: '高级生涯题库'
          })
          that.getMiddleQuestions("question93")
        }
      }
      if (active) {
        that.setData({
          active
        })
      }

    } catch (e) {}
  },
  getMiddleQuestions(type) {
    app
      .request('beginTest', 'GET', {
        type,
      })
      .then((res) => {
        this.setData({
          questions: res
        })
      });
  },
  setAnswer(e) {
    let that = this;
    let dataset = e.currentTarget.dataset;
    let redefinition = that.data.answer.findIndex(item => item.id == dataset.reply.id);
    redefinition !== -1 ?
      that.data.answer[redefinition].answer = dataset.answer == 0 ? dataset.reply.a.reply : dataset.reply.b.reply :
      that.data.answer.push({
        id: dataset.reply.id,
        answer: dataset.answer == 0 ? dataset.reply.a.reply : dataset.reply.b.reply,
        flag: e.currentTarget.dataset.answer
      })
    that.data.answer[dataset.index].flag = e.currentTarget.dataset.answer
    that.setData({
      answer: that.data.answer
    })

    if (that.data.active + 1 < that.data.questions.length) {
      setTimeout(() => {
        that.setData({
          active: that.data.active + 1
        })
        wx.setStorageSync(`answer${that.data.type}`, that.data.answer);
        wx.setStorageSync(`active${that.data.type}`, that.data.active);
        
        
        if(that.data.clearList.findIndex(item => item== `answer${that.data.type}`)===-1){
          that.data.clearList.push(`answer${that.data.type}`)
        }
        if(that.data.clearList.findIndex(item => item== `active${that.data.type}`)===-1){
          that.data.clearList.push(`active${that.data.type}`)
        }
        wx.setStorageSync('clearList',that.data.clearList)
      }, 100);
    } else {
      this.getCareerReport(that.data.type)
    }

  },
  getCareerReport(type) {
    let answer = this.data.answer.map(item => item.answer)
    app
      .request('commitAnswer', 'POST', {
        answer,
        type
      })
      .then((res) => {
        if (this.data.origin=="true") {
          wx.navigateTo({
            url: '/pages/activity/seleteTests/detail/careerReport/index?type=' + type+"&origin="+this.data.origin,
          })
        }else{
          wx.navigateTo({
            url: '/pages/activity/seleteTests/detail/careerReport/index?type=' + type,
          })
        }
        
        wx.removeStorageSync(`answer${this.data.type}`)
        wx.removeStorageSync(`active${this.data.type}`)
        this.data.clearList.splice(this.data.clearList.indexOf(`answer${this.data.type}`), 1)
        this.data.clearList.splice(this.data.clearList.indexOf(`active${this.data.type}`), 1)
        wx.setStorageSync('clearList',this.data.clearList)
      });
  },
  qBack() {
    let that = this;
    if (that.data.active > 0) {
      that.setData({
        active: that.data.active - 1,
        flag: null
      })
    } else {
      wx.showToast({
        title: "没有上一题了呦",
        icon: 'none',
      })
    }
  }
})
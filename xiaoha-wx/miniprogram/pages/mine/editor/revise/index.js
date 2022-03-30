const app = getApp()
Page({
  data: {
    preserve: false,
    reviseData: {},
    value: '',
    maxlength: 20,
    surplus: 20,
    array: [],
    show: false,
    selectMajorFlag: true,
    selectSchoolFlag: true,
  },
  onLoad: function (options) {
    let reviseData = JSON.parse(options.reviseData)
    // console.log(reviseData);
    this.setData({
      reviseData,
      value: reviseData.content
    })
    wx.setNavigationBarTitle({
      title: reviseData.title + '修改'
    })
    if (reviseData.index == 1) {
      this.setData({
        maxlength: 10,
        surplus: 10 - this.data.value.length
      })
    }
    
    if (reviseData.index == 7) {
      this.setData({
        maxlength: 20,
        surplus: 20 - this.data.value.length
      })
    }
  },
  getValue(e) {
    let value = e.detail.value
    this.setData({
      value
    })
    var surplus = this.data.maxlength - this.data.value.length
    this.setData({
      surplus
    })
    if (value.length > 0) {
      this.setData({
        preserve: true,

      })
      if (this.data.reviseData.index == 4) {
        // this.selectMajor(value)
        this.debounce(this.selectMajor(value), 2000,false)
      } else if (this.data.reviseData.index == 5) {
        // this.selectSchool(value)
        this.debounce(this.selectSchool(value), 2000,false)
      }
    } else {
      this.setData({
        preserve: false
      })
    }
  },
  submit() {
    let params = {}
    // console.log(this.data.value);
    if (this.data.reviseData.index == 1) {
      params.nickname = this.data.value
    } else if (this.data.reviseData.index == 4) {
       params.major = this.data.value 
    } else if (this.data.reviseData.index == 5) {
      params.school = this.data.value
    } else if (this.data.reviseData.index == 7) {
      params.introduce = this.data.value
    }


    app
      .request('saveUserInfo', 'POST', params)
      .then((res) => {
        wx.navigateBack()
      }).catch((err) => {

      })
  },
  selectMajor(name) {

    if (this.data.selectMajorFlag) {
      
      let that = this
      that.setData({
        selectMajorFlag: false,
      })
      app
        .request('selectMajor', 'GET', {
          name
        })
        .then((res) => {
          that.setData({
            array: res,
            show: true,
            selectMajorFlag: true
          })
        }).catch((err) => {
          that.setData({
            selectMajorFlag: true,
          })
        })
    }

  },
  selectSchool(name) {

    if (this.data.selectSchoolFlag) {
      
      let that = this
      that.setData({
        selectSchoolFlag: false,
      })
      app
        .request('selectSchool', 'GET', {
          name
        })
        .then((res) => {
          that.setData({
            array: res,
            show: true,
            selectSchoolFlag: true
          })
        }).catch((err) => {
          that.setData({
            selectSchoolFlag: true,
          })
        })
    }
  },
  selection(e) {
    // console.log(e);
    this.setData({
      value: e.currentTarget.dataset.item,
      show: false
    })
  },
  debounce(func, wait, immediate) { //immediate为true表示立即执行。为false表示延迟之后在执行。
    let timer, context, args;
    const later = () => setTimeout(() => { //延迟函数
      timer = null; //延迟函数执行完毕，清空缓存的定时器序号
      if (!immediate) { //延迟执行的情况下，函数会在延迟函数中执行
        func.apply(context, args) //使用之前缓存的参数和上下文
        context = args = null;
      }
    }, wait)
    return function (...params) { //返回的是每次实际调用的函数
      if (!timer) { //没有创建的延迟函数，就创建一个
        timer = later();
        if (immediate) { //立即执行，调用函数
          func.apply(this, params)
        } else { //延迟执行，缓存函数，调用上下文
          context = this;
          args = params
        }
      } else { //已有延迟函数，清除并重新设定
        clearTimeout(timer)
        timer = later()
      }
    }
  }
})
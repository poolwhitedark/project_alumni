const app = getApp()
Page({
  data: {
    hidden: true,
    flag: false,
    x: 0,
    y: 0,
    disabled: true,
    elements: [],
    careerCircle: {},
    assistCareerList: [],
    movableInfo:{}
  },
  onLoad: function (options) {
    this.getMycareer()

  },
  onReady: function () {

  },
  onShow() {

  },
  getNodesRef() {
    var query = wx.createSelectorQuery();
    var nodesRef = query.selectAll(".item");
    console.log(nodesRef, 'nodesRef');
    nodesRef.fields({
      dataset: true,
      rect: true
    }, (result) => {


      this.setData({
        elements: result
      })
      console.log(this.data.elements, 'ppp');
    }).exec()
  },
  getMycareer() {
    let that = this
    app
      .request('getMyCareer', 'GET', {})
      .then((res) => {
        res.mainCareer.careerName = res.mainCareer.careerName.length > 6 ? res.mainCareer.careerName.substring(0, 5) + '...' : res.mainCareer.careerName
        res.assistCareerList = res.assistCareerList.map(element => {
          element.careerName = element.careerName.length > 6 ? element.careerName.substring(0, 5) + '...' : element.careerName
          return element
        });
        that.setData({
          careerCircle: res,
          assistCareerList: res.assistCareerList
        })
        that.getNodesRef()
        console.log(that.data.careerCircle);

      }).catch(err => {

      })
  },

  onDetail(id) {
    
    wx.navigateTo({
      url: '/pages/activity/careerPath/index?id=' + id.currentTarget.dataset.item.id
    });
  },
  _longtap: function (e) {
    const detail = e.detail;
    console.log(e);

    this.setData({
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop
    })
    this.setData({
      movableInfo:e.currentTarget.dataset.item,
      hidden: false,
      flag: true
    })
  },
  touchs: function (e) {
    this.setData({
      beginIndex: e.currentTarget.dataset.index
    })
  },
  touchend: function (e) {
    if (!this.data.flag) {
      return;
    }
    let that = this
    const x = e.changedTouches[0].pageX
    const y = e.changedTouches[0].pageY
    const list = this.data.elements;
    console.log(list, 'list');

    let data = this.data.data
    let data1 = this.data.data1
    for (var j = 0; j < list.length; j++) {
      const item = list[j];
      console.log(list[j]);
      
      if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
        const endIndex = parseInt(item.dataset.index);
        const beginIndex = parseInt(this.data.beginIndex);
        console.log(beginIndex, endIndex,'00000');
        if (beginIndex < endIndex) {
          that.career_change(that.data.careerCircle.assistCareerList[endIndex].id)
          let mainCareer=that.data.careerCircle.mainCareer
          let item=that.data.careerCircle.assistCareerList[endIndex]
          that.data.careerCircle.assistCareerList[endIndex]=mainCareer
          that.data.careerCircle.mainCareer=item
          that.setData({
            careerCircle:that.data.careerCircle,
          })
          console.log(that.data.careerCircle.assistCareerList[endIndex].careerName);
          
        }
        if (beginIndex > endIndex) {
          that.career_change(that.data.careerCircle.assistCareerList[beginIndex].id)
          let mainCareer=that.data.careerCircle.mainCareer
          let item=that.data.careerCircle.assistCareerList[beginIndex]
          that.data.careerCircle.assistCareerList[beginIndex]=mainCareer
          that.data.careerCircle.mainCareer=item
          that.setData({
            careerCircle:that.data.careerCircle,
          })
          
          console.log(that.data.careerCircle.assistCareerList[beginIndex].careerName);
        }
      }
    }
    this.setData({
      hidden: true,
      flag: false
    })
  },

  //滑动
  touchm: function (e) {
    if (this.data.flag) {
      const x = e.touches[0].pageX
      const y = e.touches[0].pageY

      this.setData({
        x: x -(this.data.elements[0].left*4.5),
        y: y - (this.data.elements[0].top*1.1)
      })
    }
  },
  career_change(career_id){
    app
    .request('career_change', 'POST', {career_id})
    .then((res) => {
    }).catch(err => {

    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
})
// pages/CircleFriends/CircleFriends.js
var app = getApp()
const watch = require("../../../../utils/watch");

Page({
  data: {
    commentList: [],
    toView: '',
    careerId: '',
    pageNum:1,
    total:0,
    pageSize:10,
    discussionInfo:{},
    title: ""
  },


  onLoad(e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    watch.setWatcher(this);
    this.setData({
      careerId: e.careerId,
      title: e.title
    })
    wx.setNavigationBarTitle({
      title: e.title
    })
    if (currPage.data.discussionInfo) {
      this.setData({
        discussionInfo: currPage.data.discussionInfo,
      })
    }
    this.data.commentList.forEach((item, i) => {
      var query = wx.createSelectorQuery();
      query.select('#wdy' + i).boundingClientRect();
      query.exec((res) => {
        var height = res[0].height;
        this.data.commentList[i].colNum = Math.ceil(height / 25)
        this.setData({
          commentList: this.data.commentList,
        })
      })
    })
    this.getComments()
  },
  watch: {
    // pageNum: function (value, oldValue) {
    //   this.getComments(value) 
    // },
    discussionInfo:function (value, oldValue) {
         console.log(value, oldValue,'888');
         if (value.type==1) {
           this.setData({
            pageNum:1,
           })
          this.getComments()
         }else if(value.type==2){
           this.data.commentList.forEach(Element=>{
             if (Element.id==value.commentId) {
              Element.children.push(value)
             }
           })
           this.setData({
            commentList: this.data.commentList,
          })
         }
    },
  },
  
  onShow() {
    // this.getComments() 
  },
  //展开  收起
  change: function (e) {
    var that = this;
    var commentList = that.data.commentList;
    var row = commentList[e.currentTarget.dataset.index];
    console.log("**********:" + row)
    row.isF = !row.isF;
    that.setData({
      commentList: commentList,
    })
  },

  getComments() {
    let {pageNum,pageSize,careerId,commentList}=this.data
    app
      .request('getComments', 'GET', {
        pageNum,
        pageSize,
        careerId
      })
      .then((res) => {
        this.setData({
          total:res.total
        })
        if (pageNum===1) {
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 800
          })
          this.setData({
            commentList: res.commentList,
          })
        }else{
          this.setData({
            commentList:[...commentList,...res.commentList]
          })
          
          console.log(commentList);
        }
        
      });
  },
  star(e) {
    let {commentList}=this.data
    app
      .request('star', 'POST', {
        type: e.currentTarget.dataset.startype,
        commentId: e.currentTarget.dataset.id
      })
      .then((res) => {
        if (e.currentTarget.dataset.type=="1") {
          
        commentList[e.currentTarget.dataset.index].starType=e.currentTarget.dataset.startype==2?1:2
        commentList[e.currentTarget.dataset.index].starNum=e.currentTarget.dataset.startype==2?commentList[e.currentTarget.dataset.index].starNum-1:commentList[e.currentTarget.dataset.index].starNum+1
          this.setData({
            commentList:commentList
          })
          
        }else{
          commentList[e.currentTarget.dataset.index].children[e.currentTarget.dataset.i].starType=e.currentTarget.dataset.startype==2?1:2
          commentList[e.currentTarget.dataset.index].children[e.currentTarget.dataset.i].starNum=e.currentTarget.dataset.startype==2?commentList[e.currentTarget.dataset.index].children[e.currentTarget.dataset.i].starNum-1:commentList[e.currentTarget.dataset.index].children[e.currentTarget.dataset.i].starNum+1
          this.setData({
            commentList:commentList
          })
        }
      });
  },
  postComment() {
    wx.navigateTo({
      url: 'postComment/index?id=' + this.data.careerId,
    })
  },
  report(e) {
    console.log(e);
    
    wx.navigateTo({
      url: 'report/index?title='+e.currentTarget.dataset.title+"&userId="+e.currentTarget.dataset.userid,
    })
  },
  onReply(e) {
    wx.navigateTo({
      url: 'reply/index?item=' + JSON.stringify(e.currentTarget.dataset.item) + "&careerId=" + this.data.careerId,
    })

  },
  onReachBottom: function () {
    let {pageNum,pageSize,total}=this.data
    if (pageNum*pageSize<total) {
      this.setData({
        pageNum:pageNum+1
      })
      
      this.getComments()
    }
  },

})
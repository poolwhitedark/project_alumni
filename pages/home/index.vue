<template>
  <view
    class="container999"
    @touchstart="refreshStart"
    @touchmove="refreshMove"
    @touchend="refreshEnd"
  >
    <!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
    <refresh ref="refresh" @isRefresh="isRefresh"></refresh>
    <view class="nav">
      <!-- 搜索 -->
      <view class="searchInput999">
        <search
          class="mSearch-input-box"
          :mode="2"
          button="inside"
          :placeholder="defaultKeyword"
          @search="doSearch()"
          @input="inputChange"
          @confirm="doSearch()"
          v-model="keyword"
        ></search>
        <!-- <view class='searchBox999'>
					<image src='../../common/images/dhl_icon_ss@2x.png' class='search999'></image>
				</view>
        <input @input="onKeyInput" @tap="inputClick" :value="isSearch" class='input999' placeholder="输入搜索内容"></input>-->
      </view>
      <view class="typeBox">
        <tj_row flex align="center">
          <view
            v-for="(item ,i ) in typeTxt"
            :key="i"
            class="tj-col"
            style="flex: 1;"
            @click="onActive(i)"
          >
            <view :align="item.align" :class="['f18',active==i?'mainColor':'']">{{item.txt}}</view>
            <view class="inline" :align="item.align">
              <i v-if="active==i" class="inline-item"></i>
            </view>
          </view>
        </tj_row>
      </view>
    </view>
    <scroll-view class="bottom" scroll-y="true" @scrolltolower="lower1">
      <tj_card :cardData="cardData"></tj_card>

      <view class="noCard" v-if="cardData.length == 0">暂无信息</view>
      <view
        class="loadMore"
        v-if="cardData.length >5"
      >{{noMore == 0 ?(isLoad == 0 ?'加载更多':'加载中'):'暂无更多'}}</view>
    </scroll-view>
  </view>
</template>

<script>
const util = require("../../util/util.js");
import search from "components/mehaotian-search-revision/mehaotian-search-revision.vue";
import refresh from "components/refresh.vue";
import tj_card from "library/card/index.vue";
import tj_row from "library/row/index.vue";
export default {
  components: { refresh, tj_card, tj_row, search },
  data() {
    return {
      list: [], //数据数组
      records: 1, //第几页
      noMore: 0, //1:暂无更多,0:加载更多/加载中
      isLoad: 0, //当noMore == 0 时候 才会被使用上,0:加载更多 1:加载中
      isSearch: "", //搜索关键字
      cardData: [
        {
          name: "闫志宏",
          occupation: "视觉传达-UI设计师",
          type: "企业版",
          details: "展现企业文化",
          url: require("common/images/头像@2x.png"),
          icon: require("common/images/标签@2x.png"),

          follows: [
            { name: "关注", num: 5835 },
            { name: "收藏", num: 5835 },
            { name: "粉丝", num: 5835 }
          ],
          address: "重庆",
          rate: 1
        },
        {
          name: "闫志宏",
          occupation: "视觉传达-UI设计师",
          type: "企业版",
          details: "展现企业文化",
          url: require("common/images/头像@2x.png"),
          icon: require("common/images/标签@2x.png"),

          follows: [
            { name: "关注", num: 5835 },
            { name: "收藏", num: 5835 },
            { name: "粉丝", num: 5835 }
          ],
          address: "重庆"
        }
      ],
      typeTxt: [
        { txt: "推荐", align: "left" },
        { txt: "热门", align: "center" },
        { txt: "关注", align: "right" }
      ],
      active: 0,
      defaultKeyword: "搜索你想要的！",
      keyword: ""
    };
  },
  onLoad() {
    uni.setTabBarItem({
      index: 1,
      pagePath: "pages/relation_find/relation_find",
      iconPath: "static/images/tabbar/职业@2x.png",
      selectedIconPath: "static/images/tabbar/press@2x.png",
      text: "生涯"
    });
    this.getMsgList();
  },
  methods: {
    // debounce 节流函数
    onKeyInput: util.debounce(function(e) {
      console.log(e);
      let tempWord = e.detail.value.replace(/ /g, "");
      this.isSearch = tempWord;
      this.getMsgList("refresh");
    }, 600),
    inputClick() {
      if (this.isSearch) {
        this.isSearch = "";
        this.getMsgList("refresh");
      }
    },
    // throttle 防抖函数
    lower1: util.throttle(function(e) {
      console.log("触底");
      if (this.noMore == 0 && this.isLoad == 0) {
        this.isLoad = 1;
        setTimeout(() => {
          this.getMsgList();
        }, 500);
      }
    }, 500),
    // 刷新touch监听
    refreshStart(e) {
      this.$refs.refresh.refreshStart(e);
    },
    refreshMove(e) {
      this.$refs.refresh.refreshMove(e);
    },
    refreshEnd(e) {
      this.$refs.refresh.refreshEnd(e);
    },
    // 刷新事件
    isRefresh() {
      this.getMsgList("refresh");
    },
    //请求
    getMsgList(temp) {
      if (temp == "refresh") {
        // 刷新事件,重置页数和更多
        this.records = 1;
        this.noMore = 0;
      }
      //请求所需的数据
      let postData = {
        pageIndex: this.records, //当前页数
        pageSize: 8 //一页含几个数据
      };
      // 关键字搜索
      if (this.isSearch) postData["keyWord"] = this.isSearch;
      // 模拟后端返回结果
      let res = {
        code: 0,
        result: {}
      };
      res.result.records = postData["keyWord"] ? 1 : 3; //关键字存在页数为1,否则为3
      res.result.list = postData["keyWord"]
        ? [this.isSearch]
        : [1, 2, 3, 4, 5, 6, 7, 8];
      setTimeout(() => {
        console.log(`${temp == "refresh" ? "刷新请求" : "普通请求"}`);
        // 后台返回来的最大页数大于等于当前页数
        if (res.result.records >= this.records && res.result.list.length > 0) {
          let tempList = res.result.list;
          if (this.records == 1) {
            this.list = tempList;
          } else {
            this.list = this.list.concat(tempList);
          }
          this.records++;
          if (this.records > res.result.records) this.noMore = 1;
        } else {
          this.list = [];
        }
        this.isLoad = 0;
        if (temp == "refresh") {
          // 刷新结束事件
          setTimeout(() => {
            this.$refs.refresh.endAfter();
          }, 600);
        }
      }, 400);
    },
    onActive(i) {
      this.active = i;
    }
  }
};
</script>

<style lang="scss">
.container999 {
  .card {
    width: 90%;
    height: 368rpx;
    background-color: white;
    margin: 30rpx auto 0 auto;
    background: #ffffff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    position: relative;
  }
  .noCard {
    width: 90%;
    border-radius: 5px;
    position: relative;
    margin: 0 auto 42rpx auto;
    background: white;
    display: flex;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    align-items: center;
    justify-content: center;
    height: 200rpx;
    margin-top: 20rpx;
    color: #797979;
    padding-top: 30rpx;
  }
  .bottom {
    width: 100vw;
    position: relative;
    height: 100vh;
    top: 97rpx;
    // background: #ededed;
  }
}
.loadMore {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  font-size: 24rpx;
}
.nav {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  width: 100%;
  font-size: 24rpx;
  z-index: 9999;
  .searchInput999 {
    width: 90%;
    margin: 14rpx auto;
    background: rgba(229, 229, 229, 1);
    border-radius: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    height: 56rpx;
    .input999 {
      color: #999;
      width: 80%;
    }
    .searchBox999 {
      width: 56rpx;
      height: 56rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .search999 {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
  .typeBox {
    padding: 60rpx 30rpx 0;
    .tj-col {
      .inline {
        line-height: 10rpx;
        .inline-item {
          display: inline-block;
          width: 68rpx;
          height: 4rpx;
          background-color: rgba(38, 88, 255, 0.5);
        }
      }
    }
  }
}
</style>

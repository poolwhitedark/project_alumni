<template>
  <div>

    <div class="mine-container">

      <div class="header" ref="ref4" v-if="!searchBarFixed2">
        <img src="../../common/images/dhl_iocn_fh.png" alt="" @click="appGoback()" class="img1">
        <img src="../../common/images/设置.png" alt="" @click="goshareIndex()" class="img2">

      </div>
      <div class="header" ref="ref4" v-if="searchBarFixed2" :style="opacity2">
        <img src="../../common/images/dhl_icon_jt.png" alt="" @click="appGoback()" class="img1">
        <h3>{{Userinfo.NickName}}</h3>
        <img src="../../common/images/设置.png" alt="" @click="goshareIndex()" class="img2">

      </div>
      <img src="../../common/images/图层 2 拷贝@2x.png" class="bgimg" :style="opacity" alt="">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" class="scrollView">

        <div class="mine-main mainJR">
          <div><tj_myCard :cardData='cardData'></tj_myCard></div>
          <main>
            <div ref="ref1" @scroll="scroll($event)">
              <div>
                <div v-for="(item,index) in tab" :key="index" @click="onTab(index)">
                  <span class="f15" :class="active==index?'mainColor':''">{{item}}</span>
                  <i v-if="active==index"></i>
                </div>
              </div>
            </div>
            <div ref="ref2"></div> <!-- 策略 -->
            <div class="main0" v-if="active==0">

            </div>
            <!-- 实盘 -->
            <div class="main0" v-if="active==1">
              <div class="sp">

                <div class="noData">
                  <img src="../../image/grzy_img_wushipan.png" alt />
                  <h3>Ta还没有接入任何实盘</h3>
                </div>
              </div>
              <!-- <div class="listNull">
              <img src="../../image/grzy_img_wushipan.png" alt="">
              <h3>Ta还没有接入任何实盘</h3>
            </div> -->
            </div>
            <!-- 动态 -->
            <div class="dynamic_list" v-if="active==2">
              <div v-for="(item,index) in communityList" :key="index">
                <div @click="gocommentDetail(item.ThemeID)">
                  <div>
                    <img :src="item.AvatarUrl" alt srcset />
                    <img src="../../common/image/v_da.png" alt />
                  </div>
                  <div class="pl_10">
                    <p class="f14 f_bold">{{item.NickName}}</p>
                    <p class="f12 pt_5">{{item.DateTime}}</p>
                  </div>
                </div>
                <!-- type=1 普通红包 -->
                <div class="type1" v-if="item.Type==1">
                  <div>
                    <p
                      :class="['dynamic_Content'+index,ynamic_num[index]/3>26.5&&ynamicArray[index]?'dynamic_Content':'']">
                      {{item.Content}}</p>
                    <p v-if="ynamic_num[index]/3>26.5" class="pt_15 f_bold"
                      @click="onFlag(ynamicArray[index],index,ynamicArray)">
                      {{ynamicArray[index]?'阅读全文':'收起'}}
                      <x-icon type="ios-arrow-down" size="16"></x-icon>
                    </p>

                    <div class="imglist">
                      <img v-for="items in item.PhotoAlbum" :src="items" alt="">
                    </div>
                    <!-- 埋红包 -->
                    <div class="mai" v-if="item.TaskId != 0" @click="gocommentDetail(item.ThemeID)">
                      <img src="../../image/qz_img_xhb.png" alt="">
                    </div>
                  </div>

                </div>
                <!-- 红包动态 -->
                <div class="type2" v-if="item.Type==2">
                  <img src="../../image/redbg.png" alt="" class="red">
               
                  <h3></h3>
                  <div>
                    <p>{{item.TaskInfo.Content}}</p>
                    <a class="btn" v-if="item.TaskInfo.IsClose==1" @click="gocommentDetail(item.ThemeID)">点击领取</a>
                    <a class="btn" v-else >已领完</a>
                  </div>
                </div>
                <!-- 3.合约动态 4.现货动态 -->
                <div class="type1 type3" v-if="item.Type==3 || item.Type==4">
                  <div>
                    <p
                      :class="['dynamic_Content'+index,ynamic_num[index]/3>26.5&&ynamicArray[index]?'dynamic_Content':'']">
                      {{item.Content}}</p>
                    <p v-if="ynamic_num[index]/3>26.5" class="pt_15 f_bold"
                      @click="onFlag(ynamicArray[index],index,ynamicArray)">
                      {{ynamicArray[index]?'阅读全文':'收起'}}
                      <x-icon type="ios-arrow-down" size="16"></x-icon>
                    </p>

                  </div>
                  <!-- <div class="sp" id="sp" v-if="item.ContractInfo" @click="oooofa(item.ContractInfo)">
                      <div class="box c-r">
                        <div class="top">
                          <a  class="btn">多20倍</a>
                          <p class="f32 c333 fb">{{item.ContractInfo.Currency}}</p>
                          <i>平</i>
                        </div>
                        <div class="li">
                          <div class="libox">
                            <p class="f34 c333">5.555</p>
                            <p class="f34 c333 ">20.62%</p>
                            <p class="f34 c333 ">买入</p>
                          </div>
                          <div class="libox mt10">
                            <p class="f24 c999">均</p>
                            <p class="f24 c999">持仓量</p>
                            <p class="f24 c999">方向</p>
                          </div>
                         
                        </div>
                        <div class="li2">
                            <p class="f24 c999">20-2065052</p>
                            <p class="btn f36 c333">实盘分享</p>
                        </div>
                      </div>
                  </div> -->
                  <div class="sp" id="sp" v-if="item.ContractInfo" @click="gocommentDetail(item.ThemeID)">
                      <div class="box c-r">
                        <div class="top">
                          <a  class="btn">{{item.ContractInfo.Type}} {{item.ContractInfo.Multiple}} 倍</a>
                          <p class="f32 c333 fb">{{item.ContractInfo.Name}}</p>
                          <i>合约</i>
                        </div>
                        <div class="li">
                          <div class="libox">
                            <p class="f34 c333">{{item.ContractInfo.TransactionPrice}}</p>
                            <p class="f34 c333 ">{{item.ContractInfo.TransactionNum}}%</p>
                            <p class="f34 c333 " :class="[item.ContractInfo.Direction=='卖出平空'?'c-g':'c-r']">{{item.ContractInfo.Direction}}</p>
                          </div>
                          <div class="libox mt10">
                            <p class="f24 c999">均</p>
                            <p class="f24 c999">持仓量</p>
                            <p class="f24 c999">方向</p>
                          </div>
                         
                        </div>
                        <div class="li2">
                            <p class="f24 c999">{{item.ContractInfo.CreateTime}}</p>
                            <p class="btn f36 c333">实盘操作分享</p>
                        </div>
                      </div>
                  </div>
                   <div class="sp" id="sp" v-if="item.StockInfo" @click="gocommentDetail(item.ThemeID)">
                      <div class="box c-r">
                        <div class="top">
                          <!-- <a  class="btn">多{{item.StockInfo.Multiple}}倍</a> -->
                          <p class="f32 c333 fb">{{item.StockInfo.Name}}-{{item.StockInfo.Currency}}</p>
                          <i>现货</i>
                        </div>
                        <div class="li">
                          <div class="libox">
                            <p class="f34 c333">{{item.StockInfo.TransactionPrice}}</p>
                            <p class="f34 c333 ">{{item.StockInfo.TransactionNum}}%</p>
                            <p class="f34 c333" :class="[item.StockInfo.Type=='卖出'?'c-g':'c-r']">{{item.StockInfo.Type}}</p>
                          </div>
                          <div class="libox mt10">
                            <p class="f24 c999">均</p>
                            <p class="f24 c999">持仓量</p>
                            <p class="f24 c999">方向</p>
                          </div>
                         
                        </div>
                        <div class="li2">
                            <p class="f24 c999">{{item.StockInfo.CreateTime}}</p>
                            <p class="btn f36 c333">实盘操作分享</p>
                        </div>
                      </div>
                  </div>


                </div>
                <!-- 评论 -->
                <div class="pinlun">
                  <p v-for="(pop,i) in item.CommentList.slice(0,5)" :key="i">
                    <span>{{pop.NickName}}：</span>
                    {{pop.Content}}
                  </p>

                  <p v-if="item.CommentList==''">暂无评论</p>
                  <div v-else>
                    <p v-if="item.CommentList.length>5" class="f12">查看更多评论></p>
                    <p v-if="item.CommentList.length>=0&&item.CommentList.length<=5">暂无更多评论</p>
                  </div>
                </div>

                <!-- 4个点击按钮 -->
                <div class="clicklist">
                  <div @click="gocommentDetail(item.ThemeID)">
                    <img src="../../common/image/icon_pl.png" alt srcset />
                    {{item.CommentQuantity}}
                  </div>
                  <div @click="onLike(item.IsLike,item.ThemeID)">
                    <img v-if="item.IsLike=='0'" src="../../common/image/icon_dz_normal.png" alt srcset />

                    <img v-else src="../../common/image/icon_dz_press.png" alt srcset />
                    {{item.LikeTimes}}
                  </div>
                  <div @click="goshareKX(item.ThemeID)">
                    <img src="../../common/image/icon_fx.png" alt srcset />
                  </div>
                  <!-- <div v-if="UserID==SearchUserID" @click="onFlag(MoreArray[index],index,MoreArray)"> -->
                  <div v-if="UserID==SearchUserID" @click="onFlag(index)">
                    <img src="../../common/image/icon_gd_qz.png" alt srcset />
                  </div>
                   <div v-if="ismarkshow" class="marktop" @click="close03(index)">

                   </div>
                  <div  v-show="MoreArray[index]" class="f14">
                    <div  @click="goToup(item.ThemeID)">
                      <img src="../../common/image/icon_zd_gd.png" alt srcset />
                      <span>{{item.Top=='0'?'置顶':'取消置顶'}}</span>
                    </div>
                    <div @click="delectTheme(item.ThemeID)">
                      <img src="../../common/image/icon_sc.png" alt srcset />
                      <span>删除</span>
                    </div>
                  </div>
                   
                </div>
              </div>
            </div>
            <div id="warp" v-if="active!=0" :class="[active==1?'active1':'']"></div>
          </main>
        </div>
      </mescroll-vue>

      <div ref="ref3" class="pageId" :class="[searchBarFixed?'flexbox':'']">
        <div class="header">
          <img src="../../common/images/dhl_icon_jt.png" alt="" @click="appGoback()" class="img1">
          <h3>{{Userinfo.NickName}}</h3>
          <img src="../../image/dhl_icon_fxan_b.png" alt="" @click="goshareIndex()" class="img2">
        </div>
        <div>
          <div v-for="(item,index) in tab" :key="index" @click="onTab(index)">
            <span class="f15" :class="active==index?'mainColor':''">{{item}}</span>
            <i v-if="active==index"></i>
          </div>
        </div>
      </div>

      <div class="pop" v-if="ispop">
        <img src="../../image/tc_icon_gb .png" alt class="close" @click="close()" />
        <div class="head">
          <h3 class="f32 c333 fb">分享实盘到广场</h3>
          <i class="btn" @click="goshareSPGC(poplist.ID)">发布</i>
        </div>
        <div class="f28 c333 mt30">
          #在[ {{poplist.Code}} ]以均价 [ {{poplist.Price}} ] [
          <span v-if="poplist.Type=='买入开多'">买入</span>
          <span v-if="poplist.Type!='买入开多'">卖出</span>
          ] [ {{poplist.TransactionNum}}枚 ]#
        </div>
        <textarea v-model="Contenttext" class="f28 c999 mt20" placeholder="写几句想跟大家说的的话吧，100字以内。"
          maxlength="100"></textarea>
      </div>
      <div class="mark" v-if="ispop"></div>

      <div class="fot" v-if="active==1 && RealList != '' && UserID!=SearchUserID">
        <div class="btn" v-if="data2.IsSubscribed==2" @click="goexplain()">订阅实盘</div>
        <div class="btn" v-if="data2.IsSubscribed==1" @click="unsubscribe()">取消订阅</div>

      </div>
    </div>

  
  </div>
</template>

<script>
import tj_myCard from 'library/myCard/index.vue';
  import MescrollVue from "../../components/mescroll-uni/mescroll-body.vue";
  export default {
    components: {
      MescrollVue,
      tj_myCard
    },
    data() {
      return {
        dynamicTxt: [{
            num: 0,
            txt: "粉丝",
            name: "Biz_fans"
          },
          {
            num: 0,
            txt: "关注",
            name: "Biz_focus"
          },
          {
            num: 0,
            txt: "入驻",
            name: "Biz_enter"
          },
          {
            num: 0,
            txt: "动态",
            name: "dynamic"
          }
        ],
        imageSrc: require("../../common/image/img_beijing_zc.png"),
        getBarWidth: function (index) {
          return 44 + "px";
        },
        tab: ["公告", "活动"],
        active: 0,
        mescroll: null,
        mescrollDown: {},
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: 10
          },
          noMoreSize: 3,
          htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>',

          empty: {
            warpId: "warp",
            icon: '',
            tip: ''
          },
          htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
          htmlNodata: '<p class="upwarp-nodata">-- 我是有底线的 --</p>'
        },
        communityList: [],
        ynamic_num: [],
        Userinfo: {},
        ynamicArray: [],
        MoreArray: [],

        gradient: [
          [0, "#5163F3"],
          [0.5, "#B2BCFF"],
          [1, "#5163F3"]
        ],
        tag: {
          position: [2017, 30.12],
          content: "30.12",
          direct: "tl",
          offsetY: -5,
          background: {
            fill: "#8659AF"
          },
          pointStyle: {
            fill: "#8659AF"
          }
        },
        ZXdata: [{
          time: "2016-08-01",
          tem: 10
        }],
        data: [], //策略-合约 策略-现货  的信息
        EndList: [], //历史策略列表
        RealList: [], //接入的实盘列表
        type3: "1", //折线图切换
        isboxtype: "1", //现货1还是合约2 
        istype2: "2", // tab栏切换   现货1还是合约2   右上角分享主页传的type
        ispop: false,

        tabtype: 0, // 实盘tab选择
        istype3: 1, // 实盘-合约2   实盘-现货1
        data2: [], //实盘的信息
        SpaceLogList: [], //最新操作的列表
        page: "0",
        left: [],
        right: [],
        ExchangeUserID: "",

        tabOffsetTop: 0,
        scrollTop: 0,
        searchBarFixed: false,
        searchBarFixed2: false,
        poplist: [], //弹框分享仓位的信息
        Contenttext: "", //用户输入的信息
        istip: true,

        // Token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzU1NDYyNzE1NiIsImV4cCI6MTU5MDk3ODUyNCwiaWF0IjoxNTkwMzczNzI0fQ.tixTvwEt0AWtuarSRNpdQ_ldxttjvtbEn2-dm6eS5viU_cUYt0jcYl7zgmvs6iUb37mFWWDVu0wQCjw1OAhx2g",
        // UserID: "29",
        Token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzMzMzMzMzMzMyIsImV4cCI6MTU5MTE1NTc0MSwiaWF0IjoxNTkwNTUwOTQxfQ.bjKceXrcgjPXL1BSvut6A4fGbG0gY79sgfab9IAOCjLUHQnH_bbDrTIQFm5SxgsQIyEkYzS4oolzaaLMfWQyzw",
        UserID:"31",
       
        ReleaseUserID: '7', //发布实盘者UserID
        PassiveUserID: "7",
        SearchUserID: "7", //要查询合约策略的UserID
        opacity: 'opacity:1',
        opacity2: 'opacity:0',
        RealListName:'' , //分享实盘传过去的实盘名称
        ismarkshow:false,
        cardData: [
					{
				        name:'闫志宏',
				        occupation:'视觉传达-UI设计师',
						type: '企业版',
						details: '展现企业文化',
						url: require('common/images/头像@2x.png'),
            icon: require('common/images/标签@2x.png'),
            icon2: require('common/images/dhl_icon_jt 3@2x.png'),
						
				        follows:[
				            { name:'关注',num:5835},
				             { name:'收藏',num:5835},
				              { name:'粉丝',num:5835}
						],
						address:'重庆',
            rate:1,
            introduce:'公司介绍',
            Appointment:'产品经理'
					}
				],
      };
    },

    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     vm.$refs.mescroll.beforeRouteEnter();
    //   });
    // },
    // beforeRouteLeave(to, from, next) {
    //   this.$refs.mescroll.beforeRouteLeave();
    //   next();
    // },
    created() {
      // 本地测试用
      // sessionStorage.setItem("Token", this.Token);
      // sessionStorage.setItem("UserID", this.UserID);
      // this.getUserdata();
      // this.getSPlist();
    },
    mounted() {
      this.getUserinfo();


      window.addEventListener("scroll", this.handleScroll, true);
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll, true);
    },
    activated() {},
    methods: {
      onLike(like, ThemeID) {
        let that = this;

        HBJ.HBJRequest.ajaxService(
          q.Qapi + "/theme/like", {
            UserID: that.UserID,
            Token: that.Token,
            ThemeID,
            Type: parseInt(like) + 1 + ""
          },
          function (res) {
            if (res.code === "10000") {
              that.mescroll.showUpScroll();
              that.mescroll.resetUpScroll(false);
            } else {
              that.$vux.toast.text(res.message);
            }
          },
          function (err) {
            that.$vux.toast.text(res.message);
          }
        );
      },
      delectTheme(ThemeID) {
        let that = this;
         this.$vux.confirm.show({
          title: "确定删除这条动态吗？",
          // 组件除show外的属性
          onCancel() {

            console.log("点了取消");
          },
          onConfirm() {
            console.log("点了确定");
            HBJ.HBJRequest.ajaxService(
              q.Qapi + "/theme/delect", {
                UserID: that.UserID,
                Token: that.Token,
                ThemeID
              },
              function (res) {
                if (res.code === "10000") {
                  that.$vux.toast.show("删除成功");
                  that.mescroll.showUpScroll();
                  that.mescroll.resetUpScroll(false);
                } else {
                  that.$vux.toast.text(res.message);
                }
              },
              function (err) {
                that.$vux.toast.text(res.message);
              }
            );


          }
        })

        
      },
      onFlag(index) {
        this.ismarkshow=true;
        let arr=this.MoreArray;
        console.log(index,arr);
        arr[index]=true;
        this.MoreArray=arr;


        
        // let that = this;
        // let newArray = array;
        // newArray.splice(
        //   newArray.findIndex((item, index) => index === i),
        //   1
        // );
        // newArray.splice(i, 0, !flag);
        // array = newArray;
      },
      // 关闭3个点的弹框
      close03(index){
        console.log(index);
        
        let arr=this.MoreArray;
        for(let i=0;i<arr.length;i++){
          arr[i]=false;
        }
        console.log(this.MoreArray);
       
       
        this.MoreArray=arr;
        // this.MoreArray.push(false);
        this.ismarkshow=false;
      },
      getAttention() {
        let that = this;

        HBJ.HBJRequest.ajaxService(
          q.Qapi + "/community/attention", {
            UserID: that.UserID,
            Token: that.Token,
            FollowerUserID: that.Userinfo.UserID,
            Type: parseInt(that.Userinfo.IsAttention) + 1 + ""
          },
          function (res) {
            if (res.code === "10000") {
              that.getUserdata();
            } else {
              that.$vux.toast.text(res.message);
            }
          },
          function (err) {
            that.$vux.toast.text(res.message);
          }
        );
      },
      getApply() {
        let that = this;
        if (that.Userinfo.IsFriend == "1") {
          HBJ.HBJRequest.ajaxService(
            q.Qapi + "/h5/apply", {
              UserID: that.UserID,
              Token: that.Token,
              UID: that.Userinfo.UID
            },
            function (res) {
              if (res.code === "10000") {
                that.$vux.toast.text("已添加，等待对方通过！", "middle");
                that.getUserdata();
              } else {
                that.$vux.toast.text(res.message);
              }
            },
            function (err) {
              that.$vux.toast.text(res.message);
            }
          );
        }
      },
      getUserdata() {
        let that = this;
        // HBJ.HBJRequest.ajaxService(
        //   q.Qapi + "/h5/getUserInfo", {
        //     UserID: that.UserID,
        //     Token: that.Token,
        //     PassiveUserID: that.PassiveUserID
        //   },
        //   function (res) {
        //     if (res.code === "10000") {
        //       that.Userinfo = res.result;
        //       that.dynamicTxt[0].num = that.Userinfo.FanQuantity;
        //       that.dynamicTxt[1].num = that.Userinfo.AttentionQuantity;
        //       that.dynamicTxt[2].num = that.Userinfo.SettledDays;
        //       that.dynamicTxt[3].num = that.Userinfo.ThemeQuantity;
            
              
        //     } else {
        //       that.$vux.toast.text(res.message);
        //     }
        //   },
        //   function (err) {
        //     that.$vux.toast.text(res.message);
        //   }
        // );
      },
      mescrollInit(mescroll) {
        this.mescroll = mescroll;
      },
      onTab(i) {
        this.mescroll.removeEmpty();
        this.active = i;
        this.tabtype = 0;
        this.istip = false;
        this.opacity = 'opacity:1';
        this.opacity2 = 'opacity:0';
        this.searchBarFixed = false;
        this.searchBarFixed2 = false;

        if (this.active == 1) {
          this.mescrollUp.empty = {
            // warpId: "warp",
            // icon: require("@/image/grzy_img_wushipan.png"),
            // tip: "Ta还没有接入任何实盘"
          }
        } else if (this.active == 2) {
          this.mescrollUp.empty = {
            warpId: "warp",
            icon: require("../../common/image/img_wdt.png"),
            tip: "Ta说沉默是金"
          }
        } else {
          this.mescrollUp.empty = {}
        }


        setTimeout(() => {
          this.istip = true;
        }, 1000);
        this.mescroll.showUpScroll();
        this.mescroll.resetUpScroll(false);
      },
      upCallback(page) {
        let that = this;
        // that.$vux.toast.text("下拉了");
        setTimeout(() => {
          var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
          var pageSize = page.size; // 页长, 默认每页10条
          that.page = pageNum;
          that.getUserdata();
          if (that.active == 0) {
            that.getData1(pageNum);
          } else if (that.active == 1) {
            that.tipclixk();
          } else if (that.active == 2) {
            that.getCommunityList(pageNum);
          }
        }, 1000);
      },
      getCommunityList(pageNum) {
        let that = this;
        that.ynamic_num = [];
        // HBJ.HBJRequest.ajaxService(
        //   q.Qapi + "/h5/communityList", {
        //     page: pageNum,
        //     UserID: that.UserID,
        //     Token: that.Token,
        //     SearchUserID: that.SearchUserID
        //   },
        //   function (res) {
        //     if (res.code === "10000") {
        //       if (pageNum == 1) {
        //         that.communityList = [];
        //         that.ynamicArray = [];
        //         that.MoreArray = [];
        //       }
        //       that.communityList = that.communityList.concat(res.result.list);
        //       that.total = res.result.total;
        //       that.mescroll.endByPage(
        //         that.communityList.length,
        //         Math.ceil(parseInt(that.total) / 10)
        //       );

        //       that.$nextTick(() => {
        //         that.communityList.forEach((element, index) => {
        //           if(element.Type!=2){
        //              that.ynamic_num.push(
        //               document.querySelector(".dynamic_Content" + index).offsetHeight
        //             );
        //             that.ynamicArray.push(true);
        //             that.MoreArray.push(false);
        //           }
                 
        //         });
        //       });
        //     } else {
        //       that.$vux.toast.text(res.message);
        //     }
        //   },
        //   function (err) {
        //     that.$vux.toast.text(res.message);
        //   }
        // );
      },

      // 策略 && 实盘
      tab2(i) {
        this.istype2 = i;
        this.getData1(1);
        // 请求数据接口
      },
      tab3(e) {
        this.type3 = e;
        if (this.type3 == 1) {
          this.ZXdata = this.left;
        } else {
          this.ZXdata = this.right;
        }
      },

      // 打开实盘分享
      open(item) {
        this.ispop = true;
        this.poplist = item;
      },
      close() {
        this.ispop = false;
        this.Contenttext = "";
      },



      //策略-合约 数据
      getData1(pageNum) {
        let url = "";
        let parmas = {
          UserID: this.UserID,
          Token: this.Token,
          SearchUserID: this.SearchUserID,
          page: pageNum
        };
        if (pageNum == 1) {
          this.data = [];
          this.EndList = [];
        }
        if (this.istype2 == "1") {
          // 现货
          url = q.Qapi + "/h5/getStrategySpotByPerson";
        } else {
          // 合约
          url = q.Qapi + "/h5/getStrategyByPerson";
        }

        // HBJ.HBJRequest.ajaxService(
        //   url,
        //   parmas,
        //   res => {
        //     console.log(res, 'oooo');
        //     if (res.code === "10000") {
        //       this.data = res.result;
        //       this.EndList = this.EndList.concat(res.result.EndList);
        //       console.log(this.EndList ,6666);
              
        //       this.total = res.result.EndListNum;
        //       this.mescroll.endByPage(
        //         this.EndList.length,
        //         Math.ceil(parseInt(this.total) / 10)
        //       );
        //     } else {
        //       this.$vux.toast.text(res.message);
        //     }
        //   },
        //   err => {
        //     console.log(err);
        //     this.$vux.toast.text(err.message, "middle");
        //   }
        // );
      },
      // 海报分享-策略集合
      goCLJH(type) {
        var BestList=JSON.stringify(this.data.BestList);
        var RunList=JSON.stringify(this.data.RunList);
        var Userinfo=JSON.stringify(this.Userinfo);
        var EarningRateByThirtyDay=this.data.EarningRateByThirtyDay;
        this.$router.push({
          path: "/shareCLJH",
          query: {
            type: type,
            BestList:BestList,
            RunList:RunList,
            Userinfo:Userinfo,
            EarningRateByThirtyDay:EarningRateByThirtyDay,
          }
        });
      },
      // 跳转 历史仓位
      gobinList() {
        this.$router.push({
          path: "/binList",
          query: {
            ExchangeUserID: this.ExchangeUserID
          }
        });
      },
      // 跳转 单个仓位
      gobinDetail(id) {
        this.$router.push({
          path: "/binDetail",
          query: {
            SpaceID: id
          }
        });
      },
      // 我接入的实盘列表
      getSPlist() {
        let url = '';
        let parmas = {



        };
        console.log(this.UserID, this.PassiveUserID);

        if (this.UserID == this.PassiveUserID) {
          url = q.Qapi + "/realtimemarket/getRealtimemarketList";
          parmas = {
            UserID: this.UserID,
            Token: this.Token
          };
        } else {
          url = q.Qapi + "/realtimemarket/getRealtimemarketListByUser";
          parmas = {
            UserID: this.UserID,
            Token: this.Token,
            ReleaseUserID: this.PassiveUserID
          };
        }
        // HBJ.HBJRequest.ajaxService(
        //   url,
        //   parmas,
        //   res => {
        //     console.log(res);
        //     if (res.code === "10000") {
        //       this.RealList = res.result.List;
        //       // this.RealList = [];

        //       if (this.RealList == "") {
        //         this.isRealList = false;
        //       } else {
        //         this.isRealList = true;
        //       }
        //       // this.istype3 = res.result.istype4;
        //     } else {
        //       this.$vux.toast.text(res.message);
        //     }
        //   },
        //   err => {
        //     console.log(err);
        //     this.$vux.toast.text(err.message, "middle");
        //   }
        // );
      },
      tipclixk(index, id, type) {
        console.log(this.istype3, "istype3");
        console.log(type, "type");
        console.log(this.RealList);
        if (this.istip) {} else {
          return;
        }
        if (this.RealList == "") {
          // 如果实盘没有数据，关闭刷新转圈圈
          this.SpaceLogList = [];
          this.total = 0;
          this.mescroll.endBySize(this.SpaceLogList.length, this.total);
          this.mescroll.endByPage(
            this.SpaceLogList.length,
            Math.ceil(parseInt(this.total) / 10)
          );
          return;
        }

        this.istip = false;
        let ExchangeUserID = id;
        this.ExchangeUserID = id;
        this.istype3 = type;
        // 右上角分享传的type
        this.tiptype = type;

        if ((index == "" || index == undefined) && this.RealList != "") {
          console.log(this.RealList,6666);
          this.istype3 = this.RealList[0].Type;
          index = 0;
          ExchangeUserID = this.RealList[0].ExchangeUserID;
          this.ExchangeUserID = this.RealList[0].ExchangeUserID;
          this.RealListName=this.RealList[0].Name;

           console.log(this.istype3, "istype3");
    
        }
        this.tabtype = index;
        let url = "";
        let parmas = {
          UserID: this.UserID,
          Token: this.Token,
          ExchangeUserID: this.ExchangeUserID,
          page: this.page
        };
        console.log(this.istype3, "istype3");

        if (this.istype3 == "2") {
          url = q.Qapi + "/h5/realtimemarketContractOverview";
        } else {
          url = q.Qapi + "/h5/realtimemarketSpotOverview";
        }
        console.log(parmas);

        // HBJ.HBJRequest.ajaxService(
        //   url,
        //   parmas,
        //   res => {
        //     console.log(res);
        //     if (res.code === "10000") {
        //       this.istip = true;
        //       this.data2 = res.result;

        //       this.SpaceLogList = this.SpaceLogList.concat(
        //         res.result.SpaceLogList
        //       );
        //       this.total = res.result.SpaceLogListNum;
        //       this.mescroll.endBySize(this.SpaceLogList.length, this.total);

        //       let DaliyIncomeList = res.result.DaliyIncomeList;
        //       let lefts = [];
        //       let rigs = [];
        //       for (let i = 0; i < DaliyIncomeList.length; i++) {
        //         let datas = {};
        //         let datas2 = {};
        //         datas.time = DaliyIncomeList[i].Date;
        //         datas.tem = Number(DaliyIncomeList[i].IncomeRate);
        //         // datas.age=i;
        //         // datas.year=2000+Number(i);
        //         datas2.time = DaliyIncomeList[i].Date;
        //         datas2.tem = Number(DaliyIncomeList[i].CumulativeDailyIncome);
        //         lefts.push(datas);
        //         rigs.push(datas2);
        //         this.left = lefts;
        //         this.right = rigs;
        //       }
        //       if (this.type == 1) {
        //         this.ZXdata = this.left;
        //       } else {
        //         this.ZXdata = this.right;
        //       }
        //     } else {
        //       this.istip = true;
        //       this.$vux.toast.text(res.message);
        //     }
        //     console.log(this.data2);
        //   },
        //   err => {
        //     this.istip = true;
        //     console.log(err);
        //     this.$vux.toast.text(err.message, "middle");
        //   }
        // );
      },

      // 上拉吸顶效果
      handleScroll() {

        let ref = this.$refs.ref1;
        let ref2 = this.$refs.ref2;
        let ref4 = this.$refs.ref4;
        let offsetTop = ref.getBoundingClientRect().top;
        let offsetTop2 = ref2.getBoundingClientRect().top;
        let height = ref.offsetHeight;
        let height4 = ref4.offsetHeight;
  
        let opacity = (offsetTop - height4 - 100) / 100;

        let cha = (offsetTop - height4 - 280);
        if (cha <= 0) {
          cha = 1
        }
console.log(opacity);
        let opacity2 = 1 / cha;
        if (opacity2 <= 0.1) {
          opacity2 = 0
        }
        console.log((offsetTop-height4-100));
        console.log("offsetTop2:" + offsetTop2);
        this.opacity = "opacity:" + opacity;
        this.opacity2 = "opacity:" + opacity2;
        if (offsetTop2 < 380) {
          this.searchBarFixed2 = true;
        } else {
          this.searchBarFixed2 = false;
        }

        if (offsetTop <= height4) {
          this.searchBarFixed = true;
        } else {
          this.searchBarFixed = false;

        }

      },
      // 跳转评论详情
      gocommentDetail(id) {
        // this.$vux.toast.text("跳转到策略详情ID=" + id);
        // HBJJSBridge.callAPPHandler('Biz_commentDetail', {
        //   ThemeID: id
        // }, function (data) {

        // });
      },
      // 跳转策略详情
      goCLdetail(id1,id2) {
        let that=this;
        console.log(id1,id2);
        let id ='';
        if(id1){
          id=id1
        }else{
          id=id2
        }

        // that.$vux.toast.text("type:"+that.istype2);
        // return
        HBJJSBridge.callAPPHandler('Biz_CLdetail', {
          StrategyContractID: id,
          istype: that.istype2
        }, function (data) {

        });
      },
      // 添加策略
      addCL() {
        // this.$vux.toast.text("跳转到添加策略");
        // HBJJSBridge.callAPPHandler('Biz_CLadd', {
        //   istype: this.istype3
        // }, function (data) {

        // });
      },
    
      // 海报分享-实盘
      goshareSP() {
         var data=JSON.stringify(this.data2);
         var ZXdata=JSON.stringify(this.ZXdata);
         var AvatarUrl=this.Userinfo.AvatarUrl;
         var NickName=this.Userinfo.NickName;
        this.$router.push({
          path: "shareSP",
          query: {
            data: data,
            ZXdata: ZXdata,
            AvatarUrl: AvatarUrl,
            RealListName: this.RealListName,
            NickName: NickName,
          }
        });
      },
      // 动态分享
      goshareKX(ThemeID) {
        this.$router.push({
          path: "shareKX",
          query: {
            type: 2,
            ThemeID: ThemeID
          }
        });
      },
      // 海报分享-主页
      goshareIndex() {
        this.$router.push({
          path: "shareIndex",
          query: {
            tiptype: this.istype2,
            ReleaseUserID: this.ReleaseUserID,
          }
        });
      },
    
      // 取消订阅
      unsubscribe() {
        let that =this;
        that.$vux.confirm.show({
          title: "确定取消订阅吗？",
          // 组件除show外的属性
          onCancel() {

            console.log("点了取消");
          },
          onConfirm() {
            console.log("点了确定");
            let url = q.Qapi + "/realtimemarket/unSubscriptionRealtimeMarket";
            let parmas = {
              UserID: that.UserID,
              Token: that.Token,
              ReleaseUserID: that.ReleaseUserID,
            };
            // HBJ.HBJRequest.ajaxService(url, parmas, res => {
            //     console.log(res);
            //     if (res.code === "10000") {
            //        that.$vux.toast.show({
            //         text: '取消成功'
            //         })
            //           setTimeout(()=>{
            //           that.tipclixk()
            //         },300)
                  
            //     } else {
            //       that.$vux.toast.text(res.message);
            //     }
            //   },
            //   err => {
            //     console.log(err);
            //     that.$vux.toast.text(err.message, "middle");
            //   }
            // );


          }
        })
      },
      goshareSPGC(id) {
        if (this.Contenttext == "") {
          this.$vux.toast.text("请输入发布的内容");
          return;
        }

        let url = "";
        let parmas = {};
        if (this.istype3 == "1") {
          // 现货
          url = q.Qapi + "/h5/shareRealtimeMarketToSquare";
          parmas = {
            UserID: this.UserID,
            Token: this.Token,
            ExchangeUserCurrencyRecordID: id,
            Content: this.Contenttext
          };
        } else {
          // 合约
          url = q.Qapi + "/h5/shareRealtimeMarketContractToSquare";
          parmas = {
            UserID: this.UserID,
            Token: this.Token,
            ExchangeSpaceRecordID: id,
            Content: this.Contenttext
          };
        }
        console.log(parmas);

        // HBJ.HBJRequest.ajaxService(
        //   url,
        //   parmas,
        //   res => {
        //     console.log(res);
        //     if (res.code == 10000) {
        //       this.$vux.toast.show({
        //         text: "发布成功"
        //       });
        //       this.close();
        //     }
        //   },
        //   err => {
        //     console.log(err);
        //     this.$vux.toast.text(err.message, "middle");
        //   }
        // );
      },

      //APP联调
      initJSAPI() {
        let that = this;
        // HBJJSBridge.registerJSHandler(
        //   "initCompleteNotice",
        //   that.initCompleteNotice
        // );

        // alert("JSAPI注册完成:" + typeof HBJJSBridge.registerJSHandler);
      },
      initCompleteNotice() {
        alert("initCompleteNotice方法调取");
        this.getUserinfo();
      },
      getUserinfo() {
        let that = this;
        // HBJJSBridge.callAPPHandler("Biz_userInfo", {}, function (data) {
        //   //           alert("获取用户信息2:" + data);
        //   //           console.log("获取用户信息2:" + data);

        //   let userInfo = JSON.parse(data);
        //   sessionStorage.setItem("Token", userInfo.Token);
        //   sessionStorage.setItem("UserID", userInfo.UserID);
        //   that.Token = userInfo.Token;
        //   that.UserID = userInfo.UserID;
        //   that.active = userInfo.active;
        //   that.isType2 = userInfo.IsType2;
        //   that.PassiveUserID = userInfo.PassiveUserID;
        //   that.SearchUserID = userInfo.PassiveUserID;
        //   that.ReleaseUserID = userInfo.PassiveUserID;


        //   // that.getUserdata();
        //   that.getSPlist();


        //   // 注册返回刷新页面的方法
        //   that.initupCallback();
          
        // });
      },
      appGoback() {
        // HBJJSBridge.callAPPHandler("Win_Back", {
        //   step: 1
        // }, function (data) {

        // });
      },

      // 点击事件调用APP方法
      goAppfun(name, parmas) {
        // HBJJSBridge.callAPPHandler(name, parmas, function (data) {

        // });
      },
      // 点击埋红包跳转
      goRedDetail(id) {
        // HBJJSBridge.callAPPHandler("Biz_RedDetail", {
        //   TaskId: id
        // }, function (data) {

        // });
      },
      // 点击领取红包
      goGetRed(id) {
        // HBJJSBridge.callAPPHandler("Biz_getRed", {
        //   TaskId: id
        // }, function (data) {

        // });
      },
      // 点击动态置顶
      goToup(id) {
        // HBJJSBridge.callAPPHandler("Biz_Stick", {
        //   ThemeID: id
        // }, function (data) {

        // });
      },
      // 点击订阅实盘
      goexplain() {
        let that =this;
        // 收费
        if(that.data2.ChargeType==2){
            // that.$router.push({
            //   path: "explain",
            //   query: {
            //     ReleaseUserID: that.ReleaseUserID,
            //   }
            // });
            // HBJJSBridge.callAPPHandler("Biz_goExplain", {
            //     ReleaseUserID: that.ReleaseUserID,
            // }, function (data) {

            // });

        }else{
          // 免费
          // that.$vux.confirm.show({
          //    title: "确定订阅吗？",
          //      onConfirm() {
          //       let url=q.Qapi + '/h5/subscriptionRealtimeMarket';
          //       let parmas = {
          //         UserID: that.UserID,
          //         Token:that.Token,
          //         ReleaseUserID: that.ReleaseUserID,
          //       };
          //       HBJ.HBJRequest.ajaxService(url,parmas,(res)=>{
          //         if(res.code==10000){
          //           that.$vux.toast.show({
          //             text: '订阅成功'
          //             })
          //               setTimeout(()=>{
          //                 that.tipclixk()
          //               },300)
          //         }

          //       },(err)=>{
          //           console.log(err);
          //           this.$vux.toast.text(err.message, 'middle')
          //       }
          //         );

          //      },
          //      onCancel() {},
          // })


            
        }
      },
      // 点击添加实盘
      goAddSP(id) {
        HBJJSBridge.callAPPHandler("Biz_addSP", {
         
        }, function (data) {

        });
      },
      
      // app调H5方法
      initupCallback() {
        let that = this;
        let page={
            num: 0,
            size: 10
          };
        HBJJSBridge.registerJSHandler(
          "upCallback",
          that.upCallback(page)
        );
      },
  oooofa(data){
    console.log(data);
    
  }

    }
  };

</script>



<style lang="scss">
  .mine-container {
    height: 100vh;
    color: #666;

    .mescroll {
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 99;
      height: auto;
      -webkit-overflow-scrolling: touch;
    }

    #warp {
      background: #f8f8f8;

      // padding-top: 60rpx;
      .mescroll-empty {
        width: 100%;
        padding-top: 15vh;
        text-align: center;

        .empty-tip {
          padding: 5vh 0 14vh;
          font-size: 14px;
          color: gray;
        }
      }
    }

    #warp.active1 {
      .mescroll-empty {
        padding-top: 5vh;
      }
    }

    .mine-main {
      padding-top: 128rpx;

      >div:nth-of-type(1) {

        position: relative;

        box-sizing: border-box;
        z-index: 5;
        
      }

      main {
        background: #fff;

        >div:nth-of-type(1) {
          width: 100%;

          >div {
            display: flex;
            padding: 0 31rpx;
            line-height: 94rpx;

            >div {
              position: relative;
              width: 82rpx;

              i {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 50rpx;
                height: 4rpx;
                background: #2658FF;
                border-radius: 1px;
              }
            }
          }
        }

        >.dynamic_list {
          width: 100%;
          background-color: #f8f8f8;
          overflow: hidden;
          padding-bottom: 20rpx;

          >div {
            margin-top: 20rpx;
            background-color: #fff;
            padding: 0 31rpx;
            overflow: hidden;

            >div:nth-of-type(1) {
              display: flex;
              margin: 40rpx 0 28rpx;

              >div:nth-of-type(1) {
                position: relative;

                width: 90rpx;
                height: 90rpx;

                img:nth-of-type(1) {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }

                img:nth-of-type(2) {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  width: 30rpx;
                  height: 30rpx;
                  border-radius: 50%;
                }
              }

              >div:nth-of-type(2) {
                p {
                  line-height: 42rpx;
                }

                >p:nth-last-child(1) {
                  color: #999;
                }
              }
            }

            >.type1 div:nth-of-type(1) {
              >p {
                font-size: 15px;
                line-height: 48rpx;
              }

              .dynamic_Content {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
              }

              >p:nth-of-type(2) {
                color: #7297f4;

                .vux-x-icon {
                  padding-top: 4rpx;
                  fill: #7297f4;
                }
              }

              .imglist {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;

                img {
                  display: block;
                  width: 200rpx;
                  height: 200rpx;
                  border-radius: 10rpx;
                  margin: 15rpx 14rpx;

                }
              }

              .mai {
                img {
                  display: block;
                  width: 180rpx;
                  height: 60rpx;
                  margin: 30rpx 0;
                }
              }
            }

            >.pinlun {
              margin-top: 50rpx;
              background: rgba(248, 248, 248, 1);
              box-sizing: border-box;
              padding: 22rpx;

              p {
                line-height: 54rpx;

                span {
                  color: #999;
                }
              }

              p:nth-last-of-type(1) {
                color: #f5b314;
              }
            }

            >.clicklist {
              position: relative;
              display: flex;
              justify-content: space-around;

              >div {
                line-height: 116rpx;

                img {
                  width: 36rpx;
                  height: 36rpx;
                  vertical-align: middle;
                }
              }

              >div:nth-last-of-type(1) {
                position: absolute;
                bottom: 88rpx;
                right: 0;
                padding: 0 20rpx;
                max-width: 220rpx;
                height: 196rpx;
                background: #fff;
                box-shadow: 0px 6rpx 16rpx 0px rgba(0, 0, 0, 0.15);
                border-radius: 10rpx;
                line-height: 98rpx;
                z-index: 999;
              }
              >div.marktop{
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: transparent;
                z-index: 99;
              }
            }

            .type2 {
              width: 100%;
              height: 170rpx;
              background: #F39800;
              border-radius: 10rpx;
              padding: 20rpx 60rpx;
              display: flex;
              justify-content: space-between;
              align-items: center;

              img {
                display: block;
                width: 103rpx;
                height: 128rpx;
              }

              h3 {
                width: 2px;
                height: 128rpx;
                background: #FAC80A;
              }

              div {
                width: 346rpx;
                height: 100%;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                align-items: center;

                p {
                  width: 100%;
                  font-size: 28rpx;
                  color: #fff;
                  text-align: center;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }

                .btn {
                  display: block;
                  width: 190rpx;
                  height: 66rpx;
                  line-height: 74rpx;
                  background: url('../../image/btnbg.png') no-repeat 100% 100%;
                  background-size: 100% 100%;
                  font-size: 24rpx;
                  color: #333;
                  text-align: center;
                }



              }
            }
            .type3{
              width: 100%;
              height:auto;
              border-radius: 8rpx;
              #sp{
                  .box{
                      width:690rpx;
                      height:340rpx;
                      background:rgba(255,255,255,1);
                      border:1px solid #eee;
                      border-radius:10rpx;
                      margin: 20rpx auto 0 auto;

                      .top{
                        width: 100%;
                        height: 94rpx;
                        border-bottom:1px solid #eee;
                        border-top-left-radius: 10rpx;
                        border-top-right-radius: 10rpx;
                        padding: 0 30rpx;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: #F4F4F4;
                        p{
                          flex-grow: 1;
                         
                        }
                        a{

                          display: block;
                          width:120rpx;
                          height:40rpx;
                          line-height:45rpx;
                          background:rgba(1,204,159,1);
                          border-radius:4rpx;
                          text-align: center;
                          color: #fff;
                          font-size: 24rpx;
                          margin: 0 15rpx 0 0;
                          border-radius: 6rpx;
                        }
                        i{

                          display: block;
                          width:80rpx;
                          height:40rpx;
                          line-height:45rpx;
                          background:#F5496F;
                          border-radius:4px;
                          text-align: center;
                          color: #fff;
                          font-size: 24rpx;
                        }
                      }

                      .li{
                        margin-top: 60rpx;
                        padding: 0 30rpx;
                        .libox{
                          display: flex;
                          justify-content: space-between;
                          p{
                            width: 33.3%;
                            text-align: center;
                             color:#333;
                          }
                          p.c-r{
                            color:#F5496F
                          }
                          p.c-g{
                            color:#01CC9F
                          }
                        }
                        .libox.mt10{
                          p{
                            color:#999;
                          }
                        }
                      }
                      .li2{
                         padding: 0 30rpx;
                        margin-top: 30rpx;
                        display: flex;
                          justify-content: space-between;
                          align-items: center;
                        p{
                          width: 50%;
                        }
                        p.btn{
                           width: 180rpx;
                           height: 44rpx;
                           line-height: 44rpx;
                           text-align: center;
                           font-size:  22rpx;
                           color:#F5B314;
                           border: 1px solid #FAC70A;
                           border-radius:6rpx ;

                        }
                      }
                    
                    }
                    // .box.c-g{
                       
                    //     .top{
                    //       border-bottom:1px solid #01CC9F;
                    //       background: #DFF7F2;
                    //     }
                    // }
                    // .box.c-r{
                       
                    //     .top{
                    //       border-bottom:1px solid #F5496F;
                    //       background: #F7DFE4;
                    //     }
                    //     a{
                    //       background: #F5496F;
                    //     }
                    // }

              }
            }
          }
        }
      }
    }
  }

  //  策略和实盘
  .tabs {
    padding: 0 30rpx;
    height: 88rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
    align-items: center;

    p {
      font-size: 28rpx;
      color: #666;
    }

    p.on {
      font-size: 28rpx;
      color: #333;
      font-weight: bold;
    }

    div {
      flex-grow: 1;
    }

    img {
      display: block;
      height: 34rpx;
      width: 34rpx;
      margin: 0;
    }
  }

  // 策略
  .main0 {
    width: 100vw;
    padding: 30rpx 30rpx 300rpx 30rpx;
    background: #f8f8f8;

    .clhy {
      .box {
        position: relative;
        width: 100%;
        height: auto;
        background: rgba(255, 255, 255, 1);
        border-radius: 10rpx;
        margin: 20rpx auto;
        padding: 0 30rpx 40rpx 30rpx;

        .top {
          width: 100%;
          height: 94rpx;
          border-bottom: 1px solid #eee;
          border-top-left-radius: 10rpx;
          border-top-right-radius: 10rpx;
          // padding: 0 30rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .libox {
          display: flex;
          justify-content: space-between;

          h3 {
            width: 33%;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          i {
            display: block;
            width: 33%;
            text-align: center;
          }

          h3.c-r {
            color: #f5496f;
          }
        }

        // 进行中
        .ul {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin-top: 20rpx;

          .clbox div {
            width: 100%;
            height: 200rpx;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: space-around;
          }

          // .clbox{
          //   border-bottom: 1px solid #eee;
          //     margin-bottom: 40rpx;
          //   padding-bottom: 50rpx;
          // }
          .clbox {
            width: 200rpx;
            height: 260rpx;
            border: 1px solid #ddd;
            margin: 0 5rpx;
            margin-top: 20rpx;
          }

          .clbox p {
            width: 100%;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            font-size: 28rpx;
            color: #333;
            border-bottom: 1px solid #ddd;
            background: #fdf3cd;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .clbox div img {
            width: 33rpx;
            height: 38rpx;
          }

          .clbox img {
            width: 100%;
            height: 100%;
          }

          .clbox b {
            width: 100%;
            text-align: center;
            font-size: 28rpx;
            color: #333;
          }

          .clbox h4 {
            width: 100%;
            text-align: center;
            font-size: 36rpx;
            color: #01cc9f;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .clbox h4.c-g {
            color: #f5496f;
          }

          .clbox h5 {
            width: 100%;
            text-align: center;
            font-size: 24rpx;
            color: #999;
            font-weight: normal;
          }

          .clbox.add {
            border: 1px dashed #ddd;
          }
        }

        // 最佳战绩
        .tab {
          width: 100%;
          height: 120rpx;
          display: flex;
          justify-content: space-between;
        }

        .tab>div {
          width: 33%;
          display: flex;
          align-items: center;
          align-content: center;
          flex-wrap: wrap;
        }

        .tab p {
          color: #333;
          font-size: 28rpx;
          font-weight: bold;
          width: 100%;
          text-align: left;
          display: block;
          overflow: hidden;
          white-space: nowrap;   
          text-overflow: ellipsis;
        }

        .tab i {
          color: #999;
          font-size: 24rpx;
          width: 100%;
          text-align: left;
          display: block;
          margin-top: 20rpx;
        }

        // 单策略
        .danbox {
          width: 630rpx;
          height: 260rpx;
          background: rgba(248, 248, 248, 1);
          border-radius: 10rpx;
          padding: 30rpx;
        }

        .midbox {
          display: flex;
          justify-content: space-between;
          margin-top: 30rpx;
        }

        .danbox .tit {
          color: #333;
          font-size: 28rpx;
          font-weight: bold;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .danbox .mid {
          width: 300rpx;
          text-align: center;
          height: 40rpx;

          color: #333;
          font-size: 32rpx;
          font-weight: bold;
          border-bottom: 1px dashed #eee;
        }

        .danbox .left,
        .danbox .rig {
          width: 35%;
          color: #999;
          font-size: 24rpx;
          p{
            width: 100%;
            overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
          }
          
        }

        .danbox .left p:nth-child(2) {
          color: #01cc9f;
          font-size: 28rpx;
          font-weight: bold;
        }

        .danbox .left p.c-g:nth-child(2) {
          color: #f5496f;
          font-size: 28rpx;
        }

        .danbox .rig p:nth-child(2) {
          color: #01cc9f;
          font-size: 28rpx;
          font-weight: bold;
        }

        .danbox p {
          line-height: 40rpx;
        }

        .danbox .bot {
          height: 40rpx;
          line-height: 40rpx;
          margin-top: 20rpx;
          display: flex;
          justify-content: space-between;
        }

        .danbox .bot i {
          color: #999;
          font-size: 24rpx;
        }

        .danbox .bot a {
          display: block;
          width: 120rpx;
          height: 40rpx;
          line-height: 40rpx;
          text-align: center;
          background: #fac80a;
          border-radius: 4rpx;
        }
      }

      .box::after {
        content: "";
        width: 6rpx;
        height: 30rpx;
        background: #2658FF;
        position: absolute;
        top: 32rpx;
        left: 0;
      }
    }

    // 合约
    .sp {

      // padding-bottom: 160rpx;
      .btnlist {
        display: flex;
        align-items: flex-start;
        align-content: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;

        .btn {
          width: 220rpx;
          height: 80rpx;
          line-height: 80rpx;
          text-align: center;
          font-size: 28rpx;
          color: #666;
          background: rgba(255, 255, 255, 1);
          border-radius: 10rpx;
          margin-top: 20rpx;
        }

        .btn.on {
          background: #f5c814;
          color: #fff;
        }
      }

      .btnlist:after {
        content: "";
        width: 220rpx;
      }

      .box {
        position: relative;
        width: 100%;
        height: auto;
        background: rgba(255, 255, 255, 1);
        border-radius: 10rpx;
        margin: 20rpx auto;
        padding: 0 30rpx 40rpx 30rpx;

        .top {
          width: 100%;
          height: 94rpx;
          border-bottom: 1px solid #eee;
          border-top-left-radius: 10rpx;
          border-top-right-radius: 10rpx;
          // padding-left: 30rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .btn {
            width: 100rpx;
            height: 100rpx;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              display: block;
              width: 34rpx;
              height: 34rpx;
            }
          }
        }
      }

      .box::after {
        content: "";
        width: 6rpx;
        height: 30rpx;
        background: #2658FF;
        position: absolute;
        top: 32rpx;
        left: 0;
      }

      .zican {
        display: flex;
        justify-content: space-between;
      }

      .zican>div {
        width: 50%;
        display: flex;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
      }

      .zican p {
        color: #999;
        font-size: 24rpx;

        width: 100%;
        text-align: left;
        display: block;
      }

      .zican i {
        color: #333;
        font-size: 48rpx;
        width: 100%;
        text-align: left;
        font-weight: bold;
        display: block;
        margin-top: 20rpx;
      }

      i.c-g {
        color: #01cc9f;
      }

      .libox {
        display: flex;
        justify-content: space-between;

        div {
          width: 33%;
          overflow: hidden;
        }

        p {
          color: #999;
          font-size: 24rpx;
          width: 100%;
          text-align: left;
          display: block;
        }

        i {
          color: #333;
          font-size: 28rpx;
          width: 100%;
          text-align: left;
          font-weight: bold;
          display: block;
          margin-top: 20rpx;
        }
      }

      .chart .tabs {
        width: 100%;
        height: 90rpx;

        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chart .tabs .tabbox {
        width: 250rpx;
      }

      .chart .btn {
        display: inline-block;
        width: 100rpx;
        font-size: 30rpx;
        color: #333;
      }

      .chart .btn.on {
        font-size: 30rpx;
        font-weight: bold;
      }

      .chart .tabs .rig {
        width: 100rpx;
      }

      .chart .tabs .rig p {
        font-size: 20rpx;
        color: #01cc9f;
      }

      .chart .tabs .rig p:last-child {
        color: #f5496f;
        margin-top: 10rpx;
      }

      .chartBox {
        display: flex;
        justify-content: center;
      }

      .chartBox>div {
        padding: 0 70rpx;
        display: flex;
        justify-content: center;
      }

      // 进行中
      .ul {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-top: 20rpx;

        .clbox div {
          width: 100%;
          height: 200rpx;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-content: space-around;
        }

        // .clbox{
        //   border-bottom: 1px solid #eee;
        //     margin-bottom: 40rpx;
        //   padding-bottom: 50rpx;
        // }
        .clbox {
          width: 200rpx;
          height: 260rpx;
          border: 1px solid #ddd;
          margin: 0 5rpx;
          margin-top: 20rpx;
        }

        .clbox p {
          width: 100%;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          font-size: 28rpx;
          color: #01cc9f;
          border-bottom: 1px solid #ddd;
          background: #dff7f2;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .clbox p.c-r {
          color: #f5496f;
        }

        .clbox div img {
          width: 33rpx;
          height: 38rpx;
        }

        .clbox img {
          width: 100%;
          height: 100%;
        }

        .clbox b {
          width: 100%;
          text-align: center;
          font-size: 24rpx;
          color: #333;
        }

        .clbox h4 {
          width: 100%;
          text-align: center;
          font-size: 36rpx;
          color: #01cc9f;
        }

        .clbox h4.c-r {
          color: #f5496f;
        }

        .clbox h5 {
          width: 100%;
          text-align: center;
          font-size: 18rpx;
          color: #999;
          font-weight: normal;
        }

        .clbox.add {
          border: 1px dashed #ddd;
        }
      }

      // 最新操作
      .list {
        .li {
          display: flex;
          justify-content: space-between;
          padding: 30rpx 0;

          .time {
            width: 120rpx;
          }

          .img {
            width: 20rpx;
            position: relative;

            img {
              width: 20rpx;
              height: 20rpx;
            }
          }

          .img::after {
            content: "";
            display: block;
            background: #fac80a;
            width: 2px;
            height: 205rpx;
            position: absolute;
            top: 20rpx;
            left: 50%;
            transform: translate(-50%, 0);
          }

          .con {
            width: 430rpx;
            height: 165rpx;

            .btn {
              display: block;
              width: 120rpx;
              height: 40rpx;
              line-height: 40rpx;
              text-align: center;
              font-size: 24rpx;
              color: #fff;
              background: rgba(1, 204, 159, 1);
              border-radius: 4rpx;
            }

            .btn.c-r {
              background: #01cc9f;
            }

            .btn.c-g {
              background: #f5496f;
            }

            .share {
              display: flex;
              justify-content: space-between;
              align-items: center;

              img {
                width: 40rpx;
                height: 40rpx;
              }
            }

            p {
              font-size: 24rpx;
              color: #333;
              margin-top: 30rpx;
              line-height: 40rpx;

              .c-o {
                color: #fac80a;
              }

              .c-r {
                color: #01cc9f;
              }

              .c-g {
                color: #f5496f;
              }
            }
          }
        }

        .li:last-child {
          .img::after {
            content: "";
            display: none;
            background: #fac80a;
            width: 2px;
            height: 205rpx;
            position: absolute;
            top: 20rpx;
            left: 50%;
            transform: translate(-50%, 0);
          }
        }
      }
    }
  }

  .nodata {
    width: 100%;
    text-align: center;
    margin: 57rpx 0 176rpx 0;
  }

  // 实盘分享
  .pop {
    width: 690rpx;
    height: 530rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
    padding: 40rpx 30rpx 30rpx 30rpx;
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;

      i {
        display: block;
        width: 100rpx;
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        color: #fff;
        font-size: 30rpx;
        background: #f5b514;
        border-radius: 10rpx;
      }
    }

    textarea {
      display: block;
      width: 100%;
      height: 300rpx;
      background: rgba(244, 244, 244, 1);
      padding: 30rpx;
      border: 0;
      border-radius: 20rpx;
    }

    .close {
      display: block;
      width: 48rpx;
      height: 48rpx;
      position: absolute;
      bottom: -100rpx;
      left: 50%;
      transform: translate(-50%, 0%);
    }
  }

  .mark {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    background: rgba(21, 23, 35, 0.5);
  }

  .cwhen {
    .li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 50rpx;

      h3 {
        width: 80rpx;
      }

      div {
        width: 300rpx;
      }

      p {
        width: 0;
        height: 20rpx;
        background: #fac80a;
        margin: 0 10rpx 0 20rpx;
      }

      span {
        margin: 0 10rpx;
      }
    }
  }

  .pageId.flexbox {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    background: #fff;
    display: block;
    transition: all 0.3s;
  }

  .pageId {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    display: none;
    background: #fff;

    >div {
      display: flex;
      padding: 0 31rpx;
      line-height: 106rpx;

      >div {
        position: relative;
        width: 82rpx;

        i {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50rpx;
          height: 4rpx;
          background: #2658FF;
          border-radius: 1px;
        }
      }
    }
  }

  .fot {
    width: 100%;
    height: 128rpx;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 899;

    .btn {
      width: 708rpx;
      height: 104rpx;
      line-height: 88rpx;
      background: url("../../image/tongyong_img_daands.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      font-size: 30rpx;
      color: #fff;
    }
  }

  .main0 .noData {
    img {
      width: 350rpx;
      height: 245rpx;
      margin: 50rpx auto;
      display: block;
    }

    h3 {
      text-align: center;
      font-size: 28rpx;
      color: #999;
      font-weight: normal;
    }
  }


  .header {
    width: 100%;
    height: 128rpx;
    padding: 40rpx 30rpx 0 30rpx;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 899;
    background: transparent;


    h3 {
      width: 100%;
      font-size: 30rpx;
      color: #333;
      font-weight: bold;
      text-align: center;
      line-height: 88rpx;
    }
  }


  .header .img1 {
    width: 64rpx;
    height: 64rpx;
    position: absolute;
    bottom: 12rpx;
    left: 10rpx;
    padding: 10rpx;
  }

  .header .img2 {
    width: 64rpx;
    height: 64rpx;
    position: absolute;
    bottom: 12rpx;
    right: 30rpx;
    padding: 10rpx;
  }

  .pageId .header {
    width: 100%;
    height: 128rpx;
    padding: 40rpx 30rpx 0 30rpx;
    background: #fff;
    position: relative;


  }

  .bgimg {
    display: block;
    width: 100vw;
    height: 390rpx;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0
  }

  .text_c .nowrap {
    padding: 0 30rpx;
  }

  .scrollView {
    // background: #f8f8f8;
  }

  // [v-cloak] {
  //   display: none !important;
  // }

  .listNull {
    padding: 30rpx 30rpx 350rpx 30rpx;
    background: #f8f8f8;

    img {
      display: block;
      width: 175rpx;
      height: 122rpx;
      margin: 0 auto;
    }

    h3 {
      font-size: 28rpx;
      color: #999;
      font-weight: normal;
      text-align: center;
      line-height: 88rpx;
    }
  }




  // 修改动态

</style>

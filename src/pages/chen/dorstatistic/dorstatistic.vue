<template>
  <div id="dorstatistic">
    <searchdomitory></searchdomitory>
    <div class="page__bd">
      <div class="weui-tab">
        <div class="weui-navbar" style="height: 44px;">
          <a class="weui-tabbar__item weui-bar__item_on" @click="getQue">
            <!-- <i class="icon-truck ordericon"></i> -->
            <p class="weui-tabbar__label">存货排行</p>
          </a>
          <a class="weui-tabbar__item" @click="getStatistic">
            <!-- <i class="icon-dropbox ordericon"></i> -->
            <p class="weui-tabbar__label">寝室销售统计</p>
          </a>
        </div>
      </div>
    </div>
    <div class="weui-panel__hd hd">{{dorname}}</div>
    <div class="weui-panel__bd" v-for="(item,index) in this.staData" :key="index">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <p class="weui-media-box__desc">{{item.userName}} Tel:{{item.userPhone}}</p>
          <p class="weui-media-box__desc">时间:{{upTimes[index]}}</p>

        </div>
        <div class="weui-media-box__ft">
          <p class="weui-media-box__desc">消费金额:￥{{item.groupConsume}}</p>
          <p class="weui-media-box__desc">寝室商品总额:￥{{item.groupAmount}}</p>
        </div>
      </div>
    </div>
    <div class="weui-form-preview__item" style="margin-top:10px;margin-left:10%">
      <a href="javascript:;" class="weui-btn weui-btn_default weui-btn_mini" @click="lastPage">上一页</a>
      <input type="number" class="weui-search-bar_input" style="display:inline-block;width:50px;height:18px;text-align: center" value="" v-model="page" @keyup.enter="gotoPages" />
      <a href="javascript:;" class="weui-btn weui-btn_default weui-btn_mini" @click="nextPage">下一页</a>
    </div>
  </div>
</template>

<script>
import searchdomitory from "../../../components/search/searchdomitory";
import axios from "axios";
import weui from "weui.js";
import $ from "jquery";
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
      token: "",
      staData: [],
      upTimes: [],
      page: 1,
      showFlag: false,
      showDor: false,
      dorname: "存货排行",
      sort: 0
    };
  },
  created() {
    this.token = this.getCookie("token");
    console.log(this.token);
    this.getQue();
    this.getStyle();

    //this.getStatistic();
  },
  mounted() {
    $(function() {
      $(".weui-tabbar__item").on("click", function() {
        $(this)
          .addClass("weui-bar__item_on")
          .siblings(".weui-bar__item_on")
          .removeClass("weui-bar__item_on");
      });
    });
  },
  methods: {
    gotoRep(item) {
      console.log(item);
      this.setCookie("groupNo", item.groupNo);
      //console.log(this.getCookie("groupNo"));
      this.$router.push({ name: "createTemplate" });
    },
    //缺货100间
    getQue() {
      var loading = weui.loading("加载中");
      this.showDor = !this.showDor;
      this.showFlag = !this.showFlag;
      this.dorname = "存货排行";
      this.sort = 0;
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/group/salesList?token=" +
            this.token +
            "&page=" +
            this.page
        )
        .then(res => {
          //console.log(res);
          this.staData = res.data.data.list;
          this.upTimes.splice(0, this.upTimes.length);
          for (let i = 0; i < this.staData.length; i++) {
            var _x = this.staData[i].updateTime;
            if (_x.toString().length === 10) {
              var date = new Date(_x * 1000);
            } else {
              var date = new Date(_x);
            }
            this.times(date);
          }
          console.log(this.staData);
          loading.hide();
          weui.toast("加载成功", {
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err);
          loading.hide();
          weui.toast("失败!!!", {
            duration: 1000
          });
        });
    },
    getShow() {
      this.showDor = true;
      this.showFlag = false;
    },
    getStyle() {
      this.showFlag = true;
      this.showDor = false;
    },
    //销售统计
    getStatistic() {
      var loading = weui.loading("加载中");
      this.showDor = !this.showDor;
      this.showFlag = !this.showFlag;
      this.dorname = "寝室销售统计";
      this.sort = 1;
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/group/salesList?token=" +
            this.token +
            "&orderField=groupConsume" +
            "&page=" +
            this.page
        )
        .then(res => {
          console.log(res);
          this.staData = res.data.data.list;
          this.upTimes.splice(0, this.upTimes.length);
          for (let i = 0; i < this.staData.length; i++) {
            var _x = this.staData[i].updateTime;
            if (_x.toString().length === 10) {
              var date = new Date(_x * 1000);
            } else {
              var date = new Date(_x);
            }
            this.times(date);
          }
          console.log(this.staData);
          loading.hide();
          weui.toast("加载成功", {
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err);
          loading.hide();
          weui.toast("失败!!!", {
            duration: 1000
          });
        });
    },
    times(date1) {
      var Y = date1.getFullYear();
      //console.log(Y);
      //console.log(dorTime);
      var M =
        date1.getMonth() + 1 < 0
          ? +(date1.getMonth() + 1)
          : date1.getMonth() + 1;
      //console.log(M);
      var D = date1.getDate();
      //console.log(D);
      var h = date1.getHours();
      //console.log(h);
      var m =
        date1.getMinutes() < 10 ? "0" + date1.getMinutes() : date1.getMinutes();
      //console.log(m);
      var s =
        date1.getSeconds() < 10 ? "0" + date1.getSeconds() : date1.getSeconds();
      //console.log(s);
      this.upTimes.push(Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s);
      //console.log(this.createsTime);
      //return this.createsTime;
    },
    gotoPages() {
      //console.log(this.content);
      console.log(this.page);
      if (this.sort === 1) {
        this.showFlag = true;
        this.showDor = false;
        axios
          .get(
            config.sellerUrl +
              "/sell/seller/group/salesList?token=" +
              this.token +
              "&orderField=groupConsume" +
              "&page=" +
              this.page
          )
          .then(res => {
            console.log(res);
            this.staData = res.data.data.list;
            if (this.staData.length === 0) {
              weui.topTips("请输入正确的页码!");
            } else {
              this.upTimes.splice(0, this.upTimes.length);
              for (let i = 0; i < this.staData.length; i++) {
                var _x = this.staData[i].updateTime;
                if (_x.toString().length === 10) {
                  var date = new Date(_x * 1000);
                } else {
                  var date = new Date(_x);
                }
                this.times(date);
              }
              console.log(this.staData);
            }
          })
          .catch(err => {
            weui.topTips("请输入正确的页码!");
            console.log(err);
          });
      } else if (this.sort === 0) {
        this.showFlag = false;
        this.showDor = true;
        axios
          .get(
            config.sellerUrl +
              "/sell/seller/group/salesList?token=" +
              this.token +
              "&page=" +
              this.page
          )
          .then(res => {
            console.log(res);
            this.staData = res.data.data.list;
            if (this.staData.length === 0) {
              weui.topTips("请输入正确的页码!");
            } else {
              this.upTimes.splice(0, this.upTimes.length);
              for (let i = 0; i < this.staData.length; i++) {
                var _x = this.staData[i].updateTime;
                if (_x.toString().length === 10) {
                  var date = new Date(_x * 1000);
                } else {
                  var date = new Date(_x);
                }
                this.times(date);
              }
            }
            console.log(this.staData);
          })
          .catch(err => {
            console.log(err);
          });
      }
      //this.getStatistic();
    },
    lastPage() {
      this.page -= 1;
      if (this.sort === 0) {
        this.showFlag = false;
        this.showDor = true;
        if (this.page === 0) {
          weui.alert("不能再翻啦~");
          this.page += 1;
        } else {
          this.getQue();
        }
      } else if (this.sort === 1) {
        this.showFlag = true;
        this.showDor = false;
        if (this.page === 0) {
          weui.alert("不能再翻啦~");
          this.page += 1;
        } else {
          this.getStatistic();
        }
      }
    },
    nextPage() {
      this.page += 1;
      if (this.sort === 1) {
        this.showFlag = true;
        this.showDor = false;
        //this.getShow();
        axios
          .get(
            config.sellerUrl +
              "/sell/seller/group/salesList?token=" +
              this.token +
              "&orderField=groupConsume" +
              "&page=" +
              this.page
          )
          .then(res => {
            console.log(res);
            this.staData = res.data.data.list;
            console.log(res.data.data.list.length);
            if (res.data.data.list.length === 0) {
              weui.alert("不能再翻啦~");
              this.page -= 1;
              console.log(this.page);
              this.getStatistic();
            } else {
              this.upTimes.splice(0, this.upTimes.length);
              for (let i = 0; i < this.staData.length; i++) {
                var _x = this.staData[i].updateTime;
                if (_x.toString().length === 10) {
                  var date = new Date(_x * 1000);
                } else {
                  var date = new Date(_x);
                }
                this.times(date);
              }
              console.log(this.staData);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.sort === 0) {
        //this.getStyle();
        this.showFlag = false;
        this.showDor = true;
        this.staData.splice(0, this.staData.length);
        axios
          .get(
            config.sellerUrl +
              "/sell/seller/group/salesList?token=" +
              this.token +
              "&page=" +
              this.page
          )
          .then(res => {
            console.log(res);
            this.staData = res.data.data.list;
            console.log(res.data.data.list.length);
            if (res.data.data.list.length === 0) {
              weui.alert("不能再翻啦~");
              this.page -= 1;
              console.log(this.page);
              this.getQue();
            } else {
              this.upTimes.splice(0, this.upTimes.length);
              for (let i = 0; i < this.staData.length; i++) {
                var _x = this.staData[i].updateTime;
                if (_x.toString().length === 10) {
                  var date = new Date(_x * 1000);
                } else {
                  var date = new Date(_x);
                }
                this.times(date);
              }
              console.log(this.staData);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  components: {
    searchdomitory
  }
};
</script>

<style>
</style>

<template>
  <div id="statistica">
    <div class="weui-cells__title">类型</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" @change="getAll($event)">
            <option v-for="(h,k) in this.index" :key="k" :value="h.indexId">{{h.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">时间</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">开始时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" v-model="sTime" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">结束时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" value="" v-model="eTime" />
        </div>
      </div>
    </div>
    <a href="javascript:;" class="weui-btn weui-btn_primary" @click="selectMore">查询</a>
    <div v-if="amount > 0" class="weui-cells__title" style="border-bottom:1px solid rgba(7,17,27,0.1)">合计金额￥{{amount}}</div>
    <div v-if="kk === 2" class="domitorylist">
      <router-link v-for="(item,index) in this.dorList" :key="index" :to="{name:'orderdetail2',params:{dorDE:item}}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <p class="weui-media-box__desc">创建时间:{{createTimes[index]}}</p>
          <p class="weui-media-box__desc">订单金额:￥{{item.orderAmount}}</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </router-link>
    </div>
    <div v-if="kk === 1" v-for="(item,index) in this.goodsList" :key="index">
      <div class="page__bd page__bd_spacing">
        <div class="weui-cells__title">{{item.name}}</div>
        <div class="weui-panel weui-panel_access goodslist" v-for="(x,y) in item.foods" :key="y">
          <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" :src="x.icon">
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" style="color:#000">{{x.name}}</h4>
                <p class="weui-media-box__desc">商品单价：￥{{x.price}}</p>
                <p class="weui-media-box__desc">商品介绍：{{x.description}}</p>
              </div>
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">x{{x.quantity}}
                </div>
              </a>
              <!--<div class="weui-cell__ft">></div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<div v-if="kk === 2" class="weui-form-preview__item" style="margin-top:10px;margin-left:20%;">
      <a href="javascript:;" class="weui-btn weui-btn_default weui-btn_mini" @click="lastPage">上一页</a>
      <input type="number" class="weui-search-bar_input"
             style="display:inline-block;width:50px;height:18px;text-align: center" value="" v-model="page"
             @keyup.enter="gotoPages"/>
      <a href="javascript:;" class="weui-btn weui-btn_default weui-btn_mini" @click="nextPage">下一页</a>
    </div>-->
  </div>
</template>

<script>
import axios from "axios";
import weui from "weui.js";
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
      token: "",
      sort: "1",
      sTime: "",
      eTime: "",
      startTime: "",
      endTime: "",
      goodsList: [],
      dorList: [],
      createTimes: [],
      amount: 0,
      kk: 1,
      page: 1,
      index: [
        {
          indexId: 1,
          name: "商品销售统计"
        },
        {
          indexId: 2,
          name: "订单销售统计"
        }
      ]
    };
  },
  created() {
    this.token = this.getCookie("token");
    //this.getGoodsSta();
    //this.getOrder();
    //this.getCurrentTime();
  },
  methods: {
    getCurrentTime() {
      var date1 = new Date();
      var Y = date1.getFullYear();
      //console.log(Y);
      //console.log(dorTime);
      var M =
        date1.getMonth() + 1 < 0
          ? +(date1.getMonth() + 1)
          : date1.getMonth() + 1;
      //console.log(M);
      var D = date1.getDate();
      this.sTime = Y + "-" + M + "-" + D;
      console.log(this.sTime);
    },
    getOrders() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/order/timeBetween?token=" +
            this.token +
            "&startTime=" +
            this.sTime +
            "&endTime=" +
            this.eTime +
            "&page=" +
            this.page
        )
        .then(res => {
          console.log(res);
          this.amount = res.data.data.orderListAmount;
          this.dorList = res.data.data.orderDTOVOList;
          this.createTimes.splice(0, this.createTimes.length);
          for (let i = 0; i < this.dorList.length; i++) {
            if (this.dorList[i].createTime.toString().length === 10) {
              var date = new Date(this.dorList[i].createTime * 1000);
            } else {
              var date = new Date(this.dorList[i].createTime);
            }
            this.times(date);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getGoodsSta() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/order/productSalesVolume?token=" +
            this.token +
            "&startTime=" +
            this.sTime +
            "&endTime=" +
            this.eTime
        )
        .then(res => {
          console.log(res);
          this.goodsList = res.data.data;
          console.log(this.goodsList);
          this.totalP();
        })
        .catch(err => {
          console.log(err);
        });
    },
    totalP() {
      this.amount = 0;
      for (let i = 0; i < this.goodsList.length; i++) {
        for (let j = 0; j < this.goodsList[i].foods.length; j++) {
          this.amount +=
            this.goodsList[i].foods[j].price *
            this.goodsList[i].foods[j].quantity;
        }
      }
      return this.amount.toFixed(2);
    },
    getDetail(obj) {
      //console.log(obj);
      this.$router.push({ name: "orderdetail1", params: { goods: obj } });
    },
    getAll(event) {
      this.sort = event.target.value;
      //console.log(this.sort);
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
      this.createTimes.push(
        Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s
      );
    },
    selectMore() {
      this.startTime = this.sTime;
      this.endTime = this.eTime;
      console.log(this.startTime);
      console.log(this.endTime);
      //console.log(this.sort);
      //console.log(typeof(this.sort));
      if (this.sort === "1") {
        this.kk = 1;
        this.getGoodsSta();
      }
      if (this.sort === "2") {
        this.kk = 2;
        this.getOrders();
        //console.log("22");
      }
    },
    lastPage() {
      this.page -= 1;
      if (this.page === 0) {
        weui.alert("不要再翻啦~");
        this.page += 1;
      } else {
      }
    },
    nextPage() {
      this.page += 1;
    },
    gotoPages() {}
  }
};
</script>

<style>
</style>

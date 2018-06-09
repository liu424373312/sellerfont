<template>
  <div id="orderdetail">
    <div class="weui-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">{{this.dorDE.groupNo}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">创建时间</label>
          <span class="weui-form-preview__value">{{this.createTime}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">更新时间</label>
          <span class="weui-form-preview__value">{{this.updateTime}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单金额</label>
          <span class="weui-form-preview__value">{{this.dorDE.orderAmount}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">状态</label>
          <span class="weui-form-preview__value">{{this.orderStatus}}&nbsp;{{this.payStatus}}</span>
        </div>
      </div>
    </div>
    <div class="weui-panel__hd hd">商品列表</div>
    <div class="page__bd page__bd_spacing">
      <div class="weui-panel weui-panel_access goodslist" v-for="(x,y) in this.dorDE.orderDetailVOList" :key="y">
        <div class="weui-panel__bd">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="x.productIcon" alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{x.productName}}</h4>
              <p class="weui-media-box__desc">单价:￥{{x.productPrice}}</p>
              <!--<p class="weui-media-box__desc">仓库库存:{{item.productQuantity}}</p>-->
            </div>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">x{{x.productQuantity}}
              </div>
              <!--<div class="weui-cell__ft"></div>-->
            </a>
          </a>
        </div>
      </div>
    </div>

    <!--<div class="weui-form-preview__ft">
      <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:;"
         @click="sureOrder">{{cor1}}</a>
      <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" @click="cancelOrder">
        {{cor2}}
      </button>
    </div>-->
    <!--<router-link :to="{name:'domitorydemo'}" class="weui-cell weui-cell_access" href="javascript:;">
      <div class="weui-cell__bd">
        <p>生成模板</p>
      </div>
      <div class="weui-cell__ft"></div>
    </router-link>-->
  </div>
</template>

<script>
import axios from "axios";
import weui from "weui.js";
export default {
  data() {
    return {
      token: "",
      dorDE: [],
      createTime: "",
      updateTime: "",
      payStatus: "",
      orderStatus: ""
    };
  },
  created() {
    this.dorDE = this.$route.params.dorDE;
    console.log(this.dorDE);
    //创建时间
    if (this.dorDE.createTime.toString().length === 10) {
      var date = new Date(this.dorDE.createTime * 1000);
    } else {
      var date = new Date(this.dorDE.createTime);
    }
    this.createTime = this.times(date);
    //更新时间
    if (this.dorDE.updateTime.toString().length === 10) {
      var date = new Date(this.dorDE.updateTime * 1000);
    } else {
      var date = new Date(this.dorDE.updateTime);
    }
    this.updateTime = this.times(date);
    //订单状态
    if (this.dorDE.orderStatus === 0) {
      this.orderStatus = "新订单";
    } else if (this.dorDE.orderStatus === 1) {
      this.orderStatus = "已完结";
    } else {
      this.ordeStatus = "已取消";
    }
    //支付状态
    if (this.dorDE.payStatus === 0) {
      this.payStatus = "未支付";
    } else {
      this.payStatus = "已支付";
    }
  },
  methods: {
    times(date1) {
      if (date1.toString().length === 10) {
        date1 = date1 * 1000;
      }
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
      return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
      //console.log(this.createsTime);
      //return this.createsTime;
    }
  }
};
</script>

<style>
</style>

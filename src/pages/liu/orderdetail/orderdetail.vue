<template>
  <div id="orderdetail">
    <div class="weui-panel__hd hd">订单信息</div>
    <div class="weui-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">{{orderdetail.groupNo}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">金额</label>
          <span class="weui-form-preview__value">{{orderdetail.orderAmount}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">{{getLocalTime(orderdetail.updateTime)}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单状态</label>
          <span class="weui-form-preview__value">{{orderstatus(orderdetail.payStatus)}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单编号</label>
          <span class="weui-form-preview__value">{{orderdetail.orderId}}</span>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">商品列表</div>
    <div class="weui-cells">
      <a class="weui-cell" v-for="(item,index) in orderdetail.orderDetailList" :key="index">
        <div class="weui-cell__hd"><img :src="item.productIcon" alt="" style="width:20px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd">
          <p>{{item.productName}}</p>
        </div>
        <div class="weui-cell__ft">x{{item.productQuantity}}</div>
      </a>
    </div>
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
      orderId: "",
      orderdetail: []
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.orderId = this.getCookie("orderId");
    var loading = weui.loading("加载中");
    axios
      .get(
        config.sellerUrl + "/sell/seller/order/detail?orderId=" + this.orderId
      )
      .then(response => {
        console.log(response.data);
        this.orderdetail = response.data.data;
        loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        loading.hide();
      });
  },
  methods: {
    orderstatus(item) {
      if (item == "0") {
        return "未支付订单";
      }
      if (item == "1") {
        return "已支付订单";
      }
    },
  }
};
</script>

<style>
</style>

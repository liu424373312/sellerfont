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
                    <span class="weui-form-preview__value">{{timestampToTime(orderdetail.createTime)}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单状态</label>
                    <span class="weui-form-preview__value">{{orderstatus(orderdetail.orderStatus)}}</span>
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
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
export default {
  data() {
    return {
      api: "http://wxsell.nat200.top",
      token: "",
      orderId: "",
      orderdetail: []
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.orderId = this.getCookie("orderId");
    axios
      .get(
        API_PROXY +
          this.api +
          "/sell/seller/order/detail?orderId=" +
          this.orderId
      )
      .then(response => {
        console.log(response.data);
        this.orderdetail = response.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    orderstatus(item) {
      if (item == "0") {
        return "新订单";
      }
      if (item == "1") {
        return "已完结";
      }
      if (item == "2") {
        return "已取消";
      }
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
};
</script>

<style>
</style>

<template>
  <div id="orederlist">
    <div class="weui-panel__hd">支付订单列表</div>
    <div class="weui-panel__hd">{{orderlist.length}}条记录
      <span v-if="orderStatus=='1'">总金额：{{count.toFixed()}}￥</span>
    </div>
    <div class="weui-panel__bd" v-for="(item,index) in orderlist" :key="index" @click="detail(item)">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <p class="weui-media-box__desc">时间:{{getLocalTime(item.updateTime)}}</p>
        </div>
        <div class="weui-media-box__ft">
          <p class="weui-media-box__title">{{item.orderAmount}}￥</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var config = require("../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
      token: ""
    };
  },
  props: ["orderlist", "orderStatus", "count"],
  created() {
    this.token = this.getCookie("token");
  },
  methods: {
    detail(item) {
      this.setCookie("orderId", item.orderId, 1);
      this.$router.push({ name: "orderdetail" });
    }
  }
};
</script>

<style>
#orderlist {
  height: 550px;
  overflow: auto;
}
.orderitem {
  margin-bottom: 30px;
}
</style>

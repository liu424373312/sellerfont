<template>
  <div id="orederlist">
    <div class="weui-panel__hd hd">支付订单列表</div>
    <div class="weui-panel__bd" v-for="(item,index) in orderlist" :key="index" @click="detail(item)">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <p class="weui-media-box__desc">{{item.userName}} {{item.userPhone}}</p>
          <p class="weui-media-box__desc">时间:{{timestampToTime(item.createTime)}}</p>
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
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
export default {
  data() {
    return {
      token: "",
      api: "http://wxsell.nat200.top"
    };
  },
  props: ["orderlist", "orderStatus"],
  created() {
    let token = this.getCookie("token");
    if (token === null || !token) {
      window.location.href = "http://5ygsri.natappfree.cc/#/authorize";
    } else {
      this.token = token;
    }
  },
  methods: {
    confirm(item) {
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/order/finish?token=" +
            this.token +
            "&orderId=" +
            item.orderId
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel(item) {
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/order/cancel?token=" +
            this.token +
            "&orderId=" +
            item.orderId
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    detail(item) {
      this.setCookie("orderId", item.orderId, 1);
      this.$router.push({ name: "orderdetail" });
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
#orderlist {
  height: 550px;
  overflow: auto;
}
.orderitem {
  margin-bottom: 30px;
}
</style>

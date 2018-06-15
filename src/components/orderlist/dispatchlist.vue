<template>
  <div id="dispatchlist">
    <div class="weui-panel__bd" v-for="(item,index) in dispatchlist" :key="index" @click="detail(item)">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <p class="weui-media-box__desc">{{item.userName}} {{item.userPhone}}</p>
          <p class="weui-media-box__desc">时间:{{getLocalTime(item.createTime)}}</p>
        </div>
        <div class="weui-media-box__ft">
          <p class="weui-media-box__title">{{item.dispatchAmount}}￥</p>
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
  props: ["dispatchlist"],
  created() {
    this.token = this.getCookie("token");
  },
  methods: {
    confirm(item) {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/dispatch/finish?token=" +
            this.token +
            "&groupNo=" +
            item.groupNo
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
          config.sellerUrl +
            "/sell/seller/dispatch/cancel?token=" +
            this.token +
            "&groupNo=" +
            item.groupNo
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    detail(item) {
      this.setCookie("groupNo", item.groupNo, 1);
      this.$router.push({ name: "dispatchdetail" });
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

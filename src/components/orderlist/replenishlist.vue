<template>
  <div id="replenishlist">
    <div class="weui-panel__bd" v-if="item1.replenishStatus=='0'" v-for="(item1,index) in replenishlist" :key="index" @click="detail(item1)">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{item1.groupNo}}</h4>
          <p class="weui-media-box__desc">{{item1.userName}} {{item1.userPhone}}</p>
          <p class="weui-media-box__desc">时间:{{getLocalTime(item1.updateTime)}}</p>
        </div>
        <div class="weui-media-box__ft fttext">
          <p class="weui-media-box__desc">{{orderstatus(item1.replenishStatus)}}</p>
          <p class="weui-media-box__title">{{item1.replenishAmount}}￥</p>
        </div>
      </div>
    </div>
    <div class="weui-panel__bd" v-if="item2.replenishStatus=='1'" v-for="(item2,index) in replenishlist" :key="index" @click="detail(item2)">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{item2.groupNo}}</h4>
          <p class="weui-media-box__desc">{{item2.userName}} {{item2.userPhone}}</p>
          <p class="weui-media-box__desc">时间:{{getLocalTime(item2.updateTime)}}</p>
        </div>
        <div class="weui-media-box__ft fttext">
          <p class="weui-media-box__desc">{{orderstatus(item2.replenishStatus)}}</p>
          <p class="weui-media-box__title">{{item2.replenishAmount}}￥</p>
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
      token: "",
      items: ""
    };
  },
  props: ["replenishlist"],
  created() {
    this.token = this.getCookie("token");
  },
  methods: {
    orderstatus(item) {
      if (item == "1") {
        return "已生成配送单";
      } else {
        return "待生成配送单";
      }
    },
    confirm(item) {
      this.items = "";
      for (var i = 0; i < item.replenishDetailList.length; i++) {
        this.items =
          "[{replenishId:" +
          item.replenishDetailList[i].replenishId +
          ",productId:" +
          item.replenishDetailList[i].productId +
          ",productQuantity:" +
          item.replenishDetailList[i].productQuantity +
          "}]";
      }
      console.log(this.items);
      axios
        .post(
          config.sellerUrl + "/sell/seller/replenish/finish",
          { items: this.items, token: this.token },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel(item) {
      console.log(item.replenishId);
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/replenish/cancel?replenishId=" +
            item.replenishId
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    detail(item) {
      this.setCookie("replenishId", item.replenishId, 1);
      this.$router.push({ name: "replenishdetail" });
    }
  }
};
</script>

<style>
.fttext {
  text-align: right;
}
.fttext {
  text-align: right;
}
</style>

<template>
  <div id="replenishlist">
    <div class="weui-panel__bd" v-if="item.replenishStatus=='0'" v-for="(item,index) in replenishlist" :key="index" @click="detail(item)">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <p class="weui-media-box__desc">{{item.userName}} {{item.userPhone}}</p>
          <p class="weui-media-box__desc">时间:{{timestampToTime(item.createTime)}}</p>
        </div>
        <div class="weui-media-box__ft">
          <p class="weui-media-box__desc">{{item.replenishAmount}}￥</p>
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
      api: "http://wxsell.nat200.top",
      items: ""
    };
  },
  props: ["replenishlist"],
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
          this.api + "/sell/seller/replenish/finish",
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
          API_PROXY +
            this.api +
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
  height: 530px;
  overflow: auto;
}
.orderitem {
  margin-bottom: 30px;
}
</style>

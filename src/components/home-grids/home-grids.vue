<template>
    <div id="home-grids">
        <div class="weui-grids">
            <router-link v-if="rank" to="goods" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-goods homeicon"></i>
                </div>
                <p class="weui-grid__label">商品管理</p>
            </router-link>
            <router-link v-if="rank" :to="{name:'domitory'}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-domitory homeicon"></i>
                </div>
                <p class="weui-grid__label">寝室管理</p>
            </router-link>
            <router-link :to="{name:'order'}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-order homeicon"></i>
                </div>
                <p class="weui-grid__label">订单管理</p>
            </router-link>
            <router-link v-if="rank" :to="{name:'statistica'}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-statistica homeicon"></i>
                </div>
                <p class="weui-grid__label">销售统计</p>
            </router-link>
            <router-link v-if="rank" :to="{name:'templates'}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-copy homeicon"></i>
                </div>
                <p class="weui-grid__label">模板管理</p>
            </router-link>
            <router-link v-if="rank" to="personal" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-user homeicon"></i>
                </div>
                <p class="weui-grid__label">个人中心</p>
            </router-link>
            <router-link v-if="rank" to="payorder" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-database homeicon"></i>
                </div>
                <p class="weui-grid__label">支付订单</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import weui from "weui.js";
import $ from "jquery";
import axios from "axios";
import qs from "qs";
var config = require("../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
      rank: false
    };
  },
  created() {
    this.getrank();
  },
  methods: {
    getrank() {
      this.token = this.getCookie("token");
      var loading = weui.loading("加载中");
      axios
        .get(config.sellerUrl + "/sell/token/sellerRank?token=" + this.token)
        .then(response => {
          console.log(response.data);
          if (response.data.data.rank == "1") {
            this.rank = true;
          }
          loading.hide();
        })
        .catch(function(err) {
          console.log(err);
          loading.hide();
        });
    }
  }
};
</script>

<style>
.homeicon {
  font-size: 28px;
  color: dodgerblue;
}
</style>

<template>
  <div id="goodslist">
    <div class="weui-panel weui-panel_access goodslist">
      <div class="weui-panel__hd">商品列表</div>
      <div v-if="all">
        <div class="weui-panel__bd" v-for="(item,index) in goodslist" :key="index">
          <div v-for="(foods,index) in item.foods" :key="index" @click='goodsdetail(foods)' class="weui-media-box weui-media-box_appmsg" :to="{name:'goodsdetail',params:{goodsdetail:foods}}">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src=foods.icon alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{foods.name}}</h4>
              <p class="weui-media-box__desc">售价：{{foods.price}}元</p>
              <p class="weui-media-box__desc">进价：{{foods.purchasePrice}}元</p>
            </div>
            <div class="weui-media-box__ft">
              <p class="weui-media-box__desc">{{status(foods.status)}} 库存:{{foods.stock}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="weui-panel__bd" v-for="(item,index) in goodslist.foods" :key="index" @click='goodsdetail(item)'>
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src=item.icon alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.name}}</h4>
              <p class="weui-media-box__desc">售价：{{item.price}}元</p>
              <p class="weui-media-box__desc">进价：{{item.purchasePrice}}元</p>
            </div>
            <div class="weui-media-box__ft">
              <p class="weui-media-box__desc"> {{status(item.status)}} 库存:{{item.stock}}</p>
            </div>
          </div>
        </div>
      </div>
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
      goodslist: [],
      productId: 123456,
      all: false,
      token: ""
    };
  },
  created() {
    if (this.getCookie("all") == "false") {
      this.all = false;
    } else {
      this.all = true;
    }
    this.token = this.getCookie("token");
    var loading = weui.loading("加载中");
    axios
      .get(config.sellerUrl + "/sell/seller/product/list?token=" + this.token)
      .then(response => {
        console.log(response.data);
        if (this.all) {
          this.goodslist = response.data.data;
        } else {
          this.goodslist = response.data.data[this.getCookie("goodsclass")];
        }
        loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        loading.hide();
      });
  },
  methods: {
    goodsdetail(item) {
      this.setCookie("productId", item.id, 1);
      this.$router.push("goodsdetail");
    },
    status(item) {
      if (item == 0) {
        return "在售";
      } else {
        return "下架";
      }
    }
  }
};
</script>

<style>
</style>

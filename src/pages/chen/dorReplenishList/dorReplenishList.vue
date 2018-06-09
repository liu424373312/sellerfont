<template>
  <div id="dorReplenishList">
    <div class="weui-form-preview__ft" style="margin-top:10px;">
      <button class="weui-form-preview__btn weui-form-preview__btn_primary" v-if="this.replenishList.length > 0" style="background:#0bb20c;color:#fff;" @click="createMode">创建模板
      </button>
      <button class="weui-form-preview__btn weui-form-preview__btn_primary" v-if="this.goodsList.length > 0" @click="gotoList" style="border-top:2px solid rgba(7,17,27,0.3);border-bottom:2px solid rgba(7,17,27,0.3);border-right:2px solid rgba(7,17,27,0.3)">
        寝室上次配送单
      </button>
    </div>
    <div class="weui-panel__hd hd">
      <span class="weui-media-box__title" style="font-weight: bold">{{this.groupNo}}</span>&nbsp;配送单列表
    </div>
    <div class="page__bd page__bd_spacing ">
      <div class="weui-panel weui-panel_access goodslist">
        <div class="weui-panel__bd">
          <div v-for="(item,index) in this.replenishList" :key="index" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.productIcon" alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.productName}}</h4>
              <p class="weui-media-box__desc">单价￥{{item.productPrice}}</p>
            </div>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">x{{item.productQuantity}}
              </div>
            </a>
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
      groupNo: "",
      token: "",
      replenishList: [],
      goodsList: []
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.groupNo = this.getCookie("groupNo");
    this.getDetail();
    //获取寝室补货快照
    this.getList();
  },
  methods: {
    getDetail() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/dispatch/detail?token=" +
            this.token +
            "&groupNo=" +
            this.groupNo
        )
        .then(res => {
          console.log(res);
          this.replenishList = res.data.data.dispatchDetailList;
          console.log(this.replenishList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/group/detail?token=" +
            this.token +
            "&groupNo=" +
            this.groupNo
        )
        .then(res => {
          console.log(res);
          this.goodsList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createMode() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/dispatch/create_template?token=" +
            this.token +
            "&groupNo=" +
            this.groupNo
        )
        .then(res => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("创建模板成功!");
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(err => {
          weui.alert("创建模板失败!");
          console.log(err);
        });
    },
    gotoList() {
      this.setCookie("groupNo", this.groupNo, 1);
      this.$router.push({ name: "dorgroup" });
    }
  }
};
</script>

<style>
</style>

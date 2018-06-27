<template>
  <div id="dispatchdetail">
    <div class="weui-panel__hd hd">订单信息</div>
    <div class="weui-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">{{dispatchdetail.groupNo}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">金额</label>
          <span class="weui-form-preview__value">{{dispatchdetail.dispatchAmount}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">创建时间</label>
          <span class="weui-form-preview__value">{{getLocalTime(dispatchdetail.updateTime)}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单状态</label>
          <span class="weui-form-preview__value">{{orderstatus(dispatchdetail.dispatchKind)}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单编号</label>
          <span class="weui-form-preview__value">{{dispatchdetail.dispatchId}}</span>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">商品列表</div>
    <div class="weui-cells">
      <a class="weui-cell" v-for="(item,index) in dispatchdetail.dispatchDetailList" :key="index">
        <div class="weui-cell__hd"><img :src="item.productIcon" alt="" style="width:20px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd">
          <p>{{item.productName}}</p>
        </div>
        <div class="weui-cell__ft">x{{item.productQuantity}}</div>
      </a>
    </div>
    <a class="weui-btn weui-btn_primary" @click="finish">
      <p>完成配送</p>
    </a>
    <a class="weui-btn weui-btn_warn" @click="cancelorder">取消</a>
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
      groupNo: "",
      dispatchdetail: ""
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.groupNo = this.getCookie("groupNo");
    var loading = weui.loading("加载中");
    axios
      .get(
        config.sellerUrl +
          "/sell/seller/dispatch/detail?groupNo=" +
          this.groupNo +
          "&token=" +
          this.token
      )
      .then(response => {
        console.log(response.data);
        this.dispatchdetail = response.data.data;
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
        return "已配送";
      } else {
        return "待配送";
      }
    },
    finish() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/dispatch/finish?groupNo=" +
            this.groupNo +
            "&token=" +
            this.token
        )
        .then(res => {
          console.log(res.data);
          if (res.data.msg === "成功") {
            weui.toast("完成配送!", {
              duration: 3000
            });
            this.$router.push("order");
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
          weui.alert("完成配送失败!");
        });
    },
    cancelorder() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/dispatch/cancel?groupNo=" +
            this.groupNo +
            "&token=" +
            this.token
        )
        .then(res => {
          console.log(res.data);
          if (res.data.msg === "成功") {
            weui.toast("取消成功!", {
              duration: 3000
            });
            this.$router.push("order");
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
          weui.alert("取消失败!");
        });
    }
  }
};
</script>

<style>
</style>

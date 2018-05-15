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
                    <label class="weui-form-preview__label">姓名</label>
                    <span class="weui-form-preview__value">{{orderdetail.userName}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">电话</label>
                    <span class="weui-form-preview__value">{{orderdetail.userPhone}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">金额</label>
                    <span class="weui-form-preview__value">{{orderdetail.orderAmount}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">时间</label>
                    <span class="weui-form-preview__value">{{orderdetail.createTime}}</span>
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
        <div class="weui-panel__hd hd">商品列表</div>
        <div class="page__bd page__bd_spacing ">
            <div class="weui-panel weui-panel_access goodslist" v-for="(item,index) in orderdetail.orderDetailList" :key="index">
                <div class="weui-panel__bd">
                    <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="item.productIcon" alt="">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item.productName}}</h4>
                            <p class="weui-media-box__desc">{{item.productPrice}}元</p>
                        </div>
                        <div class="weui-media-box__ft">
                            <p class="weui-media-box__desc">x{{item.productQuantity}}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <router-link :to="{name:'applydomitory'}" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
                <p>生成配送单</p>
            </div>
            <div class="weui-cell__ft"></div>
        </router-link>
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
      orderdetail: ""
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
        this.orderdetaill = response.data.data;
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
    }
  }
};
</script>

<style>

</style>

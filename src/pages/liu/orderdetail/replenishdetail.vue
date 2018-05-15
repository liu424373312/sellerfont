<template>
    <div id="replenishdetail">
        <div class="weui-panel__hd hd">订单信息</div>
        <div class="weui-form-preview">
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">寝室号</label>
                    <span class="weui-form-preview__value">{{replenishdetail.groupNo}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">姓名</label>
                    <span class="weui-form-preview__value">{{replenishdetail.userName}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">电话</label>
                    <span class="weui-form-preview__value">{{replenishdetail.userPhone}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">金额</label>
                    <span class="weui-form-preview__value">{{replenishdetail.replenishAmount}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">时间</label>
                    <span class="weui-form-preview__value">{{replenishdetail.createTime}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单状态</label>
                    <span class="weui-form-preview__value">{{orderstatus(replenishdetail.replenishStatus)}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单编号</label>
                    <span class="weui-form-preview__value">{{replenishdetail.replenishId}}</span>
                </div>
            </div>
        </div>
        <div class="weui-panel__hd hd">商品列表</div>
        <div class="page__bd page__bd_spacing ">
            <div class="weui-panel weui-panel_access goodslist" v-for="(item,index) in replenishdetail.replenishDetailList" :key="index">
                <div class="weui-panel__bd">
                    <a class="weui-media-box weui-media-box_appmsg" @click="goodsdetail(item)">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="item.productIcon" alt="">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item.productName}}</h4>
                            <p class="weui-media-box__desc">{{item.productPrice}}元</p>
                        </div>
                        <div class="weui-media-box__ft">
                            <p class="weui-media-box__title">x{{item.productQuantity}}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <a class="weui-cell weui-cell_access" @click="dispatch">
            <div class="weui-cell__bd">
                <p>生成配送单</p>
            </div>
            <div class="weui-cell__ft"></div>
        </a>
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
      replenishId: "",
      replenishdetail: "",
      data: []
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.replenishId = this.getCookie("replenishId");
    axios
      .get(
        API_PROXY +
          this.api +
          "/sell/seller/replenish/detail?replenishId=" +
          this.replenishId
      )
      .then(response => {
        console.log(response.data);
        this.replenishdetail = response.data.data;
      })
      .catch(function(err) {
        console.log(err);
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
    dispatch() {
      this.data = [];
      for (var i = 0; i < item.replenishDetailList.length; i++) {
        this.data[i] = {
          replenishId: item.replenishDetailList[i].replenishId,
          productId: item.replenishDetailList[i].productId,
          productQuantity: item.replenishDetailList[i].productQuantity
        };
      }
      console.log(this.data);
      // axios
      //   .post(this.api + "/sell/seller/replenish/finish" + this.token, {
      //     headers: { "Content-Type": "application/x-www-form-urlencoded" }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     console.log();
      //     this.listdata = res.data.data.list;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    goodsdetail(item) {
      this.setCookie("productId", item.productId, 1);
      this.$router.push("goodsdetail");
    }
  }
};
</script>

<style>

</style>

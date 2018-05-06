<template>
  <div id="dispatchlist">
    <div class="weui-panel__hd hd">补货订单列表</div>
    <div v-for="(item,index) in dispatchlist" :key="index" class="weui-form-preview orderitem">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <em class="weui-form-preview__value">{{item.groupNo}}</em>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">付款金额</label>
          <span class="weui-form-preview__value">{{item.dispatchAmount}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">{{item.createTime}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">商品</label>
          <span class="weui-form-preview__value ordergoods">
            <span v-for="(goods,index) in item.dispatchDetailList" :key="index">{{goods.productName}} </span>
          </span>
        </div>
      </div>
      <a class="weui-cell weui-cell_access" @click="detail(item)">
        <div class="weui-cell__bd">
          <p>查看详情</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </a>
      <div class="weui-form-preview__ft">
        <button class="weui-form-preview__btn weui-form-preview__btn_primary" @click="confirm(item)">完成</button>
        <button class="weui-form-preview__btn weui-form-preview__btn_primary" @click="cancel(item)">取消</button>
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
  props: ["dispatchlist"],
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
          API_PROXY +
            this.api +
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

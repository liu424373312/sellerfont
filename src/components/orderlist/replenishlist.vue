<template>
  <div id="replenishlist">
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">补货订单列表</div>
      <div class="weui-panel__bd" v-if="item.replenishStatus=='0'" v-for="(item,index) in replenishlist" :key="index">
        <div class="weui-media-box weui-media-box_text">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>寝室号</p>
            </div>
            <div class="weui-cell__ft">{{item.groupNo}}</div>
          </div>
          <h4 class="weui-media-box__title">寝室号:{{item.groupNo}}</h4>
          <p class="weui-media-box__desc">付款金额:{{item.replenishAmount}}元</p>
          <p class="weui-media-box__desc">时间:{{item.createTime}}元</p>
          <p class="weui-media-box__desc">商品:{{item.replenishAmount}}元</p>
          <span class="weui-form-preview__value ordergoods">
            <span v-for="(goods,index) in item.replenishDetailList" :key="index">{{goods.productName}} </span>
          </span>
        </div>
      </div>
    </div>
    <!-- <div v-if="item.replenishStatus=='0'" v-for="(item,index) in replenishlist" :key="index" class="weui-form-preview orderitem">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <em class="weui-form-preview__value">{{item.groupNo}}</em>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">付款金额</label>
          <span class="weui-form-preview__value">{{item.replenishAmount}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">{{item.createTime}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">商品</label>
          <span class="weui-form-preview__value ordergoods">
            <span v-for="(goods,index) in item.replenishDetailList" :key="index">{{goods.productName}} </span>
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
        <button class="weui-form-preview__btn weui-form-preview__btn_primary" @click="confirm(item)">生成配送单</button>
        <button class="weui-form-preview__btn weui-form-preview__btn_primary" @click="cancel(item)">取消补货</button>
      </div>
    </div> -->
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

<template>
  <div id="order">
    <search></search>
    <replenishlist v-if="replenishlistshow" :replenishlist='listdata'></replenishlist>
    <orderlist v-if="orderlistshow" :orderlist='listdata'></orderlist>
    <dispatchlist v-if="dispatchlistshow" :dispatchlist='listdata'></dispatchlist>
    <div class="weui-tabbar tabbar">
      <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on" @click="replenishlist">
        <i class="icon-truck ordericon"></i>
        <p class="weui-tabbar__label">补货订单</p>
      </a>
      <a class="weui-tabbar__item" @click="dispatchlist">
        <i class="icon-dropbox ordericon"></i>
        <p class="weui-tabbar__label">配送订单</p>
      </a>
      <a class="weui-tabbar__item" @click="orderlist">
        <i class="icon-clipboard ordericon"></i>
        <p class="weui-tabbar__label">支付订单</p>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import search from "../../components/search/search";
import orderlist from "../../components/orderlist/orderlist";
import dispatchlist from "../../components/orderlist/dispatchlist";
import replenishlist from "../../components/orderlist/replenishlist";
import $ from "jquery";
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
export default {
  components: {
    orderlist,
    replenishlist,
    dispatchlist,
    search
  },
  data() {
    return {
      token: "",
      api: "http://wxsell.nat200.top",
      listdata: [],
      orderlistshow: false,
      replenishlistshow: true,
      dispatchlistshow: false
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.replenishlist();
  },
  mounted() {
    $(function() {
      $(".weui-tabbar__item").on("click", function() {
        $(this)
          .addClass("weui-bar__item_on")
          .siblings(".weui-bar__item_on")
          .removeClass("weui-bar__item_on");
      });
    });
  },
  methods: {
    dispatchlist() {
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/dispatch/list?token=" +
            this.token
        )
        .then(res => {
          console.log(res);
          this.listdata = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
      this.orderlistshow = false;
      this.replenishlistshow = false;
      this.dispatchlistshow = true;
    },
    orderlist() {
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/order/list?token=" +
            this.token +
            "&orderStatus=0&payStatus=1"
        )
        .then(res => {
          console.log(res);
          this.listdata = res.data.data.orderDTOVOList;
        })
        .catch(err => {
          console.log(err);
        });
      this.orderlistshow = true;
      this.replenishlistshow = false;
      this.dispatchlistshow = false;
    },
    replenishlist() {
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/replenish/list?token=" +
            this.token
        )
        .then(res => {
          console.log(res);
          console.log();
          this.listdata = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
      this.orderlistshow = false;
      this.replenishlistshow = true;
      this.dispatchlistshow = false;
    }
  }
};
</script>

<style>
.tabbar {
  position: fixed;
  bottom: 0;
}
.ordericon {
  font-size: 27px;
  color: dodgerblue;
}
</style>

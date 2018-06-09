<template>
  <div id="order">
    <div class="page__bd" style="height: 100%;">
      <div class="weui-tab">
        <div class="weui-navbar">
          <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on" @click="replenishlist">
            <i class="icon-truck ordericon"></i>
            <p class="weui-tabbar__label">补货订单</p>
          </a>
          <a class="weui-tabbar__item" @click="dispatchlist">
            <i class="icon-dropbox ordericon"></i>
            <p class="weui-tabbar__label">配送订单</p>
          </a>
        </div>
        <div class="weui-tab__panel">
        </div>
      </div>
    </div>
    <replenishlist v-if="replenishlistshow" :replenishlist='listdata'></replenishlist>
    <dispatchlist v-if="dispatchlistshow" :dispatchlist='listdata'></dispatchlist>
    <div class="page">
      <button class="weui-btn weui-btn_mini weui-btn_default" @click="backpage">上一页</button>
      <span v-if="replenishlistshow">第{{replenishpage}}页</span>
      <span v-if="dispatchlistshow">第{{dispatchpage}}页</span>
      <button class="weui-btn weui-btn_mini weui-btn_default" @click="nextpage">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import searchorder from "../../../components/search/searchorder";
import dispatchlist from "../../../components/orderlist/dispatchlist";
import replenishlist from "../../../components/orderlist/replenishlist";
import $ from "jquery";
export default {
  components: {
    replenishlist,
    dispatchlist,
    searchorder
  },
  data() {
    return {
      token: "",
      listdata: [],
      replenishlistshow: true,
      dispatchlistshow: false,
      replenishpage: "1",
      dispatchpage: "1"
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
          "/api/sell/seller/dispatch/list?token=" +
            this.token +
            "&page=" +
            this.dispatchpage
        )
        .then(res => {
          console.log(res);
          this.listdata = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
      this.replenishlistshow = false;
      this.dispatchlistshow = true;
    },
    replenishlist() {
      axios
        .get(
          "/api/sell/seller/replenish/list?token=" +
            this.token +
            "&page=" +
            this.replenishpage
        )
        .then(res => {
          console.log(res);
          console.log();
          this.listdata = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
      this.replenishlistshow = true;
      this.dispatchlistshow = false;
    },
    nextpage() {
      if (this.replenishlistshow) {
        this.replenishpage++;
        this.replenishlist();
      }
      if (this.dispatchlistshow) {
        this.dispatchpage++;
        this.dispatchlist();
      }
    },
    backpage() {
      if (this.replenishlistshow) {
        this.replenishpage--;
        this.replenishlist();
      }
      if (this.dispatchlistshow) {
        this.dispatchpage--;
        this.dispatchlist();
      }
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
#order {
  background-color: #f8f8f8;
}
.page {
  position: relative;
  align-self: center;
}
</style>

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
      <select v-if="replenishlistshow" @click="replenishlist" v-model="replenishpage" class="weui-btn weui-btn_mini weui-btn_default">
        <option :value="index" v-for="(item,index) in 100" :key="index">{{index}}</option>
      </select>
      <select v-if="dispatchlistshow" @click="dispatchlist" v-model="dispatchpage" class="weui-btn weui-btn_mini weui-btn_default">
        <option :value="index" v-for="(item,index) in 100" :key="index">{{index}}</option>
      </select>
      <button class="weui-btn weui-btn_mini weui-btn_default" @click="nextpage">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import searchorder from "../../../components/search/searchorder";
import dispatchlist from "../../../components/orderlist/dispatchlist";
import replenishlist from "../../../components/orderlist/replenishlist";
import weui from "weui.js";
import $ from "jquery";
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
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
      var loading = weui.loading("加载中");
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/dispatch/list?token=" +
            this.token +
            "&page=" +
            this.dispatchpage
        )
        .then(res => {
          console.log(res);
          this.listdata = res.data.data.list;
          if(this.listdata.length==0){
            weui.alert('无更多数据');
          }
          loading.hide();
          weui.toast("加载成功", {
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err);
          loading.hide();
          weui.toast("失败!!!", {
            duration: 1000
          });
        });
      this.replenishlistshow = false;
      this.dispatchlistshow = true;
    },
    replenishlist() {
      var loading = weui.loading("加载中");
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/replenish/list?token=" +
            this.token +
            "&page=" +
            this.replenishpage
        )
        .then(res => {
          console.log(res);
          this.listdata = res.data.data.list;
          if(this.listdata.length==0){
            weui.alert('无更多数据');
          }
          loading.hide();
          weui.toast("加载成功", {
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err);
          loading.hide();
          weui.toast("失败!!!", {
            duration: 1000
          });
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

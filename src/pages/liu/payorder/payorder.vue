<template>
  <div id="payorder">
    <div class="page__bd" style="height: 100%;">
      <div class="weui-tab">
        <div class="weui-navbar">
          <a class="weui-tabbar__item weui-bar__item_on">
            <i class="icon-clipboard ordericon" @click="payorder"></i>
            <p class="weui-tabbar__label">已支付订单</p>
          </a>
          <a class="weui-tabbar__item">
            <i class="icon-paste ordericon" @click="neworder"></i>
            <p class="weui-tabbar__label">未支付订单</p>
          </a>
        </div>
      </div>
    </div>

    <orderlist :orderlist='listdata' :orderStatus='payStatus' :count='count'></orderlist>
    <div class="page">
      <button class="weui-btn weui-btn_mini weui-btn_default" @click="backpage">上一页</button>
      <select @click="orderlist()" v-model="page" class="weui-btn weui-btn_mini weui-btn_default">
        <option :value="index" v-for="(item,index) in 100" :key="index">{{index}}</option>
      </select>
      <button class="weui-btn weui-btn_mini weui-btn_default" @click="nextpage">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import weui from "weui.js";
import orderlist from "../../../components/orderlist/orderlist";
import $ from "jquery";
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  components: {
    orderlist
  },
  data() {
    return {
      token: "",
      listdata: [],
      orderStatus: "0",
      payStatus: "1",
      page: "1",
      count: 0
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.orderlist();
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
    orderlist() {
      var loading = weui.loading("加载中");
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/order/list?token=" +
            this.token +
            "&page=" +
            this.page +
            "&size=100" +
            "&orderStatus=" +
            this.orderStatus +
            "&payStatus=" +
            this.payStatus
        )
        .then(res => {
          console.log(res);
          this.count = 0;
          this.listdata = res.data.data;
          if(this.listdata.orderDTOVOList.length==0){
            weui.alert('无更多数据');
          }
          loading.hide();
          weui.toast("加载成功", {
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err);
          this.count = 0;
          loading.hide();
          weui.toast("失败!!!", {
            duration: 1000
          });
        });
    },
    neworder() {
      this.page = "1";
      this.orderStatus = "0";
      this.payStatus = "0";
      this.orderlist();
    },
    payorder() {
      this.page = "1";
      this.orderStatus = "0";
      this.payStatus = "1";
      this.orderlist();
    },
    nextpage() {
      this.page++;
      this.orderlist();
    },
    backpage() {
      this.page--;
      this.orderlist();
    }
  }
};
</script>

<style>
.ordericon {
  font-size: 27px;
  color: dodgerblue;
}
</style>

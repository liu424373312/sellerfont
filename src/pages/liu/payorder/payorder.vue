<template>
  <div id="payorder">
    <div class="page__bd" style="height: 100%;">
      <div class="weui-tab">
        <div class="weui-navbar">
          <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
            <i class="icon-paste ordericon" @click="neworder"></i>
            <p class="weui-tabbar__label">未支付订单</p>
          </a>
          <a class="weui-tabbar__item">
            <i class="icon-clipboard ordericon" @click="payorder"></i>
            <p class="weui-tabbar__label">已支付订单</p>
          </a>
        </div>
      </div>
    </div>
    <orderlist :orderlist='listdata' :orderStatus='orderStatus'></orderlist>
    <div class="page">
    <button class="weui-btn weui-btn_mini weui-btn_default" @click="backpage">上一页</button>
    <span>第{{page}}页</span>
    <button class="weui-btn weui-btn_mini weui-btn_default" @click="nextpage">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import orderlist from "../../../components/orderlist/orderlist";
import $ from "jquery";
export default {
  components: {
    orderlist
  },
  data() {
    return {
      token: "",
      listdata: [],
      orderStatus: "0",
      payStatus: "0",
      page: "1"
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
      axios
        .get(
            "/api/sell/seller/order/list?token=" +
            this.token +
            "&page=" +
            this.page +
            "&orderStatus=" +
            this.orderStatus +
            "&payStatus=" +
            this.payStatus
        )
        .then(res => {
          console.log(res);
          this.listdata = res.data.data.orderDTOVOList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    neworder() {
      this.orderStatus = "0";
      this.payStatus = "0";
      this.orderlist();
    },
    payorder() {
      this.orderStatus = "0";
      this.payStatus = "1";
      this.orderlist();
    },
    nextpage(){
      this.page++;
      this.orderlist();
    },
    backpage(){
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

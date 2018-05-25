<template>
  <div id="payorder">
    <div class="page__bd" style="height: 100%;">
      <div class="weui-tab">
        <div class="weui-navbar">
          <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
            <i class="icon-truck ordericon" @click="neworder"></i>
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
  </div>
</template>

<script>
import axios from "axios";
import orderlist from "../../../components/orderlist/orderlist";
import $ from "jquery";
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
export default {
  components: {
    orderlist
  },
  data() {
    return {
      token: "",
      api: "http://wxsell.nat200.top",
      listdata: [],
      orderStatus: "0",
      payStatus: "0"
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
          API_PROXY +
            this.api +
            "/sell/seller/order/list?token=" +
            this.token +
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

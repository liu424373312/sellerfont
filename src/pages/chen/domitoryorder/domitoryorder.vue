<template>
  <div id="domitoryorder">
    <div class="weui-panel__hd hd">寝室订单列表</div>
    <div v-for="n in 7" :key="n" class="weui-form-preview orderitem">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">付款金额</label>
          <em class="weui-form-preview__value">¥2400.00</em>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">7-6-222</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">2018-4-8 21:22:55</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">商品</label>
          <span class="weui-form-preview__value">商品1，商品1，商品1，商品1，商品1，商品1，商品1，商品1</span>
        </div>
      </div>
      <router-link to="orderdetail" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>查看详情</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </router-link>
      <div class="weui-form-preview__ft">
        <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:">操作</a>
        <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:">操作</button>
      </div>
    </div>
  </div>
</template>

<script>
import orderlist from "../../../components/orderlist/orderlist";
import axios from "axios";
export default {
  data() {
    return {
      orderNo: "",
      token: ""
    };
  },
  mounted() {
    /*let that = this;
    that.pushHistory();
    window.addEventListener('popstate',function(e){
      window.location.href="  http://rm4nka.natappfree.cc/domitory";
    },false);*/
  },
  created() {
    let token = this.getCookie("token");
    if (token === null || !token) {
      window.location.href = " http://rm4nka.natappfree.cc";
    } else {
      this.token = token;
    }
    this.orderNo = this.$route.params.dorOrder;
    console.log(this.orderNo);
    this.getDorOrder();
    //this.pushHistory();
  },
  methods: {
    pushHistory() {
      let state = {
        title: "title",
        url: "#"
      };
      window.history.pushState(state, "title", "#");
    },
    getDorOrder() {
      axios
        .get(
          "/api/sell/seller/order/list?token=" +
            this.token +
            "&groupNo=" +
            this.orderNo +
            "&payStatus=0"
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    orderlist
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

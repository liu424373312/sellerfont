<template>
  <div id="order">
    <search></search>
    <orderlist ref="chil"></orderlist>
    <div class="weui-tabbar tabbar">
      <!-- <a class="weui-tabbar__item" :class="index1" @click="tabbaritem1">
           <span style="display: inline-block;position: relative;">
               <i class="icon-box-remove ordericon"></i>
               <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>
           </span>
           <p class="weui-tabbar__label">待配送订单</p>
       </a>-->
      <a href="javascript:;" class="weui-tabbar__item" :class="index2" @click="tabbaritem2">
        <i class="icon-dropbox ordericon"></i>
        <p class="weui-tabbar__label">已配送订单</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item" :class="index3" @click="tabbaritem3">
        <!--<span style="display: inline-block;position: relative;">-->
        <i class="icon-clipboard ordericon"></i>
        <!--<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>-->
        <!--</span>-->
        <p class="weui-tabbar__label">已完结订单</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item" :class="index4" @click="tabbaritem4">
        <i class="icon-truck ordericon"></i>
        <p class="weui-tabbar__label">补货订单</p>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import orderlist from "../../components/orderlist/orderlist";
import search from "../../components/search/search";

const API_PROXY = "http://bird.ioliu.cn/v1?url=";
//var config = require('../../../config');
//config = process.env.NODE_ENV === 'development' ? config.dev : config.build;
export default {
  components: {
    orderlist,
    search
  },
  data() {
    return {
      index1: "weui-bar__item_on",
      index2: "",
      index3: "",
      index4: "",
      searchtext: true,
      token: "",
      //token: '6a9c6697-099f-41f9-baa5-e8292fd23b11',
      api: "http://wxsell.nat200.top"
      //re:this.replenishList
    };
  },
  created() {
    this.token = this.getCookie("token");
    //this.token = this.$route.params.token1;
    //console.log(this.token);
    //this.$refs.chil.getTokens(this.token);
    this.tabbaritem2();
  },
  methods: {
    tabbaritem1() {
      this.index1 = "weui-bar__item_on";
      this.index2 = "";
      this.index3 = "";
      this.index4 = "";
    },
    tabbaritem2() {
      this.index1 = "";
      this.index2 = "weui-bar__item_on";
      this.index3 = "";
      this.index4 = "";
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/dispatch/list?token=" +
            this.token
        )
        .then(res => {
          console.log(res);
          this.$refs.chil.show(res.data.data.list, 2, "完成", "取消");
        })
        .catch(err => {
          console.log(err);
        });
    },
    tabbaritem3() {
      this.index1 = "";
      this.index2 = "";
      this.index3 = "weui-bar__item_on";
      this.index4 = "";
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
          this.$refs.chil.show(res.data.data.orderDTOVOList, 3);
        })
        .catch(err => {
          console.log(err);
        });
    },
    tabbaritem4() {
      this.index1 = "";
      this.index2 = "";
      this.index3 = "";
      this.index4 = "weui-bar__item_on";

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
          //console.log(this.replenishList);
          this.$refs.chil.show(res.data.data.list, 4, "补货", "取消补货");
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchshow() {
      this.searchtext = false;
      this.$refs.searchinput.focus();
    },
    searchhide() {
      this.searchtext = true;
    },
    searchclear() {
      this.searchtext = false;
      this.$refs.searchinput.focus();
    }
  }
};
</script>

<style>
.tabbar {
  position:fixed;
  bottom: 0;
}
.ordericon {
  font-size: 27px;
  color: dodgerblue;
}
</style>

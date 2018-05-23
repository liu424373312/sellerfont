<template>
  <div id="payorder">
    <searchorder></searchorder>
      <orderlist :orderlist='listdata' :orderStatus='orderStatus'></orderlist>
  </div>
</template>

<script>
import axios from "axios";
import searchorder from "../../../components/search/searchorder";
import orderlist from "../../../components/orderlist/orderlist";
import $ from "jquery";
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
export default {
  components: {
    orderlist,
    searchorder
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
  },
  mounted() {
  },
  methods: {
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

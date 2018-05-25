<template>
    <div id="authorize">
    </div>
</template>

<script>
import axios from "axios";
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
var qs = require("qs");
export default {
  data() {
    return {
    };
  },
  components: {},
  methods: {
  },
  created() {
       window.location.href='http://wxsell.nat200.top/sell/wechat/authorize?returnUrl=http://wxsell.nat200.top/sellerInterface/#/';//izwu24.natappfree.cc/#/'//http://wxsell.nat200.top/sellerInterface/#/';
  }
};
</script>

<style>

</style>

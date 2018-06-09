<template>
    <div id="authorize">
    </div>
</template>

<script>
import axios from "axios";
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
       window.location.href='/api/sell/wechat/authorize?returnUrl=http://wxsell.nat200.top/sellerInterface/#/';//izwu24.natappfree.cc/#/'//http://wxsell.nat200.top/sellerInterface/#/';
  }
};
</script>

<style>

</style>

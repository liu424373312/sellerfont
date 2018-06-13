<template>
    <div id="authorize">
    </div>
</template>

<script>
import axios from "axios";
var qs = require("qs");
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
    };
  },
  components: {},
  methods: {
  },
  created() {
       window.location.href=config.sellerUrl+'/sell/wechat/authorize?returnUrl='+'http://7h9ybt.natappfree.cc'/*config.sellerUrl*/+'/sellerInterface/#/';//izwu24.natappfree.cc/#/'//http://wxsell.nat200.top/sellerInterface/#/';
  }
};
</script>

<style>

</style>

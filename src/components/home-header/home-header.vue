<template>
  <div id="home-header">
    <div class="weui-cell">
      <div class="weui-cell__hd"><img :src="this.headImg" alt="" style="width:20px;margin-right:5px;display:block">
      </div>
      <div class="weui-cell__bd">
        {{nickname}}
      </div>
      <div class="weui-cell__ft" @click="out">登出</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import weui from "weui.js";
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
//http://wxsell.nat200.top;
export default {
  data() {
    return {
      headImg: "",
      token: "",
      nickname: "",
      api: "http://wxsell.nat200.top"
    };
  },
  created() {
    this.headImg = this.getCookie("headImg");
    this.nickname = this.getCookie("username");
  },
  methods: {
    out() {
      this.token = this.getCookie("token");
      //console.log(this.token);
      axios
        .get(API_PROXY + this.api + "/sell/seller/logout?token=" + this.token)
        .then(res => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("登出成功", {
              duration: 2000
            });
            window.location.href = " http://9d7xrf.natappfree.cc";
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
#out {
  position: absolute;
  width: 80px;
  height: 30px;
  top: 10px;
  right: 10px;
  background: #0bb20c;
  border-radius: 5px;
}

#out span {
  display: block;
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  position: absolute;
  margin-top: 7px;
  margin-left: 30%;
  color: #fff;
}
</style>

<template>
  <div id="home-header">
    <div class="weui-cell" style="background-color:#fff">
      <div class="weui-cell__hd">
        <router-link to="home" style="display:inline;font-size:14px;line-height:14px;">主页</router-link>
        <img :src="this.headImg" alt="" style="width:20px;margin-right:5px;margin-left:5px">
      </div>
      <div class="weui-cell__bd">
        <p style="display:inline;font-size:14px;line-height:14px;">{{this.schoolName}}</p>
      </div>
      <div class="weui-cell__ft">
        <div id="out" @click="out">
          <span>登出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import weui from "weui.js";
var config = require("../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
      headImg: "",
      token: "",
      nickname: "",
      schoolName: "",
      schoolNo: "",
      arr: ""
    };
  },
  created() {
    this.headImg = this.getCookie("headImg");
    this.schoolNo = this.getCookie("schoolNo");
    this.getSchool();
    console.log(this.$route.name);
  },
  methods: {
    getSchool() {
      axios
        .get(config.sellerUrl + "/sell/seller/school/list?token=" + this.token)
        .then(res => {
          console.log(res);
          //this.arr = res.data.data[0].schoolNo;
          //console.log(typeof(res.data.data[0].schoolNo));
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].schoolNo === this.schoolNo) {
              this.schoolName = res.data.data[i].schoolName;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    out() {
      this.token = this.getCookie("token");
      //console.log(this.token);
      axios
        .get(config.sellerUrl + "/sell/seller/logout?token=" + this.token)
        .then(res => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("登出成功", {
              duration: 2000
            });
            window.location.href =
              config.sellerUrl + "/sellerInterface/#/authorize";
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
  top: 5px;
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

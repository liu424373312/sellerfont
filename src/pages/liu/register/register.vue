<template>
    <div id="register">
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">用户名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="username" placeholder="请输入用户名" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">密码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="password" type="password" placeholder="请输入密码" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="name" type="text" pattern="[0-9]*" placeholder="请输入姓名" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">电话</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="phone" type="number" pattern="[0-9]*" placeholder="请输入电话" />
                </div>
            </div>
        </div>
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="register">注册</a>
    </div>
</template>

<script>
import weui from "weui.js";
import $ from "jquery";
import axios from "axios";
import qs from "qs";
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
let param = new FormData();
export default {
  data() {
    return {
        openid: "oSpuJ1ryJLJwSnRbusu8wa1XjqnM",
        schoolNo: "1",
        rank: 0,
        username:'',
        password:'',
        name:'',
        phone:''
    };
  },
  created() {
    this.openid = this.getQueryOpenid("openid");
    this.setCookie("openid", this.openid, 1);
    this.schoolNo = this.getQueryOpenid("schoolNo");
    this.rank = this.getQueryOpenid("rank");
  },
  methods: {
    register() {
      var loading = weui.loading("注册中");
      axios
        .post(
          config.sellerUrl + "/sell/seller/register",
          qs.stringify({
            username: this.username,
            password: this.password,
            openid: this.openid,
            name: this.name,
            phone: this.phone,
            schoolNo: this.schoolNo,
            rank: this.rank
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }
        )
        .then(response => {
          console.log(response.data);
          this.setCookie("token", response.data.data.token, 1);
          this.setCookie("username", this.username, 1);
          this.setCookie("password", this.password, 1);
          console.log(this.password);
          console.log(this.getCookie("token"));
          loading.hide();
          weui.toast("注册成功", {
            duration: 3000
          });
          this.$router.push({ name: "home" });
        })
        .catch(function(err) {
          console.log(err);
          loading.hide();
          weui.alert("注册失败");
        });
    },
    getQueryOpenid(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
  mounted() {}
};
</script>

<style>
</style>

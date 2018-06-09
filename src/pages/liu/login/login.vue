<template>
  <div id="login">
    <div class="weui-cells weui-cells_form">
      <form>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">用户名</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="username" type="number" pattern="[0-9]*" placeholder="请输入用户名" />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">密码</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="password" type="password" pattern="[0-9]*" placeholder="请输入密码" />
          </div>
        </div>
      </form>
      <div @click="login" class="weui-btn weui-btn_primary">登录</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import weui from "weui.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      id: "",
      token: "",
      openid: "",
      nickname: ""
    };
  },
  created() {
    this.openid = "oSpuJ1ryJLJwSnRbusu8wa1XjqnM";
    // this.openid = this.getQueryOpenid("openid");
    //let nickname=this.getQueryOpenid("nickname");
    let headImg = this.getQueryOpenid("headImgUrl");
    this.setCookie("headImg", headImg, 1);
    this.setCookie("openid", this.openid, 1);
    //this.setCookie("nickname",this.nickname,1);
  },
  methods: {
    login() {
      var loading = weui.loading("登录中");
      if (this.username === "") {
        weui.topTips("账号不能为空!");
      }
      if (this.password === "") {
        weui.topTips("密码不能为空!");
      }
      axios
        .post("/api/sell/seller/login",
          qs.stringify({
            username: this.username,
            password: this.password,
            openid: this.openid
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }
        )
        .then(response => {
          console.log(response.data);
          console.log(response.data.data.schoolNo);
          if (response.data.msg === "成功") {
            this.setCookie("token", response.data.data.token, 1);
            this.setCookie("schoolNo", response.data.data.schoolNo, 1);
            this.setCookie("username", this.username, 1);
            this.setCookie("password", this.password, 1);
            loading.hide();
            weui.toast("登录成功", {
              duration: 1000
            });
            this.$router.push({
              name: "home",
              params: { openid: this.openid }
            });
          } else {
            loading.hide();
            if (this.openid !== "") {
              weui.topTips("账号或密码错误!");
            } else {
              weui.topTips("请关闭当前页面重新登录");
            }
          }
        })
        .catch(function(err) {
          console.log(err);
          loading.hide();
          weui.alert("用户名或者密码错误");
        });
    },
    getQueryOpenid(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    getQueryOpenid(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    showdialog() {
      this.dialogshow = true;
    },
    hidedialog() {
      this.dialogshow = false;
    }
  }
};
</script>

<style>
</style>

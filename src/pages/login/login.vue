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
      <div @click="showdialog" class="weui-btn weui-btn_primary">注册</div>
      <div class="js_dialog" v-show="dialogshow">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
          <div class="weui-dialog__hd">
            <strong class="weui-dialog__title">注册</strong>
          </div>
          <div class="weui-dialog__title">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">用户名</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" v-model="username" pattern="[0-9]*" placeholder="请输入用户名" />
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">密码</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" v-model="password" type='password' pattern="[0-9]*" placeholder="请输入密码" />
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">姓名</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" v-model="name" pattern="[0-9]*" placeholder="请输入姓名" />
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">电话</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" v-model="phone" type='number' pattern="[0-9]*" placeholder="请输入电话" />
              </div>
            </div>
          </div>
          <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="register">注册</a>
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="hidedialog">取消</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import jq from "jquery";
import weui from "weui.js";
const API_PROXY = "https://bird.ioliu.cn/v2/?url=";
export default {
  data() {
    return {
      username: "",
      password: "",
      id: "",
      api: "http://wxsell.nat200.top",
      name: "",
      phone: "",
      schoolNo: "",
      token: "",
      openid: "",
      dialogshow: false
    };
  },
  created() {
    this.openid = this.getQueryOpenid("openid");
    console.log(this.openid);
    let headImg = this.getQueryOpenid("headImgUrl");
    this.setCookie("headImg", headImg, 1);
    this.setCookie("openid", this.openid, 1);
  },
  methods: {
    login() {
      var loading = weui.loading("登录中");
      axios
        .post(
          this.api + "/sell/seller/login",
          qs.stringify({
            username: this.username,
            password: this.password,
            openid: "obyKk03u_aXXqia8BjLNv2_Wq51E"
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
          console.log(this.getCookie("token"));
          loading.hide();
          weui.toast("登录成功", {
            duration: 3000
          });
          this.$router.push({ name: "home", params: { openid: this.openid } });
        })
        .catch(function(err) {
          console.log(err);
          loading.hide();
          weui.alert("用户名或者密码错误");
        });
    },
    register() {
      this.hidedialog();
      var loading = weui.loading("注册中");
      axios
        .post(
          this.api + "/sell/seller/register",
          qs.stringify({
            username: this.username,
            password: this.password,
            openid: "obyKk03u_aXXqia8BjLNv2_Wq51E",
            name: this.name,
            phone: this.phone,
            schoolNo: this.schoolNo,
            rank: 0
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

<template>
    <div id="register">
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">用户名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="data.productName" placeholder="请输入用户名" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">密码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="data.productPrice" type="password" placeholder="请输入密码" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="data.purchasePrice" type="text" pattern="[0-9]*" placeholder="请输入姓名" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">电话</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="data.productStock" type="number" pattern="[0-9]*" placeholder="请输入电话" />
                </div>
            </div>
        </div>
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="addgoods">注册</a>
    </div>
</template>

<script>
import weui from "weui.js";
import $ from "jquery";
import axios from "axios";
import qs from "qs";
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
let param = new FormData();
export default {
  data() {
    return {
      api: "http://wxsell.nat200.top",
      data: {
        token: this.getCookie("token")
      }
    };
  },
  created() {
    this.token = this.getCookie("token");
  },
  methods: {
    register() {
      this.hidedialog();
      var loading = weui.loading("注册中");
      axios
        .post(
          this.api + "/sell/seller/register",
          qs.stringify({
            username: this.username,
            password: this.password,
            openid: this.openid,
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
    }
  },
  mounted() {}
};
</script>

<style>

</style>

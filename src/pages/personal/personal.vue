<template>
    <div id="personal">
        <div class="weui-cells__title hd">修改信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access" @click="showdialog">
                <div class="weui-cell__bd">
                    <p>修改密码</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
        <div class="js_dialog" v-show="dialogshow">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd">
                    <strong class="weui-dialog__title">修改密码</strong>
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
                            <label class="weui-label">原密码</label>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="password" type='password' pattern="[0-9]*" placeholder="请输入原密码" />
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">新密码</label>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="newpassword" type='password' pattern="[0-9]*" placeholder="请输入新密码" />
                        </div>
                    </div>
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="changepassword">确认</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="hidedialog">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import weui from 'weui.js'
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
var qs = require("qs");
export default {
  data() {
    return {
      username: this.getCookie("username"),
      password: "",
      newpassword: "",
      dialogshow: false,
      api: "http://wxsell.nat200.top",
      token:this.getCookie('token')
    };
  },
  components: {},
  methods: {
    showdialog() {
      this.dialogshow=true;
    },
    hidedialog() {
      this.dialogshow=false;
    },
    changepassword() {
      this.hidedialog();
      if (this.password == this.getCookie("password")) {
        var loading = weui.loading("提交中");
        axios
          .post(
            this.api + "/sell/seller/update",
            qs.stringify({
              token: this.token,
              username: this.username,
              password: this.newpassword
            }),
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
          )
          .then(response => {
            console.log(response.data);
            loading.hide();
            weui.toast("修改成功", {
              duration: 3000
            });
          })
          .catch(function(err) {
            console.log(err);
            loading.hide();
            weui.alert("修改失败");
          });
      }else{
          weui.alert("密码错误");
      }
    }
  },
  created() {}
};
</script>

<style>

</style>

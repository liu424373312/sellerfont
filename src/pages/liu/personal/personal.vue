<template>
    <div id="personal">
        <div class="weui-cells__title">注册管理员</div>
        <div class="weui-cells" @click="showpic">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>卖家注册二维码</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
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
                            <label class="weui-label">原密码</label>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="oldpassword" type='password' pattern="[0-9]*" placeholder="请输入原密码" />
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
        <div class="js_dialog" v-show="picshow" @click="hidepic">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <img :src="pic" style="">
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import weui from "weui.js";
var qs = require("qs");
export default {
  data() {
    return {
      username: this.getCookie("username"),
      password: "",
      newpassword: "",
      oldpassword: "",
      dialogshow: false,
      picshow: false,
      token: this.getCookie("token"),
      pic:
        "/api/sell/seller/qrcode/createAdmin?token=" + this.getCookie("token")
    };
  },
  components: {},
  methods: {
    showdialog() {
      this.dialogshow = true;
    },
    hidedialog() {
      this.dialogshow = false;
    },
    showpic() {
      this.picshow = true;
    },
    hidepic() {
      this.picshow = false;
    },
    changepassword() {
      this.hidedialog();

      var loading = weui.loading("提交中");
      axios
        .post(
          "/api/sell/seller/update",
          qs.stringify({
            token: this.token,
            passwordOld: this.oldpassword,
            passwordNew: this.newpassword
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }
        )
        .then(response => {
          console.log(response);
          loading.hide();
          if (response.data.code == 0) {
            weui.toast("修改成功", {
              duration: 3000
            });
            this.oldpassword = "";
            this.newpassword = "";
          } else {
            weui.alert("修改失败");
          }
        })
        .catch(function(err) {
          console.log(err);
          loading.hide();
          weui.alert("修改失败");
        });
    }
  },
  created() {}
};
</script>

<style>
</style>

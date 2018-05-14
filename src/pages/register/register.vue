<template>
    <div id="register">
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">商品名称</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="data.productName" pattern="[0-9]*" placeholder="请输入商品名称" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">商品售价</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="data.productPrice" type="number" pattern="[0-9]*" placeholder="请输入商品价格" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">商品进价</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="data.purchasePrice" type="number" pattern="[0-9]*" placeholder="请输入商品价格" />
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">商品库存</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="data.productStock" type="number" pattern="[0-9]*" placeholder="请输入商品库存" />
                </div>
            </div>
        </div>
        <div class="weui-cells__title">商品描述</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea v-model="data.productDescription" class="weui-textarea" placeholder="请输入商品描述" rows="3"></textarea>
                    <div class="weui-textarea-counter">
                        <span>0</span>/200</div>
                </div>
            </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">商品类目</label>
            </div>
            <div class="weui-cell__bd">
                <select v-model="data.categoryType" class="weui-select" name="select2">
                    <option :value="item.type" v-for="(item,index) in goodsclass" :key="index">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="page__bd">
            <div class="weui-gallery" id="gallery">
                <span class="weui-gallery__img" id="galleryImg"></span>
                <div class="weui-gallery__opr">
                    <a href="javascript:" class="weui-gallery__del">
                        <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                    </a>
                </div>
            </div>
            <div class="weui-cells weui-cells_form" id="uploader">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <div class="weui-uploader">
                            <div class="weui-uploader__hd">
                                <p class="weui-uploader__title">图片上传</p>
                                <div class="weui-uploader__info">
                                    <span id="uploadCount">0</span>/5</div>
                            </div>
                            <div class="weui-uploader__bd">
                                <ul class="weui-uploader__files" id="uploaderFiles" @click="handleClickUploadList"></ul>
                                <div class="weui-uploader__input-box">
                                    <input @change="update" name="file" id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" capture="camera" multiple="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="addgoods">提交</a>
    </div>
</template>

<script>
import weui from "weui.js";
import $ from "jquery";
import axios from "axios";
import qs from "qs";
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
var uploadCount = 0;
var uploadList = [];
var uploadCountDom = null;
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

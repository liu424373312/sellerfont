<template>
  <div id="addgoods">
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
                  <input @change="update" name="file" id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" />
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
var uploadCount = 0;
var uploadList = [];
var uploadCountDom = null;
let param = new FormData();
export default {
  data() {
    return {
      data: {
        token: this.getCookie("token"),
        productName: "",
        productPrice: "",
        purchasePrice: "",
        productStock: "",
        productDescription: "",
        categoryType: 1,
        file: "",
        productIcon: ""
      },
      token: this.getCookie("token"),
      goodsclass: []
    };
  },
  created() {
    this.token = this.getCookie("token");
    axios
      .get("/api/sell/seller/product/list?token=" + this.token
      )
      .then(response => {
        console.log(response.data);
        this.goodsclass = response.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    addgoods() {
      var loading = weui.loading("提交中");
      param.append("token", this.data.token);
      param.append("productName", this.data.productName);
      param.append("productPrice", this.data.productPrice);
      param.append("purchasePrice", this.data.purchasePrice);
      param.append("productStock", this.data.productStock);
      param.append("productDescription", this.data.productDescription);
      param.append("categoryType", this.data.categoryType);
      axios
        .post("/api/sell/seller/product/save", param, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          loading.hide();
          weui.toast("添加成功", {
            duration: 3000
          });
        })
        .catch(function(err) {
          console.log(err);
          loading.hide();
          weui.alert("错误");
        });
    },
    handleClickUploadList(e) {
      var target = e.target;
      var uploadCountDom = document.getElementById("uploadCount");
      while (!target.classList.contains("weui-uploader__file") && target) {
        target = target.parentNode;
      }
      if (!target) return;

      var url = target.getAttribute("style") || "";
      var id = target.getAttribute("data-id");

      if (url) {
        url = url.match(/url\((.*?)\)/)[1].replace(/"/g, "");
      }
      var gallery = weui.gallery(url, {
        className: "custom-name",
        onDelete: function() {
          weui.confirm("确定删除该图片？", function() {
            --uploadCount;
            uploadCountDom.innerHTML = uploadCount;

            for (var i = 0, len = uploadList.length; i < len; ++i) {
              var file = uploadList[i];
              if (file.id == id) {
                file.stop();
                break;
              }
            }
            target.remove();
            gallery.hide();
          });
        }
      });
    },
    update(e) {
      // 上传照片
      var self = this;
      let file = e.target.files[0];
      /* eslint-disable no-undef */
      param.append("file", file, file.name); // 通过append向form对象添加数据
    }
  },
  mounted() {
    var uploadCountDom = document.getElementById("uploadCount");
    weui.uploader("#uploader", {
      url:
        "/api/sell/seller/product/save?token=6bcafe2e-61e6-4400-b312-2b9a846f4bf3",
      auto: false,
      type: "file",
      fileVal: "fileVal",
      compress: {
        width: 1600,
        height: 1600,
        quality: 0.8
      },
      onBeforeQueued: function(files) {
        if (
          ["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(
            this.type
          ) < 0
        ) {
          weui.alert("请上传图片");
          return false;
        }
        if (this.size > 10 * 1024 * 1024) {
          weui.alert("请上传不超过10M的图片");
          return false;
        }
        if (files.length > 5) {
          // 防止一下子选中过多文件
          weui.alert("最多只能上传5张图片，请重新选择");
          return false;
        }
        if (uploadCount + 1 > 5) {
          weui.alert("最多只能上传5张图片");
          return false;
        }

        ++uploadCount;
        uploadCountDom.innerHTML = uploadCount;
      },
      onQueued: function() {
        uploadList.push(this);
        console.log(this);
      },
      onBeforeSend: function(data, headers) {
        console.log(this, data, headers);
        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

        // return false; // 阻止文件上传
      },
      onProgress: function(procent) {
        console.log(this, procent);
      },
      onSuccess: function(ret) {
        console.log(this, ret);
      },
      onError: function(err) {
        console.log(this, err);
      }
    });
  }
};
</script>

<style>

</style>

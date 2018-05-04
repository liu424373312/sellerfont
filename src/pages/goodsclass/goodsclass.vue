<template>
    <div id="goodsclass">
        <div @click="showDialog2" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
                <p>添加商品类目</p>
            </div>
            <div class="weui-cell__ft"></div>
        </div>
        <div class="weui-cells__title">商品类目</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access" @click="showDialog1(item)" v-for="(item,index) in goodsclass" :key="index">
                <div class="weui-cell__bd">
                    <p>{{item.categoryName}}</p>
                </div>
                <div class="weui-cell__ft">编号:{{item.categoryType}}
                </div>
            </div>
        </div>
        <div class="js_dialog" v-show="dialogshow1">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd">
                    <strong class="weui-dialog__title">修改商品类目</strong>
                </div>
                <div class="weui-dialog__bd">
                    <div class="weui-cell">
                        <input class="weui-input" v-model="newgoodsclass.categoryName" placeholder="请输入修改信息">
                    </div>
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;"  class="weui-dialog__btn weui-dialog__btn_primary" @click="modify">确认</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="hideDialog1">取消</a>
                </div>
            </div>
        </div>
        <div class="js_dialog" v-show="dialogshow2">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd">
                    <strong class="weui-dialog__title">添加商品类目</strong>
                </div>
                <div class="weui-dialog__bd">
                    <div class="weui-cell">
                        <input class="weui-input" v-model="categoryName" placeholder="请输入商品类目名称">
                    </div>
                    <div class="weui-cell">
                        <input class="weui-input" v-model="categoryType" placeholder="请输入商品类目编号">
                    </div>
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="add">确认</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="hideDialog2">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import $ from "jquery";
import weui from "weui.js";
import axios from "axios";
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
var $Dialog = $("#Dialog");
export default {
  data() {
    return {
      api: "http://wxsell.nat200.top",
      token: "",
      goodsclass: [],
      newgoodsclass: {
        categoryId: "",
        categoryName: "",
        categoryType: ""
      },
      dialogshow1: false,
      dialogshow2: false,
      categoryName: "",
      categoryType: ""
    };
  },
  created() {
    this.getgoodsclass();
  },
  methods: {
    showDialog1(item) {
      this.newgoodsclass = item;
      this.dialogshow1 = true;
    },
    hideDialog1() {
      this.dialogshow1 = false;
      this.getgoodsclass();
    },
    showDialog2() {
      this.dialogshow2 = true;
    },
    hideDialog2() {
      this.dialogshow2 = false;
      this.getgoodsclass();
    },
    modify() {
      var loading = weui.loading("提交中");
      axios
        .post(
          this.api + "/sell/seller/category/save",
          qs.stringify({
            categoryId: this.newgoodsclass.categoryId,
            categoryName: this.newgoodsclass.categoryName,
            categoryType: this.newgoodsclass.categoryType
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(response => {
          console.log(response.data);
          loading.hide();
          weui.toast("修改成功", {
            duration: 3000
          });
          this.hideDialog1();
          this.getgoodsclass();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    add() {
      var loading = weui.loading("提交中");
      axios
        .post(
          this.api + "/sell/seller/category/save",
          qs.stringify({
            categoryName: this.categoryName,
            categoryType: this.categoryType
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(response => {
          console.log(response.data);
          loading.hide();
          weui.toast("修改成功", {
            duration: 3000
          });
          this.hideDialog2();
          this.getgoodsclass();
        })
        .catch(function(err) {
          loading.hide();
          console.log(err);
        });
    },
    getgoodsclass() {
      this.newgoodsclass = "";
      this.categoryName = "";
      this.categoryType = "";
      this.token = this.getCookie("token");
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/category/list?token=" +
            this.token
        )
        .then(response => {
          console.log(response.data);
          this.goodsclass = response.data.data;
          //   this.$nextTick(() => {
          //     this._initScroll();
          //     this._calculateHeight();
          //   });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {}
};
</script>

<style>

</style>

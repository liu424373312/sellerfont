<template>
  <div id="stockout">
    <div class="weui-cells__title">
      <span class="weui-media-box__title" style="font-weight: bold">{{this.goodsList.templateName}}</span>&nbsp;商品模板</div>
    <div class="weui-panel__bd" v-if="deleteStatus === 0" v-for="(item,index) in this.goodsList.templateDetailList" :key="index">
      <div class="weui-cells weui-cells_checkbox">
        <label class="weui-cell weui-check__label" for="s11">
          <!--<div class="weui-cell__hd">
            <input type="checkbox" class="weui-check" name="checkbox1" id="s11" :value="item.templateId" @click="getss($event)"/>
            <i class="weui-icon-checked"></i>
          </div>-->
          <div class="weui-cell__bd">
            <p class="weui-media-box__title">{{item.productName}}</p>
          </div>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">x{{item.productQuantity}}
            </div>
          </a>
        </label>
      </div>
    </div>
    <div class="weui-form-preview__ft" v-if="deleteStatus === 0">
      <button class="weui-form-preview__btn weui-form-preview__btn_primary" @click="createRE" style="background:#0bb20c;color:#fff;">创建配送单</button>
      <button class="weui-form-preview__btn weui-form-preview__btn_primary" @click="delRE" style="background:red;color:#fff;">删除模板</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import weui from "weui.js";
export default {
  data() {
    return {
      groupNo: "",
      token: "",
      goodsList: [],
      items: "",
      templateId: "",
      deleteStatus: 0
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.groupNo = this.getCookie("groupNo");
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          "/api/sell/seller/template/detail?token=" +
            this.token +
            "&groupNo=" +
            this.groupNo
        )
        .then(res => {
          console.log(res);
          this.goodsList = res.data.data;
          this.deleteStatus = this.goodsList.deleteStatus;
          if (this.deleteStatus === 1) {
            weui.alert("暂未创建模板!");
            //this.$router.go(-1);
          }
          this.templateId = this.goodsList.templateId;
          console.log(this.goodsList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createRE() {
      axios
        .get(
          "/api/sell/seller/template/create_replenish?token=" +
            this.token +
            "&templateId=" +
            this.templateId
        )
        .then(res => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("创建订单成功!", {
              duration: 1000
            });
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          weui.alert("创建订单失败!");
        });
    },
    delRE() {
      axios
        .get(
          "/api/sell/seller/template/delete?token=" +
            this.token +
            "&templateId=" +
            this.templateId
        )
        .then(res => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("删除成功!", {
              duration: 1000
            });
            this.$router.go(-1);
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(err => {
          weui.topTips("删除失败!");
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>

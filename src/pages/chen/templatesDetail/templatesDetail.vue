<template>
  <div id="categorydetail">
    <div class="weui-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">创建时间</label>
          <span class="weui-form-preview__value">{{this.upTime}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">更新时间</label>
          <span class="weui-form-preview__value">{{this.upTime}}</span>
        </div>
      </div>
    </div>
    <div class="weui-panel__hd hd">商品列表</div>
    <div class="domitorylist">
      <div v-for="(item,index) in this.crGoods" :key="index" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">{{item.productName}}</h4>
          <p class="weui-media-box__desc">商品数量:{{item.productQuantity}}</p>
        </div>
        <!--<carcontrol :food="item"></carcontrol>&nbsp;&nbsp;&nbsp;&nbsp;-->
        <!--<a href="javascript:;" class="weui-btn weui-btn_warn weui-btn_mini" @click="delCR">删除</a>-->
      </div>
    </div>
    <div class="weui-form-preview__ft" style="background:#0bb20c;">
      <button class="weui-form-preview__btn weui-form-preview__btn_primary" @click="showdialog">
        <span style="color:#fff;">创建补货单</span>
      </button>
      <a href="javascript:;" class="weui-form-preview__btn weui-btn_warn" @click="delCR">
        <span style="color:#fff;">删除模板</span>
      </a>
    </div>
    <div class="js_dialog" v-show="dialogshow">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">创建补货单</strong>
        </div>
        <div class="weui-dialog__bd">
          <div class="weui-cell">
            <input class="weui-input" v-model="groupNo" placeholder="请输入寝室号">
          </div>
        </div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="createRE">确认</a>
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="hidedialog">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import weui from "weui.js";
import carcontrol from "../../../components/carcontrol/carcontrol";
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
      crdetails: [],
      token: "",
      templateId: "",
      groupNo: "",
      upTime: "",
      createTime: "",
      crGoods: [],
      templateId: "",
      dialogshow: false
    };
  },
  created() {
    this.token = this.getCookie("token");
    console.log(this.token);
    this.templateId = this.getCookie("templateId");
    console.log(this.templateId);
    this.getDetailList();
  },
  methods: {
    getDetailList() {
      console.log(this.crGoods);
      this.crGoods.splice(0, this.crGoods.length);
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/template/detail?token=" +
            this.token +
            "&templateId=" +
            this.templateId
        )
        .then(res => {
          console.log(res);
          this.crdetails = res.data.data;
          console.log(this.crdetails);
          this.templateId = this.crdetails.templateId;
          console.log(this.templateId);
          this.crGoods = this.crdetails.templateDetailList;
          //console.log(this.details);
          console.log(this.crdetails.createTime.toString().length);
          if (this.crdetails.createTime.toString().length === 10) {
            var date = new Date(this.crdetails.createTime * 1000);
          } else {
            var date = new Date(this.crdetails.createTime);
          }
          this.crTimes(date);
          if (this.crdetails.updateTime.toString().length === 10) {
            var date1 = new Date(this.crdetails.updateTime * 1000);
          } else {
            var date1 = new Date(this.crdetails.updateTime);
          }
          this.upTimes(date1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createRE() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/template/create_replenish?token=" +
            this.token +
            "&templateId=" +
            this.templateId +
            "&groupNo=" +
            this.groupNo
        )
        .then(res => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("创建补货单成功!", {
              duration: 1000
            });
            this.$router.push({ name: "templates" });
          } else {
            weui.topTips(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          weui.topTips("创建补货单失败!");
        });
    },
    delCR() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/template/delete?token=" +
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
            //window.location.href="http://izwu24.natappfree.cc/#/templates";
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(err => {
          weui.alert("删除失败!");
          console.log(err);
        });
    },
    crTimes(date1) {
      var Y = date1.getFullYear();
      //console.log(Y);
      //console.log(dorTime);
      var M =
        date1.getMonth() + 1 < 0
          ? +(date1.getMonth() + 1)
          : date1.getMonth() + 1;
      //console.log(M);
      var D = date1.getDate();
      //console.log(D);
      var h = date1.getHours();
      //console.log(h);
      var m =
        date1.getMinutes() < 10 ? "0" + date1.getMinutes() : date1.getMinutes();
      //console.log(m);
      var s =
        date1.getSeconds() < 10 ? "0" + date1.getSeconds() : date1.getSeconds();
      //console.log(s);
      this.createTime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
      //console.log(this.createsTime);
      //return this.createsTime;
    },
    upTimes(date1) {
      var Y = date1.getFullYear();
      //console.log(Y);
      //console.log(dorTime);
      var M =
        date1.getMonth() + 1 < 0
          ? +(date1.getMonth() + 1)
          : date1.getMonth() + 1;
      //console.log(M);
      var D = date1.getDate();
      //console.log(D);
      var h = date1.getHours();
      //console.log(h);
      var m =
        date1.getMinutes() < 10 ? "0" + date1.getMinutes() : date1.getMinutes();
      //console.log(m);
      var s =
        date1.getSeconds() < 10 ? "0" + date1.getSeconds() : date1.getSeconds();
      //console.log(s);
      this.upTime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
      //console.log(this.createsTime);
      //return this.createsTime;
    },
    showdialog(index, item) {
      this.dialogshow = true;
    },
    hidedialog() {
      this.dialogshow = false;
    }
  },
  components: {
    carcontrol: carcontrol
  }
};
</script>

<style>
</style>

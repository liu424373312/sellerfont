<template>
  <div id="replenishdetail">
    <div class="weui-panel__hd ">订单信息</div>
    <div class="weui-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">{{replenishdetail.groupNo}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">姓名</label>
          <span class="weui-form-preview__value">{{replenishdetail.userName}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">电话</label>
          <span class="weui-form-preview__value">{{replenishdetail.userPhone}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">金额</label>
          <span class="weui-form-preview__value">{{replenishdetail.replenishAmount}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">{{getLocalTime(replenishdetail.updateTime)}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单状态</label>
          <span class="weui-form-preview__value">{{orderstatus(replenishdetail.replenishStatus)}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单编号</label>
          <span class="weui-form-preview__value">{{replenishdetail.replenishId}}</span>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">商品列表</div>
    <div class="weui-cells">
      <a class="weui-cell" v-for="(item,index) in replenishdetail.replenishDetailList" :key="index">
        <div class="weui-cell__hd" @click="goodsdetail(item)"><img :src="item.productIcon" alt="" style="width:20px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd" @click="goodsdetail(item)">
          <p>{{item.productName}}</p>
        </div>
        <div class="weui-cell__ft">
          <span @click="decreseQuantity(index)">
            <i style="margin-right:5px; font-size: 10px; color: dodgerblue;" class="icon-minus"></i>
          </span>{{item.productQuantity}}
          <span @click="addQuantity(index)">
            <i style="margin-left: 5px;font-size: 10px; color: dodgerblue;" class="icon-plus"></i>
          </span>
        </div>
      </a>
    </div>
    <a v-if="replenishdetail.replenishStatus==0" class="weui-btn weui-btn_primary" @click="createRE">生成配送单</a>
    <a class="weui-btn weui-btn_warn" @click="cancel">取消</a>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import weui from "weui.js";
import Cartcontrol from "../../../components/carcontrol/carcontrol";
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  components: {
    Cartcontrol
  },
  data() {
    return {
      token: "",
      replenishId: "",
      replenishdetail: "",
      data: [],
      goods: [],
      listHeight: []
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.replenishId = this.getCookie("replenishId");
    var loading = weui.loading("加载中");
    axios
      .get(
        config.sellerUrl +
          "/sell/seller/replenish/detail?replenishId=" +
          this.replenishId
      )
      .then(response => {
        console.log(response.data);
        this.replenishdetail = response.data.data;
        loading.hide();
      })
      .catch(function(err) {
        console.log(err);
        loading.hide();
      });
  },
  methods: {
    decreseQuantity(index) {
      this.replenishdetail.replenishDetailList[index].productQuantity--;
    },
    addQuantity(index) {
      this.replenishdetail.replenishDetailList[index].productQuantity++;
    },
    orderstatus(item) {
      if (item == "0") {
        return "待生成配送单";
      } else {
        return "已生成配送单";
      }
    },
    goodsdetail(item) {
      this.setCookie("productId", item.productId, 1);
      this.$router.push("goodsdetail");
    },
    setFoods() {
      this.amount = 0;
      let str = "[";
      for (
        let i = 0;
        i < this.replenishdetail.replenishDetailList.length;
        i++
      ) {
        let replenishId = this.replenishdetail.replenishDetailList[i]
          .replenishId;
        let productId = this.replenishdetail.replenishDetailList[i].productId;
        let productQuantity = this.replenishdetail.replenishDetailList[i]
          .productQuantity;
        str +=
          '{replenishId:"' +
          replenishId +
          '",productId:"' +
          productId +
          '",productQuantity:' +
          productQuantity +
          "},";
      }
      str = str.substring(0, str.length - 1);
      str += "]";
      console.log(str);
      const obj = {
        token: this.token,
        items: str
      };
      console.log(obj);
      return qs.stringify(obj);
    },
    createRE() {
      const send = this.setFoods();
      //   this.totalP();
      console.log(send);
      axios
        .post(config.sellerUrl + "/sell/seller/replenish/finish", send, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("创建配送单成功!", {
              duration: 3000
            });
            this.$router.push("order");
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          weui.alert("创建订单失败!");
        });
    },
    cancel() {
      axios
        .get(
          config.sellerUrl +
            "/sell/seller/replenish/cancel?replenishId=" +
            this.replenishId
        )
        .then(res => {
          console.log(res.data);
          if (res.data.msg === "成功") {
            weui.toast("取消成功!", {
              duration: 3000
            });
            this.$router.push("order");
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
          weui.alert("取消失败!");
        });
    }
  }
};
</script>

<style>
</style>

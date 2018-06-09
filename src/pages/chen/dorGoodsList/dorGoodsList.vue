<template>
  <div id="stockout">
    <div class="page__bd page__bd_spacing" v-for="(item,index) in this.goodsList" :key="index">
      <div class="weui-cells__title" v-if="item.foods.length !== list[index]">{{item.name}}</div>
      <div class="weui-panel weui-panel_access goodslist" v-for="(x,y) in item.foods" :key="y" v-if="x.stock > 0">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="x.icon">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{x.name}}</h4>
              <!--<p class="weui-media-box__desc">￥{{x.price}}</p>
              <p class="weui-media-box__desc">仓库库存:{{x.quantity}}</p>-->
              <p class="weui-media-box__desc">
                <span style="color:red;">回收数量最大不超过</span>寝室商品库存:{{x.stock}}</p>
              <!--<p v-if="x.sales > 0" class="weui-media-box__desc">寝室商品出售数量:{{x.sales}}</p>
              <p v-if="x.stockout > 0" class="weui-media-box__desc">寝室商品回收数量:{{x.stockout}}</p>-->
            </div>
            <carcontrol :food="x"></carcontrol>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="weui-btn weui-btn_warn" @click="stockoutGoods">回收商品</a>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import weui from "weui.js";
import carcontrol from "../../../components/carcontrol/stockout";
export default {
  data() {
    return {
      groupNo: "",
      token: "",
      goodsList: [],
      items: "",
      status: 0,
      list: []
    };
  },
  created() {
    this.token = this.getCookie("token");
    console.log(this.token);
    this.groupNo = this.getCookie("groupNo");
    console.log(this.groupNo);
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          "/api/sell/seller/group/productList?token=" +
            this.token +
            "&groupNo=" +
            this.groupNo
        )
        .then(res => {
          //console.log(res);
          this.goodsList = res.data.data;
          console.log(this.goodsList);
          //this.status = 0;
          this.list.splice(0, this.list.length);
          for (let i = 0; i < this.goodsList.length; i++) {
            this.status = 0;
            for (let j = 0; j < this.goodsList[i].foods.length; j++) {
              if (this.goodsList[i].foods[j].stock === 0) {
                this.status += 1;
              }
            }
            this.list.push(this.status);
          }
          console.log(this.list);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //包装商品
    setFoods() {
      let str = "[";
      for (let i = 0; i < this.goodsList.length; i++) {
        for (let j = 0; j < this.goodsList[i].foods.length; j++) {
          if (this.goodsList[i].foods[j].count > 0) {
            var productId = this.goodsList[i].foods[j].id;
            var productQuantity = this.goodsList[i].foods[j].count;
            str +=
              '{productId:"' +
              productId +
              '",productQuantity:"' +
              productQuantity +
              '",groupNo:' +
              this.groupNo +
              "},";
          }
        }
      }
      str = str.substring(0, str.length - 1);
      str += "]";
      //this.items = str;
      const obj = {
        token: this.token,
        items: str
      };
      console.log(obj);
      return qs.stringify(obj);
    },
    stockoutGoods() {
      var send = this.setFoods();
      if (this.items === "]") {
        weui.topTips("请先选择需要回收的商品!", 2000);
      } /*else{
          weui.confirm("确定回收商品?",function(){*/
      console.log("yes");
      axios
        .post("/api/sell/seller/group/stockout", send, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("回收商品成功!", {
              duration: 1000
            });
            this.getList();
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          weui.alert("回收失败!");
        });
      /*},function(){
            console.log("no");
          });
        }*/
    }
  },
  components: {
    carcontrol: carcontrol
  }
};
</script>

<style>
</style>

<template>
  <div id="orderdetail">
    <div class="weui-form-preview" v-if="this.kk === 0">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">{{this.groupNo}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">{{this.upTime}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单状态</label>
          <span class="weui-form-preview__value" v-if="this.status !== ''">{{this.status}}</span>
        </div>
      </div>
    </div>
    <div class="weui-panel__hd hd">商品列表</div>
    <div class="page__bd page__bd_spacing" v-if="this.kk === 0">
      <div class="weui-panel weui-panel_access goodslist" v-for="(item,index) in this.goodsList" :key="index">
        <div class="weui-panel__bd">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.productIcon" alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.productName}}</h4>
              <p class="weui-media-box__desc">￥{{item.productPrice}}</p>
              <!--<p class="weui-media-box__desc">仓库库存:{{item.productQuantity}}</p>-->
            </div>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="change(item.productQuantity)">
              <div class="weui-cell__bd">x{{item.productQuantity}}
              </div>
              <!--<div class="weui-cell__ft"></div>-->
            </a>
          </a>
        </div>
      </div>
    </div>
    <div class="page__bd page__bd_spacing" v-else>
      <div class="weui-panel weui-panel_access goodslist" v-for="(m,n) in this.goodsList" :key="n">
        <div class="weui-panel__bd">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="m.icon" alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{m.name}}</h4>
              <p class="weui-media-box__desc">{{m.description}}</p>
              <p class="weui-media-box__desc">￥{{m.price}}</p>
              <!--<p class="weui-media-box__desc">仓库库存:{{item.productQuantity}}</p>-->
            </div>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">x{{m.quantity}}
              </div>
              <!--<div class="weui-cell__ft"></div>-->
            </a>
          </a>
        </div>
      </div>
    </div>


    <!--<div class="weui-form-preview__ft">
      <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:;"
         @click="sureOrder">{{cor1}}</a>
      <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" @click="cancelOrder">
        {{cor2}}
      </button>
    </div>-->
    <!--<router-link :to="{name:'domitorydemo'}" class="weui-cell weui-cell_access" href="javascript:;">
      <div class="weui-cell__bd">
        <p>生成模板</p>
      </div>
      <div class="weui-cell__ft"></div>
    </router-link>-->
  </div>
</template>

<script>
  import axios from 'axios';
  import weui from 'weui.js';

  const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
  export default {
    data() {
      return {
        token: '',
        orderId: '',
        replenishId: '',
        num: '',
        api: 'http://wxsell.nat200.top',
        upTime: '',
        groupNo: '',
        status: '',
        goodsList: [],
        cor1: '',
        cor2: '',
        text: '',
        items: [],
        goods: [],
        sNum: '',
        orderStatus: '',
        payStatus: '',
        kk:0
      }
    },
    created() {
      this.goods = this.$route.params.goods;
      this.sNum = this.$route.params.index;
      console.log(this.sNum);
      console.log(typeof(this.sNum));
      console.log(this.goods);
      this.getss();
      /*this.token = this.getCookie("token");
      this.num = this.getCookie("num");
      if (this.num === "2") {
        this.groupNo = this.getCookie("groupNo");
      } else if (this.num === "3") {
        this.orderId = this.getCookie("orderId");
      } else if (this.num === "4") {
        this.replenishId = this.getCookie("replenishId");
      }*/
      //console.log(typeof(this.num));
      //this.details();

    },
    methods: {
      getss() {
        if (this.sNum === "3") {
          this.kk = 0;
          this.groupNo = this.goods.groupNo;
          var _x = this.goods.updateTime;
          if (_x.toString().length === 10) {
            var date = new Date(_x * 1000);
          } else {
            var date = new Date(_x);
          }
          this.times(date);
          if (this.goods.orderStatus === "0") {
            if (this.goods.payStatus === "0") {
              this.status = "新订单未支付";
            } else {
              this.status = "新订单已支付";
            }
          } else if (this.goods.orderStatus === "1") {
            this.status = "已完结";
          } else {
            this.status = "已取消";
          }
          this.goodsList = this.goods.orderDetailVOList;
        }
        if(this.sNum === "1"){
          this.kk = 0;
          this.groupNo = this.goods.groupNo;
          var _x = this.goods.updateTime;
          if (_x.toString().length === 10) {
            var date = new Date(_x * 1000);
          } else {
            var date = new Date(_x);
          }
          this.times(date);

        }
        if(this.sNum === "2"){
          this.kk = 1;
          this.goodsList = this.goods.foods;
          console.log(this.goodsList);
        }
      },
      times(date1) {
        var Y = date1.getFullYear();
        //console.log(Y);
        //console.log(dorTime);
        var M = (date1.getMonth() + 1 < 0 ? +(date1.getMonth() + 1) : date1.getMonth() + 1);
        //console.log(M);
        var D = date1.getDate();
        //console.log(D);
        var h = date1.getHours();
        //console.log(h);
        var m = (date1.getMinutes() < 10 ? '0' + date1.getMinutes() : date1.getMinutes());
        //console.log(m);
        var s = (date1.getSeconds() < 10 ? '0' + date1.getSeconds() : date1.getSeconds());
        //console.log(s);
        this.upTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
        //console.log(this.createsTime);
        //return this.createsTime;
      },
      details() {
        //配送订单详情
        if (this.num === "2") {
          this.goodsList.splice(0, this.goodsList.length);
          this.cor1 = '';
          axios.get(API_PROXY + this.api + '/sell/seller/dispatch/detail?token=' + this.token + '&groupNo=' + this.groupNo).then((res) => {
            console.log(res);
            this.groupNo = res.data.data.groupNo;
            this.setCookie("groupNo", this.groupNo, 1);
            let _x = res.data.data;
            if (_x.updateTime.toString().length === 10) {
              let date = new Date(_x.updateTime * 1000);
              this.times(date);
            } else {
              let date = new Date(_x.updateTime);
              this.times(date);
            }
            if (_x.payStatus === 0) {
              this.status = "未支付";
            } else {
              this.status = "已支付";
            }
            this.goodsList = _x.orderDetailList;
            this.cor = "完结";
          }).catch((err) => {
            console.log(err);
          })
        }
        //新订单详情
        if (this.num === "3") {
          this.goodsList.splice(0, this.goodsList.length);
          this.cor1 = '';
          this.cor2 = '';
          axios.get(API_PROXY + this.api + '/sell/seller/order/detail?token=' + this.token + '&orderId=' + this.orderId).then((res) => {
            console.log(res);
            this.groupNo = res.data.data.groupNo;
            this.setCookie("groupNo", this.groupNo, 1);
            let _x = res.data.data;
            if (_x.updateTime.toString().length === 10) {
              let date = new Date(_x.updateTime * 1000);
              this.times(date);
            } else {
              let date = new Date(_x.updateTime);
              this.times(date);
            }
            if (_x.payStatus === 0) {
              this.status = "未支付";
            } else {
              this.status = "已支付";
            }
            this.goodsList = _x.orderDetailList;
            console.log(this.goodsList);
            this.items.splice(0, this.items.length);
            for (let k = 0; k < this.goodsList.length; k++) {
              console.log(this.goodsList[k].replenishId);
              this.items.push({
                "replenishId": this.goodsList[k].replenishId,
                "productId": this.goodsList[k].productId,
                "productQuantity": this.goodsList[k].productQuantity
              });
              //this.items.push();
              //this.items.push();
            }
            console.log(this.items);
            this.cor1 = "配送";
            this.cor2 = "取消订单";
            //this.cor2 = "取消补货"
          }).catch((err) => {
            console.log(err);
          })
        }
        //补货订单详情
        if (this.num === "4") {
          this.goodsList.splice(0, this.goodsList.length);
          this.items.splice(0, this.items.length);
          this.cor1 = '';
          this.cor2 = '';
          axios.get(API_PROXY + this.api + '/sell/seller/replenish/detail?token=?' + this.token + '&replenishId=' + this.replenishId).then((res) => {
            console.log(res);
            this.groupNo = res.data.data.groupNo;
            this.setCookie("groupNo", this.groupNo, 1);
            let _x = res.data.data.createTime;
            if (_x.toString().length === 10) {
              let date = new Date(_x * 1000);
              this.times(date);
            } else {
              let date = new Date(_x);
              this.times(date);
            }
            this.goodsList = res.data.data.replenishDetailList;
            console.log(this.goodsList);
            this.cor1 = "配送";
            this.cor2 = '取消补货';
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      change(obj) {
        //console.log(obj);
        this.setCookie("quantity", obj, 1);
        this.$router.push({name: "textinput"});
      },
      sureOrder() {
        if (this.cor1 === "配送") {
          axios.post(this.api + '/sell/seller/replenish/finish', {
            items: this.items,
          }, {
            headers: {
              token: this.token,
              'Content-Type': 'application/json'
            }

          }).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      cancelOrder() {
        if (this.cor2 === "取消订单") {
          axios.get(API_PROXY + this.api + '/sell/seller/order/cancel?token=' + this.token + '&orderId=' + this.orderId).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
        }
        /*axios.get(API_PROXY + this.api + '/sell/seller/replenish/cancel?token='+this.token+'&replenishId='+this.replenishId).then((res) => {
          console.log(res);
          if((res.data.msg === "成功")){
            weui.toast("取消订单成功!",{
              duration:1000
            })
          }else{
            weui.alert("取消失败!");
          }
        }).catch((err) => {
          console.log(err);
          weui.alert("取消失败!");
        })
      }*/
      }

    }
  };
</script>

<style>

</style>

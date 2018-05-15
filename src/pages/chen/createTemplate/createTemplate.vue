<template>
  <div id="createTemplate">
    <div class="page__bd page__bd_spacing" v-for="(item,index) in this.name" :key="index">
      <div class="weui-cells__title">{{item.name}}</div>
      <div class="weui-panel weui-panel_access goodslist" v-for="(x,y) in item.foods" :key="y">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="x.icon">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{x.name}}</h4>
              <p class="weui-media-box__desc">￥{{x.price}}</p>
              <p class="weui-media-box__desc">仓库库存:{{x.quantity}}</p>
              <p v-if="x.stock > 0" class="weui-media-box__desc">寝室商品库存:{{x.stock}}</p>
              <p v-if="x.sales > 0" class="weui-media-box__desc">寝室商品出售数量:{{x.sales}}</p>
              <p v-if="x.stockout > 0" class="weui-media-box__desc">寝室商品回收数量:{{x.stockout}}</p>
            </div>
            <carcontrol :food="x"></carcontrol>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="weui-btn weui-btn_primary" @click="createRE">创建配送单</a>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  import weui from 'weui.js';
  import carcontrol from '../../../components/carcontrol/carcontrol';

  const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
  export default {
    data() {
      return {
        api: 'http://wxsell.nat200.top',
        groupNo: '',
        token: '',
        dorGoods: [],
        updatesTime: [],
        name: [],
        reGoods: [],
        items: [],
        num: []
      };
    },
    created() {
      this.token = this.getCookie("token");
      console.log(this.token);
      this.groupNo = this.getCookie("groupNo");
      console.log(this.groupNo);
      //补货商品列表  *对
      axios.get(API_PROXY + this.api + '/sell/seller/replenish/productlist?token=' + this.token + '&groupNo=' + this.groupNo).then((res) => {
        console.log(res);
        this.name = res.data.data;
        console.log(this.name);
      }).catch((err) => {
        console.log(err);
      })
    },
    methods: {
      change(obj) {
        this.setCookie("quantity", obj, 1);
        this.$router.push({name: "textinput"});
      },
      //包装商品
      setFoods(){
          let str = '[';
          for (let i = 0; i < this.name.length; i++) {
          for (let j = 0; j < this.name[i].foods.length; j++) {
            if (this.name[i].foods[j].count > 0) {
              var productId = this.name[i].foods[j].id;
              var productQuantity = this.name[i].foods[j].count;
              str += '{productId:"'+ productId + '",productQuantity:' + productQuantity + '},';
            }

          }
        }
          str = str.substring(0,str.length - 1);
          str += ']';
          console.log(str);
          const obj ={
            token:this.token,
            items: str,
            groupNo:this.groupNo
          };
          console.log(obj);
          return qs.stringify(obj);
      },
      createRE() {
        const send = this.setFoods();
        console.log(send);
        axios.post(this.api + '/sell/seller/dispatch/create',send, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

          }
        }).then((res) => {
          console.log(res);
          if(res.data.msg === "成功"){
            weui.toast("创建配送单成功!",{
              duration:2000
            });
          }else{
            weui.alert(""+res.data.msg);
          }
        }).catch((err) => {
          console.log(err);
          weui.alert("创建订单失败!");
        })
      }
    },
    components: {
      'carcontrol': carcontrol
    }
  };
</script>

<style>

</style>

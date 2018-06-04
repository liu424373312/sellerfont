<template>
  <div id="orderdetail">
    <!--<div class="weui-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">{{}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">{{}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单状态</label>
          <span class="weui-form-preview__value" v-if="this.status !== ''">{{this.status}}</span>
        </div>
      </div>
    </div>-->
    <div class="weui-panel__hd hd">商品列表</div>
    <div class="page__bd page__bd_spacing">
      <div class="weui-panel weui-panel_access goodslist">
        <div class="weui-panel__bd">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="this.goods.icon" alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{this.goods.name}}</h4>
              <p class="weui-media-box__desc">商品介绍:{{this.goods.description}}</p>
              <p class="weui-media-box__desc">单价:{{this.goods.price}}</p>
            </div>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">x{{this.goods.quantity}}
              </div>
              <!--<div class="weui-cell__ft"></div>-->
            </a>
          </a>
        </div>
      </div>
    </div>

    <!--<div class="page__bd page__bd_spacing" v-else="this.kk === 1">
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
              <!<p class="weui-media-box__desc">仓库库存:{{item.productQuantity}}</p>
            </div>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">x{{m.quantity}}
              </div>
            </a>
          </a>
        </div>
      </div>
    </div>-->

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
        api: 'http://wxsell.nat200.top',
        goods:[]
      }
    },
    created() {
      this.goods = this.$route.params.goods;
      console.log(this.goods);
    },
    methods: {
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
      }
    }
  };
</script>

<style>

</style>

<template>
  <div id="orderdetail">
    <div class="weui-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">{{this.detailData.groupNo}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">{{this.upTime}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">订单状态</label>
          <span class="weui-form-preview__value">待配送</span>
        </div>
      </div>
    </div>
    <div class="weui-panel__hd hd">商品列表</div>
    <div class="page__bd page__bd_spacing ">
      <div class="weui-panel weui-panel_access goodslist" v-for="(item,index) in this.goodsLists" :key="index">
        <div class="weui-panel__bd">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.productIcon" alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.productName}}</h4>
              <p class="weui-media-box__desc">￥{{item.productPrice}}</p>
              <p class="weui-media-box__desc">数量:{{item.productQuantity}}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <router-link :to="{name:'applydomitory'}" class="weui-cell weui-cell_access" href="javascript:;">
      <div class="weui-cell__bd">
        <p>生成模板</p>
      </div>
      <div class="weui-cell__ft"></div>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detailData: [],
        upTime: '',
        num: 0,
        token: '',
        goodsLists: [],
        names: [],
        prices: [],
        quantities: []
      }
    },
    created() {
      this.token = this.getCookie('token');
      this.detailData = this.$route.params.goods;
      console.log(this.detailData);
      this.num = this.$route.params.index;
      console.log(this.num);
      this.goodsLists.splice(0, this.goodsLists.length);
      this.details();

    },
    methods: {
      times(date1) {
        this.upTime = '';
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
        if (this.num === 3) {
          let date = new Date(this.detailData.updateTime);
          this.times(date);
          this.goodsLists = this.detailData.orderDetailVOList;
          console.log(this.goodsLists);
          /*for (let i = 0; i < this.goodsLists.length; i++) {
            this.names.push(this.goodsLists[i].productName);
            this.prices.push(this.goodsLists[i].productPrice);
            this.quantities.push(this.goodsLists[i].productQuantity);
          }
          console.log(this.names);
          console.log(this.prices);
          console.log(this.quantities);*/
        }
        if (this.num === 4) {
          let date = new Date(this.detailData.createTime);
          this.times(date);
          this.goodsLists = this.detailData.replenishDetailList;
          console.log(this.goodsLists);
        }
        if(this.num === 5){
          let date = new Date(this.detailData.updateTime);
          this.times(date);
        }
      }
    }
  };
</script>

<style>

</style>

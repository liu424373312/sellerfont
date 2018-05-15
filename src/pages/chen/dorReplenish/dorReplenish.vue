<template>
  <div id="dorReplenish">
    <div class="weui-panel__hd hd">补货商品列表</div>
    <div class="page__bd page__bd_spacing ">
      <div class="weui-panel weui-panel_access goodslist" v-for="(item,index) in this.items.foods" :key="index">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.icon" alt="">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.name}}</h4>
              <p class="weui-media-box__desc">单价￥{{item.price}}</p>
              <p class="weui-media-box__desc">寝室库存{{item.stock}}</p>
              <p class="weui-media-box__desc">寝室可回收{{item.stuckout}}</p>
              <p class="weui-media-box__desc">仓库库存{{item.quantity}}</p>
            </div>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
              </div>
              <div class="weui-cell__ft" @click="change(item.sales)">x{{item.sales}}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-form-preview__ft" style="border-bottom:2px solid rgba(7,17,27,0.1);">
      <!--<a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:;" >{{}}</a>-->
      <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:;">创建配送单
      </button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
  export default {
    data() {
      return {
        items: [],
        groupNo:'',
        token:'',
        api: 'http://wxsell.nat200.top',
        goodsList:[]
      }
    },
    created() {
      this.token = this.getCookie("token");
      console.log(this.token);
      //this.groupNo = this.getCookie("groupNo");
      //console.log(this.groupNo);
      this.items = this.$route.params.items;
      console.log(this.items);
      //this.getGoodsList();
    },
    methods: {
      getGoodsList(){
        axios.get(API_PROXY + this.api +'/sell/seller/replenish/productlist?token='+this.token+'&groupNo='+this.groupNo).then((res) => {
         //console.log(res);
          this.goodsList = res.data.data;
          //console.log(this.goodsList);
        }).catch((err) => {
          console.log(err);
        })
      },
      change(obj) {
        this.setCookie("quantity", obj);
        this.$router.push({name: "textinput"});
      }
    }
  }
</script>

<style>

</style>

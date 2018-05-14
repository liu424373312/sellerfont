<template>
<div id="dorReplenishList">
  <div class="weui-panel__hd hd">寝室配送单列表</div>
  <div class="page__bd page__bd_spacing ">
    <div class="weui-panel weui-panel_access goodslist">
      <div class="weui-panel__bd">
        <div v-for="(item,index) in this.replenishList" :key="index" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="item.productIcon" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{item.productName}}</h4>
            <p class="weui-media-box__desc">单价￥{{item.productPrice}}</p>
          </div>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">x{{item.productQuantity}}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios';
  const API_PROXY = "http://bird.ioliu.cn/v2?url=";
export default {
  data(){
    return{
      api: "http://wxsell.nat200.top",
      groupNo:'',
      token:'',
      replenishList:[]
    }
  },
  created(){
    this.token = this.getCookie("token");
    this.groupNo = this.getCookie("groupNo");
    this.getDetail();
  },
  methods:{
    getDetail(){
      axios.get(API_PROXY + this.api + '/sell/seller/dispatch/detail?token='+this.token+'&groupNo='+this.groupNo).then((res) => {
        console.log(res);
        this.replenishList = res.data.data.dispatchDetailList;
        console.log(this.replenishList);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
};
</script>

<style>

</style>

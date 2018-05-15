<template>
  <div id="dorgroup">
    <div class="page__bd page__bd_spacing">
      <div class="weui-cells__title"><span class="weui-media-box__title" style="font-weight: bold">{{this.groupNo}}</span>&nbsp;补货快照</div>
      <div class="weui-panel weui-panel_access goodslist" v-for="(item,index) in this.goodsList" :key="index">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="item.productIcon">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.productName}}</h4>
              <p class="weui-media-box__desc">￥{{item.productPrice}}</p>
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

  const API_PROXY = "http://bird.ioliu.cn/v1?url=";
  export default {
    data() {
      return {
        token: '',
        api: "http://wxsell.nat200.top",
        groupNo: '',
        goodsList:[]
      }
    },
    created() {
      this.token = this.getCookie("token");
      this.groupNo = this.getCookie("groupNo");
      axios.get(API_PROXY + this.api + '/sell/seller/group/detail?token=' + this.token + '&groupNo=' + this.groupNo).then((res) => {
        console.log(res);
        this.goodsList = res.data.data;
      }).catch((err) => {
        console.log(err);
      })
    }
  }
</script>

<style>

</style>

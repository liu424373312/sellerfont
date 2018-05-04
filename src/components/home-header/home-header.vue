<template>
  <div id="home-header">
    <div class="weui-cell">
      <div class="weui-cell__hd"><img :src="this.headImg" alt="" style="width:20px;margin-right:5px;display:block"></div>
      <div class="weui-cell__bd">
        <p>管理员</p>
        <p @click="lo">登录</p>
      </div>
      <div class="weui-cell__ft"></div>
    </div>
  </div>
</template>

<script>
//const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
//http://wxsell.nat200.top;
export default {
  data(){
    return{
      headImg:''
    }
  },
  created(){
    this.headImg = this.getCookie("headImg");

  },
  methods: {
    lo() {
      window.location.href="http://wxsell.nat200.top/sell/wechat/authorize?returnUrl=http://rnnjhz.natappfree.cc/#/login1";
    }
  }
};
</script>

<style>

</style>

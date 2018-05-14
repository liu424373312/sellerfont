<template>
<div id="pic" style="position:relative">
  <div id="total">
    <div id="picTitle" style="margin-left:35%;margin-top:10px;">{{this.groupNo}}二维码</div>
    <div id="dorPic" style="position:absolute;margin-left:10%">
      <img :src="this.pic" style="">
    </div>

  </div>


</div>
</template>
<script>
  import axios from 'axios';
  const API_PROXY = "http://bird.ioliu.cn/v2?url=";
export default {
  data(){
    return {
      api: "http://wxsell.nat200.top",
      token:'',
      groupNo:'',
      pic:''
    }
  },
  created(){
    console.log("pic");
    this.token = this.getCookie("token");
    this.groupNo = this.getCookie("groupNo");
    this.pic = 'http://wxsell.nat200.top/sell/seller/qrcode/create?token='+this.token+'&groupNo='+this.groupNo;
    //this.getPic();
  },
  methods:{
    getPic(){
      axios.get(API_PROXY + this.api + '/sell/seller/qrcode/create?token='+this.token+'&groupNo='+this.groupNo).then((res) => {
        console.log(res);
        this.pic = res.data;
        //console.log(this.pic);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
};
</script>

<style>

</style>

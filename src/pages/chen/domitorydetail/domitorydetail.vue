<template>
    <div id="domitorydetail">
        <div class="weui-cells__title">寝室信息</div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>寝室号</p>
                </div>
                <div class="weui-cell__ft">{{this.dorDetail.groupNo}}</div>
            </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>申请人</p>
            </div>
            <div class="weui-cell__ft">{{this.dorDetail.userName}}</div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>申请人电话</p>
            </div>
            <div class="weui-cell__ft">{{this.dorDetail.userPhone}}</div>
          </div>
          <router-link to="pic" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <p>寝室二维码</p>
            </div>
            <div class="weui-cell__ft"></div>
          </router-link>
        </div>
        <div class="weui-cells__title">操作</div>
        <div class="weui-cells"><!--createTemplate-->
            <router-link class="weui-cell weui-cell_access" :to="{name:'createTemplate'}">
                <div class="weui-cell__bd">
                    <p>给寝室补货</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access" :to="{name:'dorReplenishList'}">
                <div class="weui-cell__bd">
                    <p>寝室配送单列表</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
         <!-- <router-link class="weui-cell weui-cell_access" :to="{name:'dorgroup'}">
            <div class="weui-cell__bd">
              <p>寝室补货快照</p>
            </div>
            <div class="weui-cell__ft"></div>
          </router-link>-->
          <router-link class="weui-cell weui-cell_access" :to="{name:'dorGoodsList'}">
            <div class="weui-cell__bd">
              <p>寝室商品列表</p>
            </div>
            <div class="weui-cell__ft"></div>
          </router-link>
            <router-link class="weui-cell weui-cell_access" :to="{name:'domitorydemo'}">
                <div class="weui-cell__bd">
                    <p>寝室商品模板</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
          <!--<router-link class="weui-cell weui-cell_access" :to="{name:'stockout'}">
            <div class="weui-cell__bd">
              <p>回收零食</p>
            </div>
            <div class="weui-cell__ft"></div>
          </router-link>-->
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import weui from 'weui.js';
  const API_PROXY = "http://bird.ioliu.cn/v2?url=";
export default {
  data() {
    return {
      api: "http://wxsell.nat200.top",
      groupId:'',
      dorDetail:[],
      groupNo:'',
      token:''
    }
  },
  mounted(){

  },
  created() {
    this.token = this.getCookie("token");
    this.groupId = this.getCookie("groupId");
    axios.get(API_PROXY + this.api + '/sell/seller/group/index?groupId='+this.groupId).then((res) => {
      console.log(res);
      this.dorDetail = res.data.data;
      this.groupNo = this.dorDetail.groupNo;
      this.setCookie("groupNo",this.groupNo,1);
      console.log(this.getCookie("groupNo"));
    }).catch((err) => {
      console.log(err);
    })
  },
  methods:{
    getPic(){
        this.$router.push({name:"pic"})
      /*axios.get(API_PROXY + this.api + '/sell/seller/qrcode/create?token='+this.token+'&groupNo='+this.groupNo).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })*/
    }
  }
};
</script>

<style>

</style>

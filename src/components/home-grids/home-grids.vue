<template>
    <div id="home-grids">
        <div class="weui-grids">
            <router-link to="goods" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-goods homeicon"></i>
                </div>
                <p class="weui-grid__label">商品管理</p>
            </router-link>
            <router-link :to="{name:'domitory'}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-domitory homeicon"></i>
                </div>
                <p class="weui-grid__label">寝室管理</p>
            </router-link>
            <router-link :to="{name:'order'}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-order homeicon"></i>
                </div>
                <p class="weui-grid__label">订单管理</p>
            </router-link>
            <router-link :to="{name:'statistica',params:{token1:this.token}}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-statistica homeicon"></i>
                </div>
                <p class="weui-grid__label">销售统计</p>
            </router-link>
            <a href="javascript:;" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-user homeicon"></i>
                </div>
                <p class="weui-grid__label">个人中心</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      token:''
    }
  },
  methods:{
    show(obj){
      this.token = obj;
      console.log(this.token);
    }
  }
};
</script>

<style>
.homeicon{
    font-size:28px;
    color:dodgerblue;
}
</style>

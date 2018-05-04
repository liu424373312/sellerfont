<template>
    <div id="domitorydetail">
        <div class="weui-cells__title">寝室信息</div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>寝室号</p>
                </div>
                <div class="weui-cell__ft">{{this.dor.groupNo}}</div>
            </div>
            <router-link class="weui-cell weui-cell_access" :to="{name:'textinput',params:{applyNo:this.dor.groupNo}}">
                <div class="weui-cell__bd">
                    <p>申请人</p>
                </div>
                <div class="weui-cell__ft">{{this.dor.userName}}</div>
            </router-link>
            <router-link class="weui-cell weui-cell_access" :to="{name:'textinput',params:{applyname:this.dor.userName}}">
                <div class="weui-cell__bd">
                    <p>申请人电话</p>
                </div>
                <div class="weui-cell__ft">{{this.dor.userPhone}}</div>
            </router-link>
        </div>
        <div class="weui-cells__title">操作</div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>给寝室补货</p>
                </div>
                <div class="weui-cell__ft"></div>
            </a>
            <router-link class="weui-cell weui-cell_access" :to="{name:'domitoryorder',params:{dorOrder:this.dor.groupNo}}">
                <div class="weui-cell__bd">
                    <p>查看寝室订单</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access" :to="{name:'domitorydemo',params:{dorMode:this.dor.groupNo}}">
                <div class="weui-cell__bd">
                    <p>寝室模板管理</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dor:[],
    }
  },
  mounted(){
    /*let that = this;
    that.pushHistory();
    window.addEventListener('popstate',function(e){
      //window.location.href='http://localhost:8080/#/dormitorydetail';
      console.log("rrr");
    },false);*/
  },
  created() {
    this.dor = this.$route.params.arry;
    //console.log(this.word);
    console.log(this.dor);
  },
  methods:{
    pushHistory(){
      let state = {
        title:'title',
        url:'#'
      };
      window.history.pushState(state,'title','#');
    }
  }
};
</script>

<style>

</style>

<template>
    <div id="applydomitory">
        <div class="weui-cells__title">寝室申请列表</div>
        <div v-for="(item,index) in this.applyData" :key="index" class="weui-form-preview orderitem">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">申请人姓名</label>
                    <span class="weui-form-preview__value">{{item.userName}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">寝室号</label>
                    <span class="weui-form-preview__value">{{item.groupNo}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">申请人电话</label>
                    <span class="weui-form-preview__value">{{item.userPhone}}</span>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">时间</label>
                    <span class="weui-form-preview__value">{{createsTimes[index]}}</span>
                </div>
            </div>
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:" @click="applyDor(item)">新增寝室</a>
                <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:;" @click="del(item)">删除</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
export default {
  data(){
    return{
      token:'',
      applyData:[],
      times:'',
      createsTimes:[],
      j:0,
      api:'http://wxsell.nat200.top',
      modes:[]
    }
  },
  created(){
    let token = this.getCookie('token');
    if (token === null || !token) {
      window.location.href = " http://rm4nka.natappfree.cc";
    } else {
      this.token = token;
    }
    this.applys();
    //this.pushHistory();
    this.modes = this.$route.params.modes;
    console.log(this.modes);
  },
  mounted(){
    /*let that = this;
    that.pushHistory();
    window.addEventListener('popstate',function(e){
      window.location.href="http://aunxtw.natappfree.cc/dormitory";
    },false);*/
  },
  methods: {
    applys(){
      axios.get(API_PROXY + 'http://wxsell.nat200.top/sell/seller/boxApply/list?token='+this.token).then((response) => {
        console.log(response);
        this.applyData = response.data.data.list;
        //console.log(this.applyData);
        var applyTimes;
        //var i = 0;
        for(var i = 0;i < this.applyData.length;i++){
          this.times = this.applyData[i].createTime;
          //console.log(applyTimes);
          //console.log(this.times);
          var date = new Date(this.times);
          this.changeTime(date);
        }
      })
    },
    changeTime(date1){
      var Y = date1.getFullYear();
      //console.log(Y);
      //console.log(dorTime);
      var M = (date1.getMonth()+1 < 0? + (date1.getMonth()+1):date1.getMonth()+1);
      //console.log(M);
      var D = date1.getDate();
      //console.log(D);
      var h = date1.getHours();
      //console.log(h);
      var m = date1.getMinutes();
      //console.log(m);
      var s = date1.getSeconds();
      //console.log(s);
      this.createsTimes[this.j++] = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
      //console.log(this.createsTime);
      return this.createsTimes;
    },
    applyDor(obj) {
      console.log(obj);
      let userNames = obj.userName;
      console.log(userNames);
      let groupNos = obj.groupNo;
      console.log(groupNos);
      let userPhones = obj.userPhone;
      console.log(userPhones);
      let groupDistricts = obj.groupDistrict;
      console.log(groupDistricts);
      let id = obj.id;
      console.log(id);
      let all ={
        groupNo: obj.groupNo,
        userName: obj.userName,
        userPhone:obj.userName,
        groupDistrict:obj.groupDistrict
      };
      let send = qs.stringify(all);
      axios.post('http://wxsell.nat200.top/sell/seller/group/save',send,{
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
          token:this.token
        }
      }).then((res) => {
        console.log(res);
        if(res.data.msg === "成功"){
          $.toast("新增成功",2000);
        }
      }).catch((err) => {
        cosole.log(err);
      })
    },
    del(obj){
      let id = obj.id;
      axios.get(API_PROXY + this.api + '/sell/seller/boxApply/delete?id='+id).then((res) => {
        console.log(res);
        if(res.data.msg === "成功"){
          $.toast("操作成功",2000);
        }else {
          $.toast("操作失败",2000);
        }
      }).catch((err) => {
        console.log(err);
      })
      //console.log(obj);
    },
    pushHistory(){
      let state = {
        title:'title',
        url:'#'
      };
      window.history.pushState(state,'title','#');
    },
  }
};
</script>

<style>
.orderitem {
  margin-bottom: 30px;
}
</style>


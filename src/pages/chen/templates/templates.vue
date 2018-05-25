<template>
  <div id="templates">
    <div class="weui-panel__hd hd">模板管理</div>
    <div class="templatelist" v-for="(item,index) in this.templatesData" :key="index">
      <div class="weui-cell weui-cell_access" @click="getDetail(item)">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">{{item.templateName}}</h4>
          <p class="weui-media-box__desc">{{upTime[index]}}</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import weui from 'weui.js';

  const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
  export default {
    data() {
      return {
        api: 'http://wxsell.nat200.top',
        token: '',
        templatesData: [],
        upTime: []
      }
    },
    created() {
      this.token = this.getCookie("token");
      axios.get(API_PROXY + this.api + '/sell/seller/template/list?token=' + this.token).then((res) => {
        console.log(res);
        this.templatesData = res.data.data;
        console.log(this.templatesData);
        if (this.templatesData.length === 0) {
          weui.alert("暂无模板");
          //this.$router.go(-1);
        } else {
          this.upTime.splice(0, this.upTime.length);
          for (let i = 0; i < this.templatesData.length; i++) {
            var _x = this.templatesData[i].updateTime;
            if (_x.toString().length === 10) {
              var date = new Date(_x * 1000);
            } else {
              var date = new Date(_x);
            }
            this.times(date);
          }
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    methods: {
      getDetail(obj) {
        console.log(obj);
        this.setCookie("templateName", obj.templateName, 1);
        this.$router.push({name: 'templatesDetail'});
      },
      times(date1) {
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
        this.upTime.push(Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s);
        //console.log(this.createsTime);
        //return this.createsTime;
      }
    }
  };
</script>

<style>

</style>

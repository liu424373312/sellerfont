<template>
  <div id="categorydetail">
    <div class="weui-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">{{this.groupNo}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">创建时间</label>
          <span class="weui-form-preview__value">{{this.upTime}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">更新时间</label>
          <span class="weui-form-preview__value">{{this.upTime}}</span>
        </div>
      </div>
    </div>
    <div class="weui-panel__hd hd">商品列表</div>
    <div class="domitorylist">
      <div v-for="(item,index) in this.crGoods" :key="index" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">{{item.productName}}</h4>
          <p class="weui-media-box__desc">仓库库存:{{item.productQuantity}}</p>
        </div>
        <!--<carcontrol :food="item"></carcontrol>&nbsp;&nbsp;&nbsp;&nbsp;-->
        <a href="javascript:;" class="weui-btn weui-btn_warn weui-btn_mini" @click="delCR">删除</a>
      </div>
    </div>
    <a href="javascript:;" class="weui-btn weui-btn_primary" @click="createRE">创建配送单</a>
  </div>
</template>

<script>
  import axios from 'axios';
  import weui from 'weui.js';
  import carcontrol from '../../../components/carcontrol/carcontrol';

  const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
  export default {
    data() {
      return {
        crdetails: [],
        token: '',
        groupNo: '',
        api: 'http://wxsell.nat200.top',
        upTime: '',
        createTime: '',
        crGoods: [],
        templateId: ''
      };
    },
    created() {
      this.token = this.getCookie("token");
      console.log(this.token);
      this.groupNo = this.getCookie("templateName");
      console.log(this.groupNo);
      this.getDetailList();

    },
    methods: {
      getDetailList() {
        console.log(this.crGoods);
        this.crGoods.splice(0, this.crGoods.length);
        axios.get(API_PROXY + 'http://wxsell.nat200.top/sell/seller/template/detail?token=' + this.token + '&groupNo=' + this.groupNo).then((res) => {
          console.log(res);
          this.crdetails = res.data.data;
          console.log(this.crdetails);
          this.templateId = this.crdetails.templateId;
          console.log(this.templateId);
          this.crGoods = this.crdetails.templateDetailList;
          //console.log(this.details);
          var date = new Date(this.crdetails.createTime);
          this.crTimes(date);
          var date1 = new Date(this.crdetails.updateTime);
          this.upTimes(date1);
        }).catch((err) => {
          console.log(err);
        })
      },
      createRE() {
        axios.get(API_PROXY + this.api + '/sell/seller/template/create_replenish?token=' + this.token + '&templateId=' + this.templateId).then((res) => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("创建配送单成功!", {
              duration: 1000
            })
          }
        }).catch((err) => {
          console.log(err);
          weui.topTips("创建配送单失败!");
        })
      },
      delCR() {
        axios.get(API_PROXY + this.api + '/sell/seller/template/delete?token=' + this.token + '&templateId=' + this.templateId).then((res) => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("删除成功!", {
              duration: 1000
            })
          }else{
            weui.alert(""+res.data.msg);
          }
        }).catch((err) => {
          weui.topTips("删除失败!");
          console.log(err);
        })
      },
      crTimes(date1) {
        if (date1.toString().length === 10) {
          date1 = date1 * 1000;
        }
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
        this.createTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
        //console.log(this.createsTime);
        //return this.createsTime;
    },
    upTimes(date1) {
      if (date1.toString().length === 10) {
        date1 = date1 * 1000;
      }
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
      this.upTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
      //console.log(this.createsTime);
      //return this.createsTime;
    }
  },
  components: {
    'carcontrol'
  :
    carcontrol
  }
  }
</script>

<style>

</style>

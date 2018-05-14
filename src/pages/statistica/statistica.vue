<template>
  <div id="statistica">
    <div class="weui-cells__title">类型</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__bd">
          <select class="weui-select" name="select1" @change="getAll($event)">
            <option v-for="h in this.index" :key="h" :value="h.indexId">{{h.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">时间</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">开始时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" value="" ref="startTime"/>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">结束时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="date" value="" ref="endTime"/>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="weui-btn weui-btn_primary" @click="selectMore">查询</a>
    <div class="weui-cells__title">合计金额￥{{this.money}}</div>
    <div class="domitorylist">
      <router-link v-for="(item,index) in this.dorSales" :key="index"
                   :to="{name:'orderdetail1',params:{goods:item,index:sNum}}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd" v-if="kk === 1">{{item.name}}</div>
        <div v-if="kk === 0 " class="weui-cell__bd" v-for="(x,y) in item.foods" :key="y">
          <h4 class="weui-media-box__title">{{x.name}}</h4>
          <h5 class="weui-media-box__desc">￥{{x.price}}</h5>
          <p class="weui-media-box__desc">{{x.quantity}}</p>
        </div>
        <div class="weui-cell__bd" v-if="kk === 0">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <h5 class="weui-media-box__desc">￥{{consume[index]}}</h5>
          <p class="weui-media-box__desc">{{updatesTime[index]}}</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
  export default {
    data() {
      return {
        api: 'http://wxsell.nat200.top',
        token: '',
        dorSales: [],
        updatesTime: [],
        sTime: '',
        eTime: '',
        sNum: '',
        consume:[],
        namess:[],
        foods:[],
        kk:0,
        money:0,
        index: [
          {
            "indexId": 0,
            "name": "请选择"
          },
          {
            "indexId": 1,
            "name": "寝室销售统计"
          },
          {
            "indexId": 2,
            "name": "商品销售统计"
          },
          {
            "indexId": 3,
            "name": "销售统计"
          }
        ]
      }
    },
    created() {
      let token = this.getCookie('token');
      if (token === null || !token) {
        window.location.href = "http://5ygsri.natappfree.cc/#/authorize";
      } else {
        this.token = token;
      }
      this.getSale();
    },
    methods: {
      //寝室销售统计
      getSale() {
        this.kk = 0;
        this.money = 0;
        this.dorSales.splice(0, this.dorSales.length);
        this.updatesTime.splice(0, this.updatesTime.length);
        this.namess.splice(0,this.namess.length);
        axios.get(API_PROXY + this.api + '/sell/seller/group/salesList?token=' + this.token).then((res) => {
          console.log(res);
          this.dorSales = res.data.data.list;
          console.log(this.dorSales);
          for (let i = 0; i < this.dorSales.length; i++) {
            var _x = this.dorSales[i].createTime;
            if(_x.toString().length === 10){
              var date = new Date(_x * 1000);
            }else{
              var date = new Date(_x * 1000);
            }
            this.times(date);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      getAll(event) {
        this.sNum = '';
        this.sNum = event.target.value;
        console.log(this.sNum);
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
        this.updatesTime.push(Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s);
        //console.log(this.createsTime);
        //return this.createsTime;
      },
      selectMore() {
        this.sTime = '';
        this.eTime = '';
        console.log(this.sNum);
        console.log(typeof(this.sNum));
        this.sTime = this.$refs.startTime.value;
        console.log(this.sTime);
        this.eTime = this.$refs.endTime.value;
        console.log(this.eTime);
        if (this.sNum === '1') {
          this.getSale();
        }
        //商品销售统计
        if (this.sNum === "2") {
          this.kk = 1;
          this.money = 0;
          axios.get(API_PROXY + 'http://wxsell.nat200.top/sell/seller/order/productSalesVolume?token=' + this.token + '&startTime='+this.sTime+'&endTime='+this.eTime).then((res) => {
            console.log(res);
            this.dorSales.splice(0, this.dorSales.length);
            this.consume.splice(0,this.dorSales.length);
            this.namess.splice(0,this.namess.length);
            this.updatesTime.splice(0, this.updatesTime.length);
            this.dorSales = res.data.data;
            console.log(this.dorSales);
            //console.log(this.dorData);
            for (let i = 0; i < this.dorSales.length; i++) {
              this.namess = this.dorSales[i].name;
              for(let j = 0; j < this.dorSales[i].foods.length;j++){
                //let _x = this.dorSales[i].foods;
                this.money += (this.dorSales[i].foods[j].price * this.dorSales[i].foods[j].quantity);
              }
            }
            //console.log(this.money);
          }).catch((err) => {
            console.log(err);
          })
        }
        //销售统计
        if (this.sNum === '3') {
          this.kk = 0;
          this.money = 0;
          axios.get(API_PROXY + 'http://wxsell.nat200.top/sell/seller/order/timeBetween?token=' + this.token + '&startTime='+this.sTime+'&endTime='+this.eTime).then((res) => {
            console.log(res);
            this.dorSales.splice(0, this.dorSales.length);
            this.consume.splice(0,this.dorSales.length);
            this.updatesTime.splice(0, this.updatesTime.length);
            //this.namess.splice(0,this.namess.length);
            this.dorSales = res.data.data.orderDTOVOList;
            console.log(this.dorSales);
            for (let i = 0; i < this.dorSales.length; i++) {
              //金额
              this.money += this.dorSales[i].orderAmount;
              this.consume.push(this.dorSales[i].orderAmount);
              //时间
              let _x = this.dorSales[i].createTime;
              if(_x.toString().length === 10){
                var date = new Date(_x * 1000);
              }else{
                var date = new Date(_x);
              }
              this.times(date);
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      }
    }
  };
</script>

<style>

</style>

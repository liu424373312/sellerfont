<template>
  <div id="orderlist" v-show="showFlag">
    <div class="weui-panel__hd hd">订单列表</div>
    <div v-for="(item,index) in this.orderData" :key="index" class="weui-form-preview orderitem">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">付款金额</label>
          <em class="weui-form-preview__value">¥{{repMoneys[index]}}</em>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <span class="weui-form-preview__value">{{group[index]}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">{{createsTime[index]}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">商品</label>
          <span class="weui-form-preview__value" v-for="(m,n) in item.replenishDetailList" :key="n">{{m.productName}}</span>
        </div>
      </div>
      <router-link :to="{name:'orderdetail',params:{goods:item,index:num}}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>查看详情</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </router-link>
      <div class="weui-form-preview__ft">
        <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:;" @click="sureRe(item)">{{cor1}}</a>
        <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:;"
                @click="cancelRe(item)">{{cor2}}
        </button>
      </div>
    </div>
    <div class="weui-mask" ref="mask" style="display:none"></div>
    <div class="weui-dialog" ref="dialog" style="display:none;height:100px;">
      <div class="weui-dialog_bd" style="width:100%;height:50px;position:absolute;margin-top:15px;">
        <span style="color:#0bb20c">{{this.con}}</span>暂无数据
      </div>
      <div class="weui-dialog_ft"
           style="height:50px;width:100%;position:absolute;margin-top:50px;border-top:1px solid rgba(0,0,0,0.1)">
        <a href="javascript:;" class="weui-dialog_btn weui-dialog_primary" @click="hiddens"
           style="color:#0bb20c;">知道了</a>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';

  const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
  export default {
    data() {
      return {
        token: '',
        api: 'http://wxsell.nat200.top',
        orderData: [],
        createsTime: [],
        orderlist: [],
        showFlag: false,
        goodsName: [],
        repMoneys: [],
        group: [],
        cor1: '',
        cor2: '',
        con: '',
        num:0
      }
    },
    created() {
      let token = this.getCookie('token');
      if (token === null || !token) {
        window.location.href = "http://5ygsri.natappfree.cc/#/authorize";
      } else {
        this.token = token;
      }
    },
    methods: {
      getTokens(obj){
        this.token = obj;
        console.log(this.token);
      },
      getOrder() {
        axios.get(API_PROXY + this.api + '/sell/seller/order/list?token=' + this.token + '&orderStatus=0&payStatus=1').then((res) => {
          console.log(res);
          this.orderData = res.data.data.orderDTOVOList;
          console.log(this.orderData);
          let dorTime = this.orderData[0].createTime;
          let date = new Date(dorTime);
          this.times(date);
        })
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
        this.createsTime.push(Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s);
        //console.log(this.createsTime);
        //return this.createsTime;
      },
      show(obj, index, cor1, cor2) {
        this.showFlag = true;
        //已配送订单
        if (index === 2) {
          this.group.splice(0, this.group.length);
          this.repMoneys.splice(0, this.repMoneys.length);
          this.createsTime.splice(0, this.createsTime.length);
          this.orderData.splice(0, this.orderData.length);
          this.goodsName.splice(0, this.goodsName.length);
          this.con = '';
          this.cor1 = '';
          this.cor2 = '';
          this.num = 2;
          console.log(obj);
          this.orderData = obj;
          console.log(this.orderData);
          if (JSON.stringify(this.orderData) === '[]') {
            this.con = "已配送订单";
            this.$refs.mask.style.display = "block";
            this.$refs.dialog.style.display = "block";
            //$.toast("暂无数据",1000);
          }
          this.cor1 = cor1;
          this.cor2 = cor2;
          for (let i = 0; i < this.orderData.length; i++) {
            //寝室号
            this.group.push(this.orderData[i].groupNo);
            this.repMoneys.push(this.orderData[i].dispatchAmount);
            let _x = this.orderData[i].createTime;
            let date = new Date(_x);
            this.times(date);
            //商品名
            for (let j = 0; j < this.orderData[i].dispatchDetailList.length; j++) {
              this.goodsName.push(this.orderData[i].dispatchDetailList[j].productName);
            }

          }
        }
        //已完结订单
        else if (index === 3) {
          this.group.splice(0, this.group.length);
          this.repMoneys.splice(0, this.repMoneys.length);
          this.createsTime.splice(0, this.createsTime.length);
          this.orderData.splice(0, this.orderData.length);
          this.goodsName.splice(0, this.goodsName.length);
          this.cor1 = '';
          this.cor2 = '';
          this.con = '';
          this.num = 3;
          console.log(obj);
          this.orderData = obj;
          console.log(this.orderData);
          if (JSON.stringify(this.orderData) === '[]') {
            this.con = "已完结订单";
            this.$refs.mask.style.display = "block";
            this.$refs.dialog.style.display = "block";
            //$.toast("暂无数据",1000);
          }
          this.cor1 = cor1;
          this.cor2 = cor2;
          for (let i = 0; i < this.orderData.length; i++) {
            //寝室号
            this.group.push(this.orderData[i].groupNo);
            this.repMoneys.push(this.orderData[i].orderAmount);
            let _x = this.orderData[i].updateTime;
            let date = new Date(_x);
            this.times(date);
            //商品名
            for (let j = 0; j < this.orderData[i].orderDetailVOList.length; j++) {
              this.goodsName.push(this.orderData[i].orderDetailVOList[j].productName);
            }
          }
        }
        //补货订单
        else if (index === 4) {
          this.group.splice(0, this.group.length);
          this.repMoneys.splice(0, this.repMoneys.length);
          this.createsTime.splice(0, this.createsTime.length);
          this.orderData.splice(0, this.orderData.length);
          this.goodsName.splice(0, this.goodsName.length);
          this.cor1 = '';
          this.cor2 = '';
          this.con = '';
          this.num = 4;
          //console.log(obj);
          this.orderData = obj;
          console.log(this.orderData);
          if (JSON.stringify(this.orderData) === '[]') {
            this.con = "补货订单";
            this.$refs.mask.style.display = "block";
            this.$refs.dialog.style.display = "block";
            //$.toast("暂无数据",1000);
          }
          this.cor1 = cor1;
          this.cor2 = cor2;
          for (let i = 0; i < this.orderData.length; i++) {
            //寝室号
            this.group.push(this.orderData[i].groupNo);
            this.repMoneys.push(this.orderData[i].replenishAmount);
            let _x = this.orderData[i].createTime;
            let date = new Date(_x);
            this.times(date);
            //商品名
            /*for (let j = 0; j < this.orderData[i].replenishDetailList.length; j++) {
              this.goodsName.push(this.orderData[i].replenishDetailList[j].productName);
            }
            console.log(this.goodsName);*/

          }
        }
        //console.log(this.goodsName);
        //console.log(this.createsTime);
      },
      sureRe(obj) {
        if (this.cor1 === "完成") {
          console.log(obj);
          let num = obj.groupNo;
          console.log(num);
          axios.get(API_PROXY + this.api + '/sell/seller/dispatch/finish?groupNo=' + num + '&token=' + this.token).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
        }
        else if (this.cor1 === "补货") {
          console.log(obj);
        }
      },
      cancelRe(obj) {
        if (this.cor2 === "取消") {
          axios.get(API_PROXY + this.api + '/sell/seller/dispatch/cancel?groupNo=' + obj.groupNo + '&token=' + this.token).then((res) => {
            console.log(res);
            if (res.data.msg === "成功") {
              $.toast("取消成功!");
            } else {
              $.toast("取消失败", 2000, "forbidden");
            }
          }).catch((err) => {
            console.log(err);
          });
          //console.log(obj);
        }
        else if (this.cor2 === "取消补货") {
          axios.get(API_PROXY + this.api + '/sell/seller/replenish/cancel?replenishId=' + obj.resplenishId).then((res) => {
            console.log(res);
            if (res.data.msg === "成功") {
              $.toast("取消补货成功", 5000);
            } else {
              $.toast("取消失败", 100, "forbidden");
            }
          }).catch((err) => {
            console.log(err);
          });
          //console.log(obj);
        }

      },
      hiddens() {
        this.$refs.mask.style.display = "none";
        this.$refs.dialog.style.display = "none";
      }
    }
  };
</script>

<style>
  #orderlist {
    height: 550px;
    overflow: auto;
  }

  .orderitem {
    margin-bottom: 30px;
  }
</style>

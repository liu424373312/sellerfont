<template>
  <div id="dorstatistic">
    <div class="weui-panel__hd hd">寝室销售统计</div>
    <div class="weui-form-preview orderitem" v-for="(item,index) in this.staData" :key="index">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">寝室号</label>
          <em class="weui-form-preview__value">{{item.groupNo}}</em>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">购买人</label>
          <span class="weui-form-preview__value ordergoods">
            <span>{{item.userName}} </span>
          </span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">联系方式</label>
          <span class="weui-form-preview__value ordergoods">
            <span>{{item.userPhone}} </span>
          </span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">付款金额</label>
          <span class="weui-form-preview__value">￥{{item.groupConsume}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">时间</label>
          <span class="weui-form-preview__value">{{upTimes[index]}}</span>
        </div>
      </div>
    </div>
    <div class="weui-form-preview__item" style="margin-top:10px;">
      <a href="javascript:;" class="weui-btn weui-btn_default weui-btn_mini" @click="lastPage">上一页</a>
      <input type="number" class="weui-search-bar_input"
             style="display:inline-block;width:50px;height:18px;text-align: center" value="" v-model="page"
             @keyup.enter="gotoPages"/>
      <a href="javascript:;" class="weui-btn weui-btn_default weui-btn_mini" @click="nextPage">下一页</a>
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
        token: '',
        staData: [],
        upTimes: [],
        page: 1,
      }
    },
    created() {
      this.token = this.getCookie("token");
      console.log(this.token);
      this.getStatistic();
    },
    methods: {
      getStatistic() {
        axios.get(API_PROXY + this.api + '/sell/seller/group/salesList?token=' + this.token + '&orderField=groupConsume' + '&page=' + this.page).then((res) => {
          console.log(res);
          this.staData = res.data.data.list;
          this.upTimes.splice(0, this.upTimes.length);
          for (let i = 0; i < this.staData.length; i++) {
            var _x = this.staData[i].updateTime;
            if (_x.toString().length === 10) {
              var date = new Date(_x * 1000);
            } else {
              var date = new Date(_x);
            }
            this.times(date);
          }
          console.log(this.staData);
        }).catch((err) => {
          console.log(err);
        })
      },
      times(date1) {
        var Y = date1.getFullYear();
        //console.log(Y);
        //console.log(dorTime);
        var M =
          date1.getMonth() + 1 < 0
            ? +(date1.getMonth() + 1)
            : date1.getMonth() + 1;
        //console.log(M);
        var D = date1.getDate();
        //console.log(D);
        var h = date1.getHours();
        //console.log(h);
        var m =
          date1.getMinutes() < 10 ? "0" + date1.getMinutes() : date1.getMinutes();
        //console.log(m);
        var s =
          date1.getSeconds() < 10 ? "0" + date1.getSeconds() : date1.getSeconds();
        //console.log(s);
        this.upTimes.push(
          Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s
        );
        //console.log(this.createsTime);
        //return this.createsTime;
      },
      gotoPages() {
        //console.log(this.content);
        console.log(this.page);
        axios.get(API_PROXY + this.api + '/sell/seller/group/salesList?token=' + this.token + '&orderField=groupConsume' + '&page=' + this.page).then((res) => {
          console.log(res);
          this.staData = res.data.data.list;
          if (this.staData.length === 0) {
            weui.topTips("请输入正确的页码!");
          } else {
            this.upTimes.splice(0, this.upTimes.length);
            for (let i = 0; i < this.staData.length; i++) {
              var _x = this.staData[i].updateTime;
              if (_x.toString().length === 10) {
                var date = new Date(_x * 1000);
              } else {
                var date = new Date(_x);
              }
              this.times(date);
            }
            console.log(this.staData);
          }

        }).catch((err) => {
          weui.topTips("请输入正确的页码!");
          console.log(err);
        })

        this.getStatistic();
      },
      lastPage() {
        this.page--;
        if (this.page === 0) {
          weui.alert("不能再翻啦");
          this.page += 1;
        } else {
          this.getStatistic();
        }
      },
      nextPage() {
        this.page++;
        axios.get(API_PROXY + this.api + '/sell/seller/group/salesList?token=' + this.token + '&orderField=groupConsume' + '&page=' + this.page).then((res) => {
          console.log(res);
          this.staData = res.data.data.list;
          if (this.staData.length === 0) {
            weui.alert('不能再翻啦');
            this.page -= 1;
            console.log(this.page);
            this.getStatistic();
          } else {
            this.upTimes.splice(0, this.upTimes.length);
            for (let i = 0; i < this.staData.length; i++) {
              var _x = this.staData[i].updateTime;
              if (_x.toString().length === 10) {
                var date = new Date(_x * 1000);
              } else {
                var date = new Date(_x);
              }
              this.times(date);
            }
            console.log(this.staData);
          }

        }).catch((err) => {
          console.log(err);
        })
      }
    }
  };
</script>

<style>

</style>

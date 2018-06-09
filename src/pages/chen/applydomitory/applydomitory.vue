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
          <label class="weui-form-preview__label">创建时间</label>
          <span class="weui-form-preview__value">{{createsTimes[index]}}</span>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">更新时间</label>
          <span class="weui-form-preview__value">{{updateTimes[index]}}</span>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:" @click="applyDor(item)">新增寝室</a>
        <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:;" @click="del(item)">删除
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import weui from "weui.js";
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
      token: "",
      applyData: [],
      createsTimes: [],
      modes: [],
      id: "",
      updateTimes: []
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.applys();
    //this.pushHistory();
    this.modes = this.$route.params.modes;
    console.log(this.modes);
  },
  mounted() {},
  methods: {
    applys() {
      axios
        .get(
          config.sellerUrl + "/sell/seller/boxApply/list?token=" + this.token
        )
        .then(response => {
          console.log(response);
          this.applyData = response.data.data.list;
          //console.log(this.applyData);
          var applyTimes;
          //var i = 0;
          this.createsTimes.splice(0, this.createsTimes.length);
          this.updateTimes.splice(0, this.updateTimes.length);
          for (var i = 0; i < this.applyData.length; i++) {
            //this.times = this.applyData[i].createTime;
            //console.log(applyTimes);
            //console.log(this.times);
            var date = new Date(this.applyData[i].createTime);
            this.changeTime(date);
            var date2 = new Date(this.applyData[i].updateTime);
            this.upsTime(date2);
          }
        });
    },
    upsTime(date1) {
      if (date1.toString().length === 10) {
        date1 = date1 * 1000;
      }
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
      var m = date1.getMinutes();
      //console.log(m);
      var s = date1.getSeconds();
      //console.log(s);
      this.updateTimes.push(
        Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s
      );
    },
    changeTime(date1) {
      if (date1.toString().length === 10) {
        date1 = date1 * 1000;
      }
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
      var m = date1.getMinutes();
      //console.log(m);
      var s = date1.getSeconds();
      //console.log(s);
      this.createsTimes.push(
        Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s
      );
      //console.log(this.createsTime);
    },
    applyDor(obj) {
      let id = obj.id;
      console.log(obj);
      //this.id = obj.id;
      //console.log(obj.id);
      axios
        .get(config.sellerUrl + "/sell/seller/boxApply/save?id=" + id)
        .then(res => {
          console.log(res);
          weui.toast("增加成功!", {
            duration: 1000
          });
          axios
            .get(
              config.sellerUrl +
                "/sell/seller/boxApply/list?token=" +
                this.token
            )
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          weui.$topTips("增加失败!");
          console.log(err);
        });
    },
    del(obj) {
      let id = obj.id;
      axios
        .get(config.sellerUrl + "/sell/seller/boxApply/delete?id=" + id)
        .then(res => {
          console.log(res);
          weui.toast("操作成功", {
            duration: 2000
          });
          axios
            .get(
              config.sellerUrl +
                "/sell/seller/boxApply/list?token=" +
                this.token
            )
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
      //console.log(obj);
    },
    pushHistory() {
      let state = {
        title: "title",
        url: "#"
      };
      window.history.pushState(state, "title", "#");
    }
  }
};
</script>

<style>
.orderitem {
  margin-bottom: 30px;
}
</style>


<template>
  <div id="search">
    <div class="page__bd search">
      <div class="weui-search-bar">
        <form class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <i class="weui-icon-search" @click="one"></i>
            <input type="search" class="weui-search-bar__input" v-model="val" ref="searchinput" @blur="searchhide" placeholder="搜索" @input="one" required/>
            <a href="javascript:" class="weui-icon-clear" @click="searchclear"></a>
          </div>
          <label class="weui-search-bar__label" v-show="searchtext" @click="searchshow">
            <i class="weui-icon-search"></i>
            <span>搜索</span>
          </label>
        </form>
        <a href="javascript:" class="weui-search-bar__cancel-btn cancel" v-show="cancel" id="searchCancel" @click="cancelSearch">取消</a>
      </div>

      <!--<div class="page__bd search" v-if="val !== '' " v-for="(item,index) in this.name" :key="index">{{item}}</div>-->
    </div>
    <div v-if="val !== ''">
      <div class="weui-panel__hd hd">查询结果</div>
      <div v-for="(item,index) in this.name" :key="index" class="weui-cell weui-cell_access" @click="gotoDor(item)">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <!--<p class="weui-media-box__desc">{{createsTime[index]}}</p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var config = require("../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
      searchtext: true,
      cancel: false,
      token: "",
      api: "http://wxsell.nat200.top",
      name: [],
      val: ""
    };
  },
  created() {
    let token = this.getCookie("token");
    if (token === null || !token) {
      window.location.href = " http://5ygsri.natappfree.cc/#/authorize";
    } else {
      this.token = token;
    }
  },
  methods: {
    searchshow() {
      this.searchtext = false;
      this.$refs.searchinput.focus();
      this.cancel = true;
    },
    searchhide() {
      this.searchtext = true;
      this.cancel = false;
    },
    searchclear() {
      console.log((this.$refs.searchinput.value = ""));
      this.searchtext = false;
      this.cancel = true;
      this.$refs.searchinput.focus();
    },
    one() {
      this.name.splice(0, this.name.length);
      console.log(this.val);
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/group/searchList?token=" +
            this.token +
            "&groupNo=" +
            this.val
        )
        .then(res => {
          console.log(res);
          this.name = res.data.data;
          /*for (let i = 0; i < res.data.data.length; i++) {
            this.name.push(res.data.data[i].groupNo);
          }*/
          console.log(this.name);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelSearch() {
      this.val = "";
      this.name.splice(0, this.splice.length);
    },
    gotoDor(obj) {
      console.log(obj);
      this.setCookie("groupId", obj.groupId, 1);
      this.$router.push({ name: "domitorydetail" });
    }
  }
};
</script>

<style>
.cancel {
  display: block;
}
</style>

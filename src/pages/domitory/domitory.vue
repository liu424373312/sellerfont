<template>
  <div id="domitory">
    <search ref="schil"></search>
    <div>
      <router-link to="adddomitory" class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>添加寝室</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <router-link to="applydomitory" class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>查看寝室申请列表</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>
    <div class="weui-cell weui-cell_select weui-cell_select-after">
      <div class="weui-cell__hd">
        <label for="" class="weui-label">寝室分区</label>
      </div>
      <div class="weui-cell__bd">
        <select v-model="groupDistrict" class="weui-select" name="select2" @change="getAll">
          <option :value="item.groupDistrict" v-for="(item,index) in domitory" :key="index">{{item.districtName}}
          </option>
        </select>
      </div>
    </div>
    <div class="weui-panel__hd hd">寝室列表</div>
    <div class="domitorylist">
      <router-link v-for="(item,index) in this.dorData" :key="index"
                   :to="{name:'domitorydetail'}" class="weui-cell weui-cell_access"
                   @click.native="selectDor(item)">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <p class="weui-media-box__desc">{{createsTime[index]}}</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import search from "../../components/search/search";

  const API_PROXY = "http://bird.ioliu.cn/v2?url=";
  export default {
    data() {
      return {
        api: "http://wxsell.nat200.top",
        dorData: [],
        createsTime: [],
        token: "",
        domitory: [],
        groupDistrict: 1,
        groupId:''
      };
    },
    created() {
      let token = this.getCookie("token");
      axios
        .get(
          API_PROXY + this.api + "/sell/seller/group/district?token=" + token
        )
        .then(response => {
          console.log(response.data);
          this.domitory = response.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      if (token === null || !token) {
        window.location.href = " http://rm4nka.natappfree.cc";
      } else {
        this.token = token;
      }
      console.log(this.token);

      this.getApi();
    },
    mounted() {
    },
    methods: {
      pushHistory() {
        var state = {
          title: "title",
          url: "#"
        };
        window.history.pushState(state, "title", "#");
      },
      getApi() {
        axios
          .get(
            API_PROXY +
            "http://wxsell.nat200.top/sell/seller/group/list?page=1&size=10&groupDistrict=1&token=" +
            this.token
          )
          .then(response => {
            this.dorData = response.data.data.list;
            console.log(this.dorData);

          });
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
        this.createsTime.push(
          Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s
        );
        //console.log(this.createsTime);
        //return this.createsTime;
      },
      getAll() {
        axios
          .get(
            API_PROXY +
            "http://wxsell.nat200.top/sell/seller/group/list?page=1&size=10&groupDistrict=" +
            this.groupDistrict +
            "&token=" +
            this.token
          )
          .then(response => {
            //console.log(response);
            this.dorData.splice(0, this.dorData.length);
            this.dorData = response.data.data.list;
            console.log(this.dorData);
          })
          .catch(err => {
            console.log(err);
          });
        //console.log(this.dorDetail);
      },
      selectDor(obj) {
        console.log(obj);
        this.setCookie("groupId",obj.groupId,1);
        console.log(this.getCookie("groupId"));
      }
    },
    components: {
      search
    }
  };
</script>

<style>
  .domitorylist {
    overflow: auto;
  }
</style>

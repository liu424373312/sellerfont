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
      <router-link to="dorstatistic" class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>寝室销售统计</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>
    <div class="weui-cell weui-cell_select weui-cell_select-after">
      <div class="weui-cell__hd">
        <label for="" class="weui-label">寝室分区</label>
      </div>
      <!--<div class="weui-cell__bd">
        <select v-model="schoolNo" class="weui-select" name="select2" @change="getsDormitory">
          <option v-for="(item,index) in this.school" :key="index" :value="item.schoolNo">{{item.schoolName}}</option>
        </select>
      </div>-->
      <div class="weui-cell__bd">
        <select v-model="groupDistrict" class="weui-select" name="select2" @change="getAll">
          <option :value="item.groupDistrict" v-for="(item,index) in domitory" :key="index">{{item.districtName}}
          </option>
        </select>
      </div>
    </div>
    <div class="weui-panel__hd hd">寝室列表</div>
    <div class="domitorylist">
      <router-link v-for="(item,index) in this.dorData" :key="index" :to="{name:'domitorydetail'}" class="weui-cell weui-cell_access" @click.native="selectDor(item)">
        <div class="weui-cell__bd">
          <h4 class="weui-media-box__title">{{item.groupNo}}</h4>
          <p class="weui-media-box__desc">{{createsTime[index]}}</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </router-link>
    </div>
    <div class="page">
      <button class="weui-btn weui-btn_mini weui-btn_default" @click="backpage">上一页</button>
      <span>第{{page}}页</span>
      <button class="weui-btn weui-btn_mini weui-btn_default" @click="nextpage">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import search from "../../../components/search/search";

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
      groupId: "",
      schoolNo: 0,
      school: [],
      page: "1"
    };
  },
  created() {
    this.token = this.getCookie("token");
    this.schoolNo = this.getCookie("schoolNo");
    this.default_dormitory();
    axios
      .get(
        API_PROXY + this.api + "/sell/seller/school/list?token=" + this.token
      )
      .then(res => {
        console.log(res);
        this.school = res.data.data;
        console.log(this.school);
      })
      .catch(err => {
        console.log(err);
      });
    this.getApi();
  },
  mounted() {},
  methods: {
    getApi() {
      axios
        .get(
          API_PROXY +
            "http://wxsell.nat200.top/sell/seller/group/list?page=" +
            this.page +
            "&groupDistrict=1&token=" +
            this.token
        )
        .then(response => {
          this.dorData = response.data.data.list;
          console.log(this.dorData);
        });
    },
    getsDormitory() {
      console.log(this.schoolNo);
      this.domitory.splice(0, this.domitory.length);
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/group/districtList?token=" +
            this.token +
            "&schoolNo=" +
            this.schoolNo
        )
        .then(res => {
          console.log(res);
          this.domitory = res.data.data;
        })
        .catch(err => {
          console.log(err);
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
    default_dormitory() {
      this.domitory.splice(0, this.domitory.length);
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/group/districtList?token=" +
            this.token +
            "&schoolNo=1"
        )
        .then(res => {
          console.log(res);
          this.domitory = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAll() {
      axios
        .get(
          API_PROXY +
            "http://wxsell.nat200.top/sell/seller/group/list?page=" +
            this.page +
            "&groupDistrict=" +
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
      this.setCookie("groupId", obj.groupId, 1);
      console.log(this.getCookie("groupId"));
    },
    nextpage() {
      this.page++;
      this.getAll();
    },
    backpage() {
      this.page--;
      this.getAll();
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

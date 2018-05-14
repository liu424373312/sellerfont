<template>
    <div id="adddomitory">
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">寝室号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" pattern="[0-9]*" placeholder="例:1-1-111" v-model="groupNo" value=""/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">申请人姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" pattern="[0-9]*" placeholder="请输入申请人姓名" v-model="userName" value=""/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">申请人电话</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入申请人电话" v-model="userPhone" value=""/>
                </div>
            </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">所属区</label>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name="select2" @change="getAll($event)">
                  <option v-for="(h,k) in this.index" :key="k" :value="h.indexId">{{h.name}}</option>
                    <!--<option value="1">一区用户</option>
                    <option value="2">二区用户</option>
                    <option value="3">七区用户</option>-->
                </select>
            </div>
        </div>
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="subBox">提交</a>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import weui from "weui.js";
const API_PROXY = 'http://bird.ioliu.cn/v1?url=';
export default {
  data() {
    return {
      index:[
        {
          "indexId":0,
          "name":"请选择宿舍区"
        },
        {
          "indexId":1,
          "name":'一区'
        },
        {
          "indexId":2,
          "name":'二区'
        },
        {
          "indexId":3,
          "name":'三区'
        },
        {
          "indexId":4,
          "name":'四区'
        },
        {
          "indexId":5,
          "name":'五区'
        },
        {
          "indexId":6,
          "name":'六区'
        },
        {
          "indexId":7,
          "name":'七区'
        },
        {
          "indexId":8,
          "name":'八区'
        }
      ],
      num:'',
      name:'',
      phone:'',
      district:'',
      api:'http://wxsell.nat200.top',
      token:'',
      groupNo:'',
      userName:'',
      userPhone:''
    }
  },
  created(){
    let token = this.getCookie('token');
    if (token === null || !token) {
      window.location.href = " http://rm4nka.natappfree.cc";
    } else {
      this.token = token;
    }
  },
  methods:{
    getAll(event){
      this.district = event.target.value;
      //console.log(this.group);
    },
    subBox(){
      let group = this.groupNo[0];
      console.log(group);
      console.log(typeof(group));
      console.log(typeof(this.district));
      if(this.groupNo === ''){
        weui.topTips('寝室号不能为空!',1000);
      }
      else if(this.userName === ''){
        weui.topTips('申请人姓名不能为空!',1000);
      }
      else if(this.userPhone === ''){
        weui.topTips('申请人电话不能为空!',1000);
      }
      else if(this.district === ''){
        weui.topTips('所属区不能为空')
      }
      else if(group !== this.district){
        weui.topTips(this.district + "区没有这个寝室");
      }
      else{
        let obj = {
          token:this.token,
          groupNo:this.groupNo,
          userName:this.userName,
          userPhone:this.userPhone,
          groupDistrict:this.district
        };
        let send = qs.stringify(obj);
        axios.post(this.api + '/sell/seller/group/save',send,{
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          console.log(res);
          if(res.data.msg === "成功"){
            weui.toast("新增寝室成功!",{
              duration:1000
            });
            this.groupNo = '';
            this.userName = '';
            this.userPhone = '';
            /*this.$refs.grupNo.value = '';
            this.$refs.userName.value = '';
            this.$refs.userPhone.value = '';*/
          }
        }).catch((err) => {
          weui.alert("该寝室已存在!");
          /*$.toast("增加失败！","cancel",{
            duration:2000,
          });*/
          console.log(err);
        })

      }





      //$.toast("提交成功!");
    }
  }
};
</script>

<style>

</style>

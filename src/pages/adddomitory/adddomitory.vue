<template>
    <div id="adddomitory">
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">寝室号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" pattern="[0-9]*" placeholder="请输入寝室号" ref="groupNo"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">申请人姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" pattern="[0-9]*" placeholder="请输入申请人姓名" ref="userName"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">申请人电话</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入申请人电话" ref="userPhone"/>
                </div>
            </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">所属区</label>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name="select2" @change="getAll($event)" style="font-size:14px;color:pink">
                  <option v-for="h in this.index" :key="h" :value="h.indexId">{{h.name}}</option>
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
      token:''
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
      this.num = this.$refs.groupNo.value;
      console.log(this.num);
      this.name = this.$refs.userName.value;
      console.log(this.name);
      this.phone = this.$refs.userPhone.value;
      console.log(this.phone);
      console.log(this.district);
      let obj = {
        token:this.token,
        groupNo:this.num,
        username:this.name,
        userPhone:this.phone,
        groupDistrict:this.district
      };
      let send = qs.stringify(obj);
      axios.post('http://wxsell.nat200.top/sell/seller/group/save',send,{
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
      //$.toast("提交成功!");
    }
  }
};
</script>

<style>

</style>

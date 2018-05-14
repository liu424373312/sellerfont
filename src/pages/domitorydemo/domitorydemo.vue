<template>
    <div id="gomitoryorder">
        <div class="weui-panel__hd hd">模板商品列表</div>
        <div class="page__bd page__bd_spacing ">
            <div class="weui-panel weui-panel_access goodslist">
                <div class="weui-panel__bd">
                    <div v-for="(item,index) in this.dorGoods" :key="index" class="weui-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="item.foods[0].icon" alt="">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item.foods[0].name}}</h4>
                            <p class="weui-media-box__desc">单价￥{{item.foods[0].price}}</p>
                          <p class="weui-media-box__desc">库存{{item.foods[0].stock}}</p>
                        </div>
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__bd">
                            </div>
                            <div class="weui-cell__ft" @click="change(item.foods[0].quantity)" ref="goodsNum">x{{item.foods[0].quantity}}</div>
                        </a>
                    </div>
                </div>
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
      groupNo:'',
      token: '',
      api: 'http://wxsell.nat200.top',
      dorGoods:[]
    };
  },
  mounted(){
  },
  created(){
    let token = this.getCookie('token');
    if (token === null || !token) {
      window.location.href = " http://rm4nka.natappfree.cc";
    } else {
      this.token = token;
    }
    this.groupNo = this.getCookie("groupNo");
    console.log(this.getCookie("groupNo"));
    this.products();
  },
  methods: {
    products() {
      axios.get(API_PROXY + this.api + '/sell/seller/group/productList?token='+this.token+'&groupNo='+this.groupNo).then((res) => {
        console.log(res);
        this.dorGoods = res.data.data;
        console.log(this.dorGoods);
      }).catch((err) => {
        console.log(err);
      })
    },
    change(obj){
      console.log(obj);
      this.setCookie("quantity",obj,1);
      this.$router.push({name:"textinput"});
    }
  }
}
</script>

<style>

</style>

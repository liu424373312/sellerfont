<template>
    <div id="goods">
        <searchgoods class="search" :data='goods'></searchgoods>
        <div class="weui-cells__title hd"></div>
        <div class="weui-cells">
            <router-link :to="{ name:'addgoods',params:{goodsclass:goods}}" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>添加商品</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link :to="{ name:'goodsclass'}" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>商品类目管理</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <div class="weui-cell weui-cell_access" @click="allgoodslist">
                <div class="weui-cell__bd">
                    <p>全部商品</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
        <div class="weui-cells__title hd">商品类目</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access" @click="goodslist(index)" v-for="(item,index) in goods" :key="index">
                <div class="weui-cell__bd">
                    <p>{{item.name}}</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
    </div>
</template>

<script>
import searchgoods from "../../../components/search/searchgoods";
import axios from "axios";
export default {
  data() {
    return {
      goods: [],
      token: ""
    };
  },
  components: {
    searchgoods
  },
  methods: {
    goodslist(index) {
      this.setCookie("goodsclass", index, 1);
      this.setCookie("all", false, 1);
      this.$router.push({ name: "goodslist" });
    },
    allgoodslist() {
      this.setCookie("all", true, 1);
      this.$router.push({ name: "goodslist" });
    }
  },
  created() {
    this.token = this.getCookie("token");
    axios
      .get("/api/sell/seller/product/list?token=" + this.token
      )
      .then(response => {
        console.log(response.data);
        this.goods = response.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style >
</style>

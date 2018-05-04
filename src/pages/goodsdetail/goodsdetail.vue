<template>
  <div id="goodsdetail">
    <div class="weui-cells__title">商品信息</div>
    <div class="weui-cells">
      <router-link class="weui-cell weui-cell_access" to="textinput">
        <div class="weui-cell__bd">
          <p>商品图片</p>
        </div>
        <div class="weui-cell__ft">
          <img :src=goodsdetail.icon alt="" style="width:20px;margin-right:5px;display:block">
        </div>
      </router-link>
      <div class="weui-cell weui-cell_access" @click="showdialog(1,goodsdetail.name)">
        <div class="weui-cell__bd">
          <p>商品名称</p>
        </div>
        <div class="weui-cell__ft">{{goodsdetail.name}}</div>
      </div>
      <div class="weui-cell weui-cell_access" @click="showdialog(2,goodsdetail.price)">
        <div class="weui-cell__bd">
          <p>商品售价</p>
        </div>
        <div class="weui-cell__ft">{{goodsdetail.price}}元</div>
      </div>
      <div class="weui-cell weui-cell_access" @click="showdialog(3,goodsdetail.purchasePrice)">
        <div class="weui-cell__bd">
          <p>商品进价</p>
        </div>
        <div class="weui-cell__ft">{{goodsdetail.purchasePrice}}元</div>
      </div>
      <div class="weui-cell weui-cell_access" @click="showdialog(4,goodsdetail.stock)">
        <div class="weui-cell__bd">
          <p>商品库存</p>
        </div>
        <div class="weui-cell__ft">{{goodsdetail.stock}}</div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>商品状态</p>
        </div>
        <div class="weui-cell__ft">{{status}}</div>
      </div>
      <div class="weui-cell weui-cell_access" @click="showdialog(5,goodsdetail.description)">
        <div class="weui-cell__bd">
          <p>商品描述</p>
        </div>
        <div class="weui-cell__ft">{{goodsdetail.description}}</div>
      </div>
    </div>
    <a href="javascript:;" v-if="btnshow" class="weui-btn weui-btn_warn" @click="offsale">下架商品</a>
    <a href="javascript:;" v-else class="weui-btn weui-btn_primary" @click="onsale">上架商品</a>
    <div class="js_dialog" v-show="dialogshow">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">修改商品信息</strong>
        </div>
        <div class="weui-dialog__bd">
          <div class="weui-cell">
            <input class="weui-input" v-model="textinput" placeholder="请输入修改信息">
          </div>
        </div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="modifygoods">确认</a>
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="hidedialog">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let param = new FormData();
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
export default {
  data() {
    return {
      goodsdetail: [],
      api: "http://wxsell.nat200.top",
      btnshow: true,
      data: {},
      status: "",
      dialogshow: false,
      textinput: "",
      index: ""
    };
  },
  created() {
    this.getgoodsdetail();
  },
  mounted() {},
  methods: {
    modifygoods() {
      if (this.index == 1) {
        this.goodsdetail.name = this.textinput;
      }
      if (this.index == 2) {
        this.goodsdetail.price = this.textinput;
      }
      if (this.index == 3) {
        this.goodsdetail.purchasePrice = this.textinput;
      }
      if (this.index == 4) {
        this.goodsdetail.stock = this.textinput;
      }
      if (this.index == 5) {
        this.goodsdetail.description = this.textinput;
      }
      console.log(this.goodsdetail)
      param.append("token", this.goodsdetail.token);
      param.append("productName", this.goodsdetail.name);
      param.append("productPrice", this.goodsdetail.price);
      param.append("purchasePrice", this.goodsdetail.purchaseprice);
      param.append("productStock", this.goodsdetail.stock);
      param.append("productDescription", this.goodsdetail.description);
      axios
        .post(this.api + "/sell/seller/product/save", param, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        });
      this.getgoodsdetail();
    },
    onsale() {
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/product/on_sale?token=" +
            this.getCookie("token") +
            "&productId=" +
            this.getCookie("productId")
        )
        .then(response => {
          console.log(response.data);
          this.getgoodsdetail();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    offsale() {
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/product/off_sale?token=" +
            this.getCookie("token") +
            "&productId=" +
            this.getCookie("productId")
        )
        .then(response => {
          console.log(response.data);
          this.getgoodsdetail();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getgoodsdetail() {
      axios
        .get(
          API_PROXY +
            this.api +
            "/sell/seller/product/index?token=" +
            this.getCookie("token") +
            "&productId=" +
            this.getCookie("productId")
        )
        .then(response => {
          console.log(response.data);
          this.goodsdetail = response.data.data.foods[0];
          if (this.goodsdetail.status == 0) {
            this.status = "在售";
            this.btnshow = true;
          } else {
            this.status = "下架";
            this.btnshow = false;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    showdialog(index, item) {
      this.dialogshow = true;
      this.textinput = item;
      this.index = index;
    },
    hidedialog() {
      this.dialogshow = false;
    }
  }
};
</script>

<style>

</style>

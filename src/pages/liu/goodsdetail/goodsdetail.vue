<template>
  <div id="goodsdetail">
    <div class="weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>商品图片</p>
        </div>
        <div class="weui-cell__ft">
          <img :src=goodsdetail.icon alt="" style="width:20px;margin-right:5px;display:block">
        </div>
      </div>
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
      <div class="weui-cell weui-cell_access" @click="showdialog(6,goodsdetail.categoryType)">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">商品类目</label>
        </div>
        <div class="weui-cell__bd">
          <div v-if="goodsdetail.categoryType==item.type" class="weui-cell__ft" v-for="(item,index) in goodsclass" :key="index">{{item.name}}</div>
        </div>
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
    <div class="js_dialog" v-show="goodsclassdialogshow">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">修改商品信息</strong>
        </div>
        <div class="weui-dialog__bd">
          <select v-model="goodsdetail.categoryType" class="weui-select" name="select2">
            <option class="weui-cell__ft" :value="item.type" v-for="(item,index) in goodsclass" :key="index">{{item.name}}</option>
          </select>
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
import weui from "weui.js";
const API_PROXY = "http://bird.ioliu.cn/v1?url=";
export default {
  data() {
    return {
      goodsclass: [],
      goodsdetail: [],
      api: "http://wxsell.nat200.top",
      btnshow: true,
      data: {},
      status: "",
      dialogshow: false,
      goodsclassdialogshow: false,
      textinput: "",
      index: "",
      token: this.getCookie("token")
    };
  },
  created() {
    this.getgoodsdetail();
    axios
      .get(
        API_PROXY + this.api + "/sell/seller/product/list?token=" + this.token
      )
      .then(response => {
        console.log(response.data);
        this.goodsclass = response.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  mounted() {},
  methods: {
    modifygoods() {
      let param = new FormData();
      var loading = weui.loading("提交中");
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
      param.append("token", this.getCookie("token"));
      param.append("productId", this.goodsdetail.id);
      param.append("productName", this.goodsdetail.name);
      param.append("productPrice", this.goodsdetail.price);
      param.append("purchasePrice", this.goodsdetail.purchasePrice);
      param.append("productStock", this.goodsdetail.stock);
      param.append("productDescription", this.goodsdetail.description);
      param.append("categoryType", this.goodsdetail.categoryType);
      param.append("productIcon", this.goodsdetail.icon);
      console.log(param);
      axios
        .post(this.api + "/sell/seller/product/save", param, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          loading.hide();
          weui.toast("修改成功", {
            duration: 1000
          });
          this.hidedialog();
          this.getgoodsdetail();
        })
        .catch(function(err) {
          console.log(err);
          loading.hide();
          this.hidedialog();
          weui.topTips("修改失败!");
          this.getgoodsdetail();
        });
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
      if (index == 6) {
        this.goodsclassdialogshow = true;
      }
      this.dialogshow = true;
      this.textinput = item;
      this.index = index;
    },
    hidedialog() {
      this.dialogshow = false;
      this.goodsclassdialogshow= false;
    }
  }
};
</script>

<style>
</style>

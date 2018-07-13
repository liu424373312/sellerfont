<template>
  <div class="goodMain">
    <div class="goods">
      <div class="menu-wrapper menu-list-hook" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index,$event)">
            <span class="text border-1px">
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-if="food.quantity > 0" @click="selectFood(food,$event)" v-for="(food,index) in item.foods" class="food-item border-1px" :key="index">
                <div class="icon">
                  <img width="68" height="68" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name" style="margin-left:10px;">{{food.name}}</h2>
                  <div class="price">
                    <span class="now" style="margin-left:10px;">￥{{food.price}}元</span>
                  </div>
                  <div class="sales" v-if="food.sales > 0">
                    <span class="sales" style="margin-left:10px;">商品销售量:{{food.sales}}</span>
                  </div>
                  <div class="extra">
                    <span class="count" style="margin-left:10px;">仓库库存:{{food.quantity}}</span>
                  </div>
                  <div class="stock" style="margin-top:5px;" v-if="food.stock > 0" >
                    <span class="stock" style="margin-left:10px;">寝室库存:{{food.stock}}</span>
                  </div>
                  <div class="stockout" style="margin-top:5px;" v-if="food.stockout > 0">
                    <span class="stockout" style="margin-left:10px;">寝室回收数量:{{food.stockout}}</span>
                  </div>
        
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--<shopcart ref="shopcart" :select-foods="selectFoods" ></shopcart>-->
    </div>
    <div class="weui-tabbar">
      <div class="weui-form-preview__ft" style="background:#0bb20c;width:100%;" @click="createRE">
        <button class="weui-form-preview__btn weui-form-preview__btn_primary">
          <span style="color:#fff;">创建配送单</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//import shopcart from '../../../components/shopcart/shopcart';
import BScroll from "better-scroll";
import Cartcontrol from "../../../components/carcontrol/carcontrol";
import axios from "axios";
import qs from "qs";
import weui from "weui.js";
// const ERR_OK = 0;
var config = require("../../../../config");
config = process.env.NODE_ENV === "development" ? config.dev : config.build;
export default {
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      dromNum: "",
      token: "",
      groupNo: "",
      amount: 0
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  mounted() {},
  created() {
    // http://chibei.s1.natapp.cc/sell/wechat/authorize2token?returnUrl=http://it7785.natappfree.cc/page/order/index.html

    this.token = this.getCookie("token"); // 从cookie得到Token
    this.groupNo = this.getCookie("groupNo");
    axios
      .get(
        config.sellerUrl +
          "/sell/seller/replenish/productlist?token=" +
          this.token +
          "&groupNo=" +
          this.groupNo
      )
      .then(response => {
        console.log(response);
        this.dromNum = response.data.msg;
        this.goods = response.data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    addFood(target) {
      this._drop(target);
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      //this.$refs.food.show();
    },
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });
      this.foodsScroll.on("scroll", pos => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _drop(target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    totalP() {
      this.amount = 0;
      for (let i = 0; i < this.goods.length; i++) {
        for (let j = 0; j < this.goods[i].foods.length; j++) {
          if (this.goods[i].foods[j].count > 0) {
            this.amount +=
              this.goods[i].foods[j].price * this.goods[i].foods[j].count;
          }
        }
      }
      return this.amount.toFixed(2);
    },
    //包装商品
    setFoods() {
      this.amount = 0;
      let str = "[";
      for (let i = 0; i < this.goods.length; i++) {
        for (let j = 0; j < this.goods[i].foods.length; j++) {
          if (this.goods[i].foods[j].count > 0) {
            let productId = this.goods[i].foods[j].id;
            let productQuantity = this.goods[i].foods[j].count;
            str +=
              '{productId:"' +
              productId +
              '",productQuantity:' +
              productQuantity +
              "},";
          }
        }
      }
      str = str.substring(0, str.length - 1);
      str += "]";
      console.log(str);
      const obj = {
        token: this.token,
        items: str,
        groupNo: this.groupNo
      };
      console.log(obj);
      return qs.stringify(obj);
    },
    createRE() {
      const send = this.setFoods();
      this.totalP();
      console.log(send);
      axios
        .post(config.sellerUrl + "/sell/seller/dispatch/create", send, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.msg === "成功") {
            weui.toast("创建配送单成功!订单金额为:" + this.amount + "元", {
              duration: 3000
            });
          } else {
            weui.alert("" + res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          weui.alert("创建订单失败!");
        });
    }
  },
  components: {
    Cartcontrol: Cartcontrol
    //'shopcart': shopcart
  }
};
</script>

<style>
.goodMain {
  background: #bababa;
}

.goods {
  display: flex;
  position: absolute;
  top: 45px;
  bottom: 45px;
  width: 100%;
  overflow: hidden;
}

.goods .menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
}

.goods .menu-wrapper .menu-item {
  display: table;
  height: 54px;
  width: 56px;
  line-height: 14px;
  padding: 0 12px;
  background: #e8e8e8;
  border-bottom: 1px solid rgba(139, 137, 137, 0.5);
}

.goods .menu-wrapper .menu-item .current {
  position: relative;
  border-left: 1px solid #00f;
  background: rgb(255, 255, 255);
}

.goods .menu-wrapper .menu-item .current .text {
  font-weight: bold;
}

.goods .menu-wrapper .menu-item .text {
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  font-size: 12px;
}

.foods-wrapper {
  flex: 1;
}

.foods-wrapper .title {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background: #f3f5f7;
}

.foods-wrapper .food-item {
  display: flex;
  margin: 10px;
  padding-bottom: 10px;
}

.foods-wrapper .food-item :last-child {
  margin-bottom: 0;
}

.foods-wrapper .food-item .content {
  flex: 1;
}

.foods-wrapper .food-item .content .name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}

.foods-wrapper .food-item .content .desc,
.extra,.stock,.stockout ,.sales{
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.foods-wrapper .food-item .content .desc {
  margin-bottom: 8px;
}

.foods-wrapper .food-item .content .extra .count {
  margin-right: 12px;
}

.foods-wrapper .food-item .content .price {
  font-weight: 700;
  line-height: 24px;
}

.foods-wrapper .food-item .content .price .now {
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240, 20, 20);
}

.foods-wrapper .food-item .content .price .old {
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.foods-wrapper .food-item .content .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 12px;
}

li {
  list-style-type: none;
}
</style>

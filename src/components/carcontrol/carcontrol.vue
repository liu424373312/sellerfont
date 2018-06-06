<template>
  <div id="carcontrol">
    <div class="cart-decrease" v-show="this.food.count > 0" @click="decreaseCart" transition="move">
      <span class="inner">
        <i style="margin-right:5px; font-size: 10px; color: dodgerblue;" class="icon-minus"></i>
      </span>
    </div>
    <div class="cart-count" v-show="this.food.count>0" ref="fff">{{this.food.count}}</div>
    <div class="cart-add" @click="addCart">
      <i style="margin-left:5px;font-size: 10px; color: dodgerblue;" class="icon-plus"></i>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      salesQuantity: ""
    };
  },
  props: ["food"],
  created() {
    console.log(this.food);
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      /*if (!this.food.sales) {
          Vue.set(this.food, 'sales', 1);
        } else {
          this.food.sales++;
        } */
      this.$emit("add", event.target);

      //console.log(this.$refs.fff.value);
    },
    decreaseCart(event) {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style>
#carcontrol {
  font-size: 0;
}

.cart-decrease {
  display: inline-block;
  padding: 6px;
}

.inner {
  display: inline-block;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0, 160, 220);
}

.cart-count {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  padding-top: 6px;
  line-height: 24px;
  text-align: center;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.cart-add {
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0, 160, 220);
}
</style>

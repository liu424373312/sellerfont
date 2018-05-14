<template>
  <div id="carcontrol">
    <div class="cart-decrease" v-show="this.food.sales > 0" @click="decreaseCart" transition="move">
      <span class="inner">-</span>
    </div>
    <div class="cart-count" v-show="this.food.sales>0" ref="fff">{{this.food.sales}}</div>
    <div class="cart-add" @click="addCart">+</div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    data(){
      return {
        salesQuantity:''
      }
    },
    props: ["food"],
    created() {
      console.log(this.food);
    },
    methods: {
      addCart(event) {
        /*if(this.food.stock === 0){
          return;
        }*/
        if (!this.food.sales) {
          Vue.set(this.food, 'sales', 1);
        } else {/*if(this.food.sales < this.food.stock) {}*/
          this.food.sales++;
        } /*else{
          return;
        }*/
        this.$emit('add', event.target);

        //console.log(this.$refs.fff.value);
      },
      decreaseCart(event) {
        if (this.food.sales) {
          this.food.sales--;
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
    color: rgb(147, 153, 159)
  }

  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220)
  }
</style>

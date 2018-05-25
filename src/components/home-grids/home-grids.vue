<template>
    <div id="home-grids">
        <div class="weui-grids">
            <router-link to="goods" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-goods homeicon"></i>
                </div>
                <p class="weui-grid__label">商品管理</p>
            </router-link>
            <router-link :to="{name:'domitory'}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-domitory homeicon"></i>
                </div>
                <p class="weui-grid__label">寝室管理</p>
            </router-link>
            <router-link :to="{name:'order'}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-order homeicon"></i>
                </div>
                <p class="weui-grid__label">订单管理</p>
            </router-link>
            <router-link :to="{name:'statistica'}" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-statistica homeicon"></i>
                </div>
                <p class="weui-grid__label">销售统计</p>
            </router-link>
            <router-link :to="{name:'templates'}" class="weui-grid">
            <div class="weui-grid__icon">
              <i class="icon-order homeicon"></i>
            </div>
            <p class="weui-grid__label">模板管理</p>
          </router-link>
            <router-link to="personal" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-user homeicon"></i>
                </div>
                <p class="weui-grid__label">个人中心</p>
            </router-link>
            <router-link to="payorder" class="weui-grid">
                <div class="weui-grid__icon">
                    <i class="icon-user homeicon"></i>
                </div>
                <p class="weui-grid__label">支付订单</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.homeicon {
  font-size: 28px;
  color: dodgerblue;
}
</style>

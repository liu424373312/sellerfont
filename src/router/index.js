import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home/home'
import goods from '../pages/goods/goods'
import addgoods from '../pages/addgoods/addgoods'
import domitory from '../pages/domitory/domitory'
import adddomitory from '../pages/adddomitory/adddomitory'
import order from '../pages/order/order'
import orderdetail from '../pages/orderdetail/orderdetail'
import dispatchdetail from '../pages/orderdetail/dispatchdetail'
import replenishdetail from '../pages/orderdetail/replenishdetail'
import domitorydetail from '../pages/domitorydetail/domitorydetail'
import goodsclass from '../pages/goodsclass/goodsclass'
import textinput from '../pages/textinput/textinput'
import applydomitory from '../pages/applydomitory/applydomitory'
import statistica from '../pages/statistica/statistica'
import goodslist from '../pages/goodslist/goodslist'
import goodsdetail from '../pages/goodsdetail/goodsdetail'
import login from '../pages/login/login'
import domitoryorder from '../pages/domitoryorder/domitoryorder'
import domitorydemo from '../pages/domitorydemo/domitorydemo'
import authorize from '../pages/authorize/authorize'
import personal from '../pages/personal/personal'
import payorder from '../pages/payorder/payorder'
import createTemplate from '../pages/createTemplate/createTemplate'
import dorReplenishList from '../pages/dorReplenishList/dorReplenishList'
import orderdetail1 from '../pages/orderdetail1/orderdetail1'
import pic from '../pages/pic/pic'
import util from '../util/util'

Vue.use(Router);

const vueRouter = new Router({
  routes: [
    {
      path: '/orderdetail1',
      name: 'orderdetail1',
      component: orderdetail1
    },
    {
      path: '/pic',
      name: 'pic',
      component: pic
    },
    {
      path: '/dorReplenishList',
      name: 'dorReplenishList',
      component: dorReplenishList
    },
    {
      path: '/createTemplate',
      name: 'createTemplate',
      component: createTemplate
    },
    {
      path: '/authorize',
      name: 'authorize',
      component: authorize
    },
    {
      path: '/home',
      //redirect:'/home'
      name: 'home',
      component: home
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/adddomitory',
      name: 'adddomitory',
      component: adddomitory
    },
    {
      path: '/domitory',
      name: 'domitory',
      component: domitory
    },
    {
      path: '/addgoods',
      name: 'addgoods',
      component: addgoods
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: orderdetail
    },
    {
      path: '/domitorydetail',
      name: 'domitorydetail',
      component: domitorydetail
    },
    {
      path: '/goodsclass',
      name: 'goodsclass',
      component: goodsclass
    },
    {
      path: '/textinput',
      name: 'textinput',
      component: textinput
    },
    {
      path: '/applydomitory',
      name: 'applydomitory',
      component: applydomitory
    },
    {
      path: '/statistica',
      name: 'statistica',
      component: statistica
    },
    {
      path: '/goodslist',
      name: 'goodslist',
      component: goodslist
    },
    {
      path: '/goodsdetail',
      name: 'goodsdetail',
      component: goodsdetail
    },
    {
      path: '/domitoryorder',
      name: 'domitoryorder',
      component: domitoryorder
    },
    {
      path: '/domitorydemo',
      name: 'domitorydemo',
      component: domitorydemo
    },
    {
      path: '/replenishdetail',
      name: 'replenishdetail',
      component: replenishdetail
    },
    {
      path: '/dispatchdetail',
      name: 'dispatchdetail',
      component: dispatchdetail
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/payorder',
      name: 'payorder',
      component: payorder
    }
  ]
})
vueRouter.beforeEach((to, from, next) => {
  function getCookie(name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }
  console.log('openid:' + getCookie('openid'));
  console.log('token:' + getCookie('token'));
  if (getCookie('openid') == 'null') {
  }
  next();
});
export default vueRouter
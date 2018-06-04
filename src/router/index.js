import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/liu/home/home'
import goods from '../pages/liu/goods/goods'
import addgoods from '../pages/liu/addgoods/addgoods'
import order from '../pages/liu/order/order'
import orderdetail from '../pages/liu/orderdetail/orderdetail'
import dispatchdetail from '../pages/liu/orderdetail/dispatchdetail'
import replenishdetail from '../pages/liu/orderdetail/replenishdetail'
import goodsclass from '../pages/liu/goodsclass/goodsclass'
import goodslist from '../pages/liu/goodslist/goodslist'
import goodsdetail from '../pages/liu/goodsdetail/goodsdetail'
import login from '../pages/liu/login/login'
import authorize from '../pages/liu/authorize/authorize'
import personal from '../pages/liu/personal/personal'
import payorder from '../pages/liu/payorder/payorder'

import orderdetail1 from '../pages/orderdetail1/orderdetail1'

import domitory from '../pages/chen/domitory/domitory'
import adddomitory from '../pages/chen/adddomitory/adddomitory'
import domitorydetail from '../pages/chen/domitorydetail/domitorydetail'
import applydomitory from '../pages/chen/applydomitory/applydomitory'
import statistica from '../pages/chen/statistica/statistica'
import domitoryorder from '../pages/chen/domitoryorder/domitoryorder'
import domitorydemo from '../pages/chen/domitorydemo/domitorydemo'
import createTemplate from '../pages/chen/createTemplate/createTemplate'
import dorReplenishList from '../pages/chen/dorReplenishList/dorReplenishList'
import dorstatistic from '../pages/chen/dorstatistic/dorstatistic'
import templates from '../pages/chen/templates/templates'
import dorGoodsList from '../pages/chen/dorGoodsList/dorGoodsList'
import textinput from '../pages/chen/textinput/textinput'
import dorgroup from '../pages/chen/dorgroup/dorgroup'
import templatesDetail from '../pages/chen/templatesDetail/templatesDetail'
import orderdetail2 from '../pages/chen/orderdetail2/orderdetail2'
import pic from '../pages/pic/pic'
import register from '../pages/liu/register/register'
Vue.use(Router);

const vueRouter = new Router({
  routes: [
    {
      path:'/orderdetail2',
      name:'orderdetail2',
      component:orderdetail2
    },
    {
      path:'/dorgroup',
      name:'dorgroup',
      component:dorgroup
    },
    {
      path:'/dorGoodsList',
      name:'dorGoodsList',
      component:dorGoodsList
    },
    {
      path:'/textinput',
      name:'textinput',
      component:textinput
    },
    {
      path:'/templatesDetail',
      name:'templatesDetail',
      component:templatesDetail
    },
    {
      path:'/templates',
      name:'templates',
      component:templates
    },
    {
      path:'/dorstatistic',
      name:'dorstatistic',
      component:dorstatistic
    },
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
    },
    {
      path: '/register',
      name: 'register',
      component: register
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
  // if (to.name != 'authorize') {
  //   if (getCookie('openid') == 'null') {
  //     next({
  //       name: 'authorize'
  //     })
  //   }
  //   if (to.name != 'login') {
  //     if (getCookie('token') == 'null') {
  //       next({
  //         name: 'login'
  //       })
  //     }
  //   }
  // }
  next();
});
export default vueRouter

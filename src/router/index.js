import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home/home'
import goods from '../pages/goods/goods'
import addgoods from '../pages/addgoods/addgoods'
import domitory from '../pages/domitory/domitory'
import adddomitory from '../pages/adddomitory/adddomitory'
import order from '../pages/order/order'
import orderdetail from '../pages/orderdetail/orderdetail'
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
import {getCookie} from '../util/util'
Vue.use(Router);

const vueRouter =new Router({
  routes: [
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
    }
  ]
})
// vueRouter.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth) {
//    fetch('m/is/login').then(res => {
//     if(res.errCode == 200) {
//      next();
//     } else {
//      if(getCookie('session')) {
//       delCookie('session');
//      }
//      if(getCookie('u_uuid')) {
//       delCookie('u_uuid');
//      }
//      next({
//       path: '/'
//      });
//     }
//    });
//   } else {
//    next();
//   }
//  });
export default vueRouter
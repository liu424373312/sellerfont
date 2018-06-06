// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'weui'
import './common/dist/style/weui.css'
import './common/style/style.css'
import './common/style/style1.css'
import util from './util/util'

Vue.config.productionTip = false
Vue.use(util)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

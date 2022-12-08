import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "uview-ui";
import Mock from './mock'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView);
const app = new Vue({
  ...App,
  store,
})
app.$mount()

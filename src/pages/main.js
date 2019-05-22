import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store/index'
import { Button, Select } from 'element-ui';
Vue.use(Button)
Vue.use(Select)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

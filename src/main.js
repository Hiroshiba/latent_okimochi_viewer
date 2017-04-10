import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.min.css'

import configFile from './assets/config.json'
import Config from './config'

const config = new Config(configFile)
store.commit('setConfig', {config})

Vue.use(KeenUI)

new Vue({
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount('#app')

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import configFile from './assets/config.json'
import Config from './config'

const config = new Config(configFile)
store.commit('setConfig', {config})

new Vue({
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount('#app')

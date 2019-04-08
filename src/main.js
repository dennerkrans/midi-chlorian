import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'

Vue.prototype.$socket = io('http://localhost:8081')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

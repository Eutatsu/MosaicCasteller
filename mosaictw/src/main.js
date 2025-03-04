import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTippy from 'vue-tippy'
import './assets/tailwind.css'

Vue.config.productionTip = false
Vue.use(VueTippy);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

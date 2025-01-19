import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import {BootstrapVue,BootstrapVueIcons} from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'; 
import { faTwitter } from '@fortawesome/free-brands-svg-icons'; 


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


library.add(faGlobe);
library.add(faWikipediaW);
library.add(faTwitter)

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

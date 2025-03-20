import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'; 

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faGlobe, faWikipediaW, faTwitter,faEye,faBars)
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)


app.use(router)
app.use(
    VueTippy,
    // optional
    {
      directive: 'tippy', // => v-tippy
      component: 'tippy', // => <tippy/>
      componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
      defaultProps: {
        placement: 'bottom',
        allowHTML: true,
        trigger: "click mouseenter focusin",
        interactive: true,
        arrow:false,
        offset:[0,0],
        zindex:9999
      }, // => Global default options * see all props
    }
  )

app.mount('#app')

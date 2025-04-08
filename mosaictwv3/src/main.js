import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'; 

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import colles from '@/json/dades_colles_id.json'
import escutsSprite from '@/assets/escuts/escuts_sprite.png'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCheck }  from '@fortawesome/free-solid-svg-icons'
import { faChevronDown }  from '@fortawesome/free-solid-svg-icons'

library.add(faAddressCard, faChevronDown, faCheck, faFire, faSeedling, faGlobe, faWikipediaW, faTwitter,faEye,faBars,faEarthAmericas,faGraduationCap,faWind,faHouse)
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.provide('dades', colles)
app.provide('escutsSprite', escutsSprite)

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

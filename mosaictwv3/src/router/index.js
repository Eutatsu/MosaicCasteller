import { createRouter, createWebHashHistory } from 'vue-router'
import PerfilColla from '../views/PlantillaColla.vue'

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },{
    path: '/taula',
    name: 'taula',
    component: () => import('../views/Taula.vue')
  },
  {
    path: '/',
    name: 'mosaic',
    component: () => import('../views/Mosaic.vue')
  },
  {
    path: '/liniatemporal',
    name: 'liniatemporal',
    component: () => import('../views/LiniaTemporal.vue')
  },
  {
    path:"/colla",
    name:"plantilla",
    component: () => import('../views/PlantillaColla.vue')
  },
  {
    path:"/colla/:id",
    name:"perfil-colla",
    component: PerfilColla,
    props:true
  }    
]

const router = createRouter({
  history: createWebHashHistory('/MosaicCasteller/'), // Equivalent to mode: "history"
  routes
});

export default router;
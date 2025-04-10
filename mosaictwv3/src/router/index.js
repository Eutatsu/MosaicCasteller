import { createRouter, createWebHistory } from 'vue-router'
import PerfilColla from '../views/PlantillaColla.vue'

const routes = [
  {
    path: '/',
    name: 'mosaic',
    component: () => import('../views/Mosaic.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },{
    path: '/tauladebug',
    name: 'tauladebug',
    component: () => import('../views/TaulaDebug.vue')
  },
  {
    path: '/colles',
    name: 'collas',
    component: () => import('../views/Colles.vue')
  },
  {
    path: '/liniatemporal',
    name: 'liniatemporal',
    component: () => import('../views/LiniaTemporal.vue')
  },
  {
    path:"/mapa",
    name:"mapa",
    component: () => import('../views/Mapa.vue')
  },
  {
    path:"/colles/:id",
    name:"perfil-colla",
    component: PerfilColla,
    props:true
  }    
]

const router = createRouter({
  history: createWebHistory(), // Equivalent to mode: "history"
  routes,
  
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
});

export default router;
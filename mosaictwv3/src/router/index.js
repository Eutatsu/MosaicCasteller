import { createRouter, createWebHistory } from 'vue-router'
import PerfilColla from '../views/PlantillaColla.vue'

const routes = [
  {
    path: '/',
    name: 'mosaic',
    component: () => import('../views/Mosaic.vue'),
    meta:{title:'Mosaic Casteller'}
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta:{title:'Sobre el Mosaic - Mosaic Casteller'}
  },{
    path: '/tauladebug',
    name: 'tauladebug',
    component: () => import('../views/TaulaDebug.vue'),
    meta:{title:'TaulaDebug - Mosaic Casteller'}
  },
  {
    path: '/colles',
    name: 'colles',
    component: () => import('../views/Colles.vue'),
    meta:{title:'Colles - Mosaic Casteller'}
  },
  {
    path: '/liniatemporal',
    name: 'liniatemporal',
    component: () => import('../views/LiniaTemporal.vue'),
    meta:{title:'Linia Temporal - Mosaic Casteller'}
  },
  {
    path:"/mapa",
    name:"mapa",
    component: () => import('../views/Mapa.vue'),
    meta:{title:'Mapa - Mosaic Casteller'}
  },
  {
    path:"/colles/:id",
    name:"perfil-colla",
    component: PerfilColla,
    props:true
  }  ,
  {
    path:"/jocs/trobacolla",
    name:"trobacolla",
    component: () => import('../views/TrobaColla.vue'),
    meta:{title:'TrobaColla - Mosaic Casteller'}
  },
  {
    path:'/:pathMatch(.*)*',
    name:"404",
    component: () => import('../views/404.vue'),
    meta:{title:'404 - Mosaic Casteller'}
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

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title; // Set the document title based on the route meta field
  }
  next(); // Continue with the navigation
});

export default router;
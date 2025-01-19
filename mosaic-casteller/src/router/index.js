import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'mosaic',
    component: () => import('../views/Mosaic.vue')

  }
]


const router = new VueRouter({
  mode: "history",
  base: '/MosaicCasteller/', 
  routes
  })
  
export default router

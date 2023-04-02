import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { userStore } from '@/stores/user'
import _ from 'lodash'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/private/jamon',
      name: 'jamon',
      component: () => import('@/views/private/PrivateView.vue')
    },
    {
      path: '/private/dashboard',
      name: 'dashboard',
      component: () => import('@/views/private/DashboardView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/public/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
 

  var store  = userStore();
  var authenticated = store.token;

  if(to.fullPath.includes('private') && !authenticated){
    return next({name:'login'})
  }

  if (to.name == 'login' && authenticated){
    return next({name:'dashboard'})
  }
  


  
  return next()
})

export default router

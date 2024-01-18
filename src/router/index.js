import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScanView from '@/views/ScanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/scan',
      component: ScanView,
      beforeEnter: () => {
        // reject the navigation
        return true
      }
    }
  ]
})

export default router

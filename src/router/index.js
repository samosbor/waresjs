import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScanView from '@/views/ScanView.vue'
import store from '@/store'
import { computed } from 'vue'

const state = computed(() => store.state)

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
            name: 'scan',
            component: ScanView
        }
    ]
})

router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        !state.value.isAuthenticated &&
        to.name !== 'home'
    ) {
        return { name: 'home' }
    }
})

export default router

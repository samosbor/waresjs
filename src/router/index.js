import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScanView from '@/views/ScanView.vue'
import store from '@/store'
import { computed } from 'vue'
import AdminView from '@/views/AdminView.vue'
import AssetView from '@/views/AssetView.vue'

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
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView
        },
        {
            path: '/admin/asset/:id',
            name: 'asset',
            component: AssetView
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

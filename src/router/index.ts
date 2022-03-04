import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import GettingStartedView from '../views/GettingStartedView.vue'
import DashboardView from '../views/DashboardView.vue'
import SignUpView from '../views/auth/SignUpView.vue'
import { isAuthenticated } from '@/code/authentication-status-manager'

declare module 'vue-router' {
  interface RouteMeta {
    middleware?: Set<string>
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'dashboard' }
  },
  {
    path: '/getting-started',
    name: 'getting-started',
    component: GettingStartedView,
    meta: {
      middleware: new Set(['guest'])
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpView,
    meta: {
      middleware: new Set(['guest'])
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (!isAuthenticated() && !to.meta?.middleware?.has('guest') && to.name !== 'getting-started') {
    return { name: 'getting-started' }
  }
})

router.beforeEach((to) => {
  document.title = to.meta.title
    ? `${process.env.VUE_APP_TITLE} - ${to.meta.title || ''}`
    : process.env.VUE_APP_TITLE
})

export default router

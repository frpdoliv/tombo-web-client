import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import GettingStartedView from '../views/GettingStartedView.vue'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
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
    component: GettingStartedView,
    children: [{
      path: '/login',
      name: 'login',
      components: { GettingStartedForm: LoginView }
    }, {
      path: '/sign-up',
      name: 'sign-up',
      components: { GettingStartedForm: SignUpView }
    }],
    meta: {
      middleware: new Set(['guest'])
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (!isAuthenticated() && !to.meta?.middleware?.has('guest') && to.name !== 'getting-started') {
    return { name: 'login' }
  }
})

router.beforeEach((to) => {
  document.title = to.meta.title
    ? `${process.env.VUE_APP_TITLE} - ${to.meta.title || ''}`
    : process.env.VUE_APP_TITLE
})

export default router

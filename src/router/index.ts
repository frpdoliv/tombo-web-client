import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GettingStartedView from '../views/GettingStartedView.vue'
import DashboardView from '../views/DashboardView.vue'
import SignUpView from '../views/auth/SignUpView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/getting-started',
    name: 'getting-started',
    component: GettingStartedView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = to.meta.title
    ? `${process.env.VUE_APP_TITLE} - ${to.meta.title || ''}`
    : process.env.VUE_APP_TITLE
})

export default router

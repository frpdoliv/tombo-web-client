import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _) => {
  document.title = to.meta.title
    ? `${process.env.VUE_APP_TITLE} - ${to.meta.title || ''}`
    : process.env.VUE_APP_TITLE
})

export default router

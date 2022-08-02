import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { LAYOUT } from '@/constants/layout'

import TaViewHome from '@/views/TaViewHome.vue'
// import Test from "@/components/Test.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: TaViewHome,
    meta: {
      layout: LAYOUT.DEFAULT,
    },
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

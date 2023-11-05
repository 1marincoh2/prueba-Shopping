import { createRouter, createWebHistory } from 'vue-router'

import AppLayoutVue from '@/components/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayoutVue,
      children: [
          {
              path: '/',
              name: 'Home',
              component: () => import('@/views/ProductsView.vue')
          },
          {
              path: '/ShoppingCart',
              name: 'ShoppingCart',
              component: () => import('@/components/ShoppingCart.vue')
          },
        ]}
  ]
})

export default router

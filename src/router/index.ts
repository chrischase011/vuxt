import { createRouter, createWebHistory } from 'vue-router'
import { loadLayout } from '@/middleware/layout'

const pages = import.meta.glob('../pages/**/*.vue')

import type { RouteRecordRaw } from 'vue-router'
import { useErrorsStore } from '@/stores/errors'

const routes: Array<RouteRecordRaw> = Object.keys(pages).map((filePath) => {
  const path = filePath
    .replace('../pages', '')
    .replace(/\.vue$/, '')
    .replace(/\/index$/, '/')
    .replace(/\[([^/]+)\]/g, ':$1')

  return {
    path: path === '' ? '/' : path,
    component: pages[filePath],
    meta: { layout: 'DefaultLayout' },
  }
})
routes.push({
  path: '/404',
  component: () => import('../404.vue'),
  meta: { layout: 'ErrorLayout' },
})

// Fallback 404 route
routes.push({
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  component: () => import('../404.vue'),
  meta: { layout: 'ErrorLayout', is404: true },
  beforeEnter: (to, from, next) => {
    console.error('404 not found: ', to.fullPath)
    const error = useErrorsStore()
    error.setError({
      message: `404: Page not found: ${to.fullPath}`,
      stack: `Router navigation error at path: ${to.fullPath}`,
      info: JSON.stringify({
        from: from.fullPath,
        to: to.fullPath,
        meta: to.meta,
        timestamp: new Date().toISOString(),
      }),
    })
    next() // Proceed to the 404 component
  },
  children: [],
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(loadLayout)

export default router

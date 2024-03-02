/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router/auto'

// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: setupLayouts,
})

export default router

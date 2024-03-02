/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  // @ts-ignore
  // eslint-disable-next-line node/prefer-global/process
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: setupLayouts,
})

export default router

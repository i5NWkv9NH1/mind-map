// Utilities
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

export * from './app'

export default createPinia().use(piniaPersist)

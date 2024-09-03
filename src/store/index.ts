// Utilities
import { createPinia } from 'pinia'
// import piniaPersist from 'pinia-plugin-persist'
import stringify from 'json-stringify-safe'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'


export default createPinia().use(createPersistedStatePlugin({
  serialize: value => stringify(value)
}))

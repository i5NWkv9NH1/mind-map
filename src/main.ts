/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { createApp } from 'vue'
import App from './App'
import { registerPlugins } from '@/plugins'

// Components

// Composables

const app = createApp(App)

registerPlugins(app)

app.mount('#root')

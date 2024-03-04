import '@/styles/main.scss'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { VApp } from 'vuetify/lib/components/index.mjs'
import { GlobalLoading, GlobalMessage } from './widgets'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <VApp>
        <GlobalMessage />
        <GlobalLoading />
        <RouterView />
      </VApp>
    )
  },
})

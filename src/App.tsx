import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { VApp } from "vuetify/lib/components/index.mjs";
import '@/styles/main.scss'

export default defineComponent({
  name: 'App',
  setup() {
    return () => <VApp>
      <RouterView />
    </VApp>
  }
})

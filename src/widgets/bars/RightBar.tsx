import { defineComponent } from "vue";
import './RightBar.scss'
import { VNavigationDrawer } from "vuetify/lib/components/index.mjs";

export const RightBar = defineComponent({
  name: 'RightBar',
  setup() {
    return () => (
      <VNavigationDrawer

      >

      </VNavigationDrawer>
    )
  }
})

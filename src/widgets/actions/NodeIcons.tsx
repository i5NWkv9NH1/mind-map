// TODO: add store

import { mdiEmoticonLolOutline } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'

export const NodeIcons = defineComponent({
  name: 'NodeIcons',
  setup() {
    return () => (
      <VBtn
        stacked
        disabled
      // @ts-ignore
        onClick={() => { }}
      >
        <VIcon>{mdiEmoticonLolOutline}</VIcon>
        <span>图标</span>
      </VBtn>
    )
  },
})

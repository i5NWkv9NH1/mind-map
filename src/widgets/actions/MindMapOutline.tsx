// TODO: add store

import { mdiCardTextOutline } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'

export const MindMapOutline = defineComponent({
  name: 'MindMapOutline',
  setup() {
    return () => (
      <VBtn
        stacked
        disabled
      // @ts-ignore
        onClick={() => { }}
      >
        <VIcon>{mdiCardTextOutline}</VIcon>
        <span>大纲</span>
      </VBtn>
    )
  },
})

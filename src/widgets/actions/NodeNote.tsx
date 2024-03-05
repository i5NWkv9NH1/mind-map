// TODO: add store

import { mdiNotePlusOutline } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'

export const NodeNote = defineComponent({
  name: 'NodeNote',
  setup() {
    return () => (
      <VBtn
        stacked
        disabled
      // @ts-ignore
        onClick={() => { }}
      >
        <VIcon>{mdiNotePlusOutline}</VIcon>
        <span>备注</span>
      </VBtn>
    )
  },
})

// TODO: add store

import { mdiTagPlusOutline } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'

export const NodeTags = defineComponent({
  name: 'NodeTags',
  setup() {
    return () => (
      <VBtn
        stacked
        disabled
      // @ts-ignore
        onClick={() => { }}
      >
        <VIcon>{mdiTagPlusOutline}</VIcon>
        <span>标签</span>
      </VBtn>
    )
  },
})

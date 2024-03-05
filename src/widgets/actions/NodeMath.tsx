// TODO: add store

import { mdiSigma } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'

export const NodeMath = defineComponent({
  name: 'NodeMath',
  setup() {
    return () => (
      <VBtn
        stacked
        disabled
      // @ts-ignore
        onClick={() => { }}
      >
        <VIcon>{mdiSigma}</VIcon>
        <span>公式</span>
      </VBtn>
    )
  },
})

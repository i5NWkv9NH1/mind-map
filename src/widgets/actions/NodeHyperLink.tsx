// TODO: add store

import { mdiLinkVariantPlus } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'

export const NodeHyperLink = defineComponent({
  name: 'NodeHyperLink',
  setup() {
    return () => (
      <VBtn
        stacked
        disabled
      // @ts-ignore
        onClick={() => { }}
      >
        <VIcon>{mdiLinkVariantPlus}</VIcon>
        <span>超链接</span>
      </VBtn>
    )
  },
})

// TODO: add store

import { mdiFileImportOutline } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'

export const ImportFile = defineComponent({
  name: 'ImportFile',
  setup() {
    return () => (
      <VBtn
        stacked
        disabled
      // @ts-ignore
        onClick={() => { }}
      >
        <VIcon>{mdiFileImportOutline}</VIcon>
        <span>导入</span>
      </VBtn>
    )
  },
})

// TODO: add store

import { mdiCardTextOutline } from '@mdi/js'
import { defineComponent, ref } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'
import { storeToRefs } from 'pinia'
import { VCard, VCardText, VDialog } from 'vuetify/lib/components/index.mjs'
import { useAppStore } from '@/store/app'
import { TreeView } from '@/components'

export const MindMapOutline = defineComponent({
  name: 'MindMapOutline',
  setup() {
    const { mindMapRoot } = storeToRefs(useAppStore())
    const dialog = ref(false)

    return () => (
      <>
        <VDialog
          v-model={dialog.value}
          fullscreen
        >
          <VCard>
            <VCardText>
              <TreeView
                // @ts-ignore
                tree={mindMapRoot.value}
              />
            </VCardText>
          </VCard>
        </VDialog>
        <VBtn
          stacked
          // @ts-ignore
          onClick={() => {
            dialog.value = true
          }}
        >
          <VIcon>{mdiCardTextOutline}</VIcon>
          <span>大纲</span>
        </VBtn>
      </>
    )
  },
})

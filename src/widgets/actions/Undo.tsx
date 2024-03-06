import { mdiUndo } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'
import { useAppStore } from '@/store/app'
import { useMindMap } from '@/composables'

export const Undo = defineComponent({
  name: 'Undo',
  setup() {
    const { canUnod, mindMapConfig } = storeToRefs(useAppStore())
    const { mindMap } = useMindMap()

    return () => (
      <VBtn
        stacked
        disabled={canUnod.value || mindMapConfig.value.readonly}
        // @ts-ignore
        onClick={() => {
          mindMap.value?.execCommand('BACK')
        }}
      >
        <VIcon>{mdiUndo}</VIcon>
        <span>撤销</span>
      </VBtn>
    )
  },
})

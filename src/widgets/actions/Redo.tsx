import { mdiRedo } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'
import { useAppStore } from '@/store/app'
import { useMindMap } from '@/composables'

export const Redo = defineComponent({
  name: 'Redo',
  setup() {
    const { canRedo, isMindMapReadonly } = storeToRefs(useAppStore())
    const { mindMap } = useMindMap()
    return () => (
      <VBtn
        stacked
        disabled={canRedo.value || isMindMapReadonly.value}
      // @ts-ignore
        onClick={() => {
          mindMap.value?.execCommand('FORWARD')
        }}
      >
        <VIcon>{mdiRedo}</VIcon>
        <span>重做</span>
      </VBtn>
    )
  },
})

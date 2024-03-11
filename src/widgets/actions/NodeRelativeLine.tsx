import { mdiVectorRadius } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'
import { useAppStore } from '@/store/app'
import { useMindMap } from '@/composables'

export const NodeRelativeLine = defineComponent({
  name: 'NodeRelativeLine',
  setup() {
    const { isActiveNode, hasGeneralization } = storeToRefs(useAppStore())
    const { mindMap } = useMindMap()

    return () => (
      <VBtn
        stacked
        disabled={!isActiveNode.value || hasGeneralization.value}
      // @ts-ignore
        onClick={() => {
        // @ts-ignore
          mindMap.value?.associativeLine.createLineFromActiveNode()
        }}
      >
        <VIcon>{mdiVectorRadius}</VIcon>
        <span>关联线</span>
      </VBtn>
    )
  },
})

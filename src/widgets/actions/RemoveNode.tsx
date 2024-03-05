import { mdiVectorPolylineRemove } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'
import { useAppStore } from '@/store/app'
import { useMindMap } from '@/composables'

export const RemoveNode = defineComponent({
  name: 'RemoveNode',
  setup() {
    const { isActiveNode } = storeToRefs(useAppStore())
    const { mindMap } = useMindMap()

    return () => (
      <VBtn
        stacked
        disabled={!isActiveNode.value}
      // @ts-ignore
        onClick={() => {
          mindMap.value?.execCommand('REMOVE_NODE')
        }}
      >
        <VIcon>{mdiVectorPolylineRemove}</VIcon>
        <span>删除节点</span>
      </VBtn>
    )
  },
})

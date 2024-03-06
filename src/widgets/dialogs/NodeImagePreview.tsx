import { defineComponent, onMounted, ref } from 'vue'
import { VContainer, VDialog, VImg } from 'vuetify/components'

import { useMindMap } from '@/composables'
import type { MindMapNode } from '@/@types'

export const NodeImagePreview = defineComponent({
  name: 'NodeImagePreview',
  setup() {
    const { mindMap } = useMindMap()
    const dialog = ref(false)
    const image = ref<string>('')

    const openImagePreview = (node: MindMapNode, e: PointerEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const nodeImage = node.nodeData.data.image
      if (nodeImage) {
        image.value = nodeImage
        dialog.value = true
      }
    }

    onMounted(() => {
      mindMap.value?.on('node_img_dblclick', openImagePreview)
    })

    return () => (
      <VDialog v-model={dialog.value} transition="slide-y-transition">
        <VContainer>
          <VImg
            src={image.value}
            // @ts-ignore
            onClick={() => (dialog.value = false)}
          />
        </VContainer>
      </VDialog>
    )
  },
})

import { mdiBrushVariant } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, ref } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'
import { useAppStore } from '@/store/app'
import { useMindMap } from '@/composables'
import { withEventModifiers } from '@/directives'

export const FormatBrush = defineComponent({
  name: 'FormatBrush',
  setup() {
    const { isActiveNode, hasGeneralization } = storeToRefs(useAppStore())
    const { mindMap } = useMindMap()

    const isPainting = ref(false)

    onMounted(() => {
      mindMap.value?.on('painter_start', () => {
        isPainting.value = true
      })
      mindMap.value?.on('painter_end', () => {
        isPainting.value = false
      })
    })

    return () => (
      <VBtn
        stacked
        disabled={!isActiveNode.value || hasGeneralization.value}
        active={isPainting.value}
        color={isPainting.value ? 'primary' : 'default'}
        {...withEventModifiers({
          onclick: () => {
            mindMap.value?.painter.startPainter()
          },
        }, ['prevent'])}
      >
        <VIcon>{mdiBrushVariant}</VIcon>
        <span>格式刷</span>
      </VBtn>
    )
  },
})

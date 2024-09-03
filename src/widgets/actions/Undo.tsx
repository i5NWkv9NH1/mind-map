import { useMindMap } from '@/composables'
import { withEventModifiers } from '@/directives'
import { useAppStore } from '@/store/app'
import { mdiUndo } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'

export const Undo = defineComponent({
  name: 'Undo',
  setup() {
    const { canUnod, mindMapConfig } = storeToRefs(useAppStore())
    const { mindMap } = useMindMap()

    return () => (
      <VBtn
        stacked
        disabled={canUnod.value || mindMapConfig.value.readonly}
        {...withEventModifiers({
          onclick: () => mindMap.value?.execCommand('BACK')
        }, ['click'])}
      >
        <VIcon>{mdiUndo}</VIcon>
        <span>撤销</span>
      </VBtn>
    )
  },
})

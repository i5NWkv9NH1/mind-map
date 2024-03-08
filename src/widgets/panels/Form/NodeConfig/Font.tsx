import { defineComponent } from 'vue'
import { VCol, VLabel, VRow } from 'vuetify/lib/components/index.mjs'

export const Font = defineComponent({
  name: 'Font',
  setup() {
    return () => (
      <VRow>
        <VCol>
          <VLabel class="text-subtitle-2 mb-1">
            字体
          </VLabel>
        </VCol>
      </VRow>
    )
  },
})

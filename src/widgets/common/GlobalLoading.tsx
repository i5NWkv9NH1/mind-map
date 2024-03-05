import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { VDialog, VProgressCircular } from 'vuetify/lib/components/index.mjs'
import { useSettingsStore } from '@/store/settings'

export const GlobalLoading = defineComponent({
  name: 'GlobalLoading',
  setup() {
    const { loading } = storeToRefs(useSettingsStore())

    return () => (
      <VDialog
        modelValue={loading.value.status}
        maxWidth={400}
        persistent
        contentClass="d-flex align-center justify-center"
        transition="fab-transition"
      >
        <VProgressCircular
          color={loading.value.color}
          width={loading.value.width}
          size={loading.value.size}
          indeterminate
        />
      </VDialog>
    )
  },
})

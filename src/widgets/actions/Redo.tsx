import { defineComponent } from "vue";
import { mdiRedo } from "@mdi/js";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app";
import { VBtn, VIcon } from 'vuetify/components';

export const Redo = defineComponent({
  name: 'Redo',
  setup() {
    const { canRedo, isMindMapReadonly, mindMap } = storeToRefs(useAppStore())
    return () => <VBtn
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
  }
})

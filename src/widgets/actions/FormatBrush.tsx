import { useAppStore } from "@/store/app";
import { mdiBrushVariant } from "@mdi/js";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const FormatBrush = defineComponent({
  name: 'FormatBrush',
  setup() {
    const { isActiveNode, hasGeneralization, mindMap } = storeToRefs(useAppStore())

    return () => <VBtn
      stacked
      disabled={!isActiveNode.value || hasGeneralization.value}
      // @ts-ignore
      onClick={() => {
        // @ts-ignore
        mindMap.value.painter.startPainter()
      }}
    >
      <VIcon>{mdiBrushVariant}</VIcon>
      <span>格式刷</span>
    </VBtn>
  }
})

import { useAppStore } from "@/store/app";
import { mdiVectorRadius } from "@mdi/js";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const NodeRelativeLine = defineComponent({
  name: 'NodeRelativeLine',
  setup() {
    const { isActiveNode, hasGeneralization, mindMap } = storeToRefs(useAppStore())

    return () => <VBtn
      stacked
      disabled={!isActiveNode.value || hasGeneralization.value}
      // @ts-ignore
      onClick={() => {
        mindMap.value?.associativeLine.createLineFromActiveNode()
      }}
    >
      <VIcon>{mdiVectorRadius}</VIcon>
      <span>关联线</span>
    </VBtn>
  }
})

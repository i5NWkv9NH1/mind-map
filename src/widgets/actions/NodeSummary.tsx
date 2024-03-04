import { useAppStore } from "@/store/app";
import { mdiRelativeScale } from "@mdi/js";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const NodeSummary = defineComponent({
  name: 'NodeSummary',
  setup() {
    const { isActiveNode, hasRoot, hasGeneralization, mindMap } = storeToRefs(useAppStore())

    return () => <VBtn
      stacked
      disabled={!isActiveNode.value || hasRoot.value || hasGeneralization.value}
      // @ts-ignore
      onClick={() => {
        // TODO: data 可以自定义: 概要节点 { text: '' }
        mindMap.value?.execCommand('ADD_GENERALIZATION')
      }}
    >
      <VIcon>{mdiRelativeScale}</VIcon>
      <span>概要</span>
    </VBtn>
  }
})

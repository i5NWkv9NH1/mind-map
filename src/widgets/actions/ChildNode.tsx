import { useAppStore } from "@/store/app";
import { mdiVectorPolyline } from "@mdi/js";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const ChildNode = defineComponent({
  name: 'ChildNode',
  setup() {
    const { isActiveNode, hasRoot, hasGeneralization, mindMap } = storeToRefs(useAppStore())

    return () => <VBtn
      stacked
      disabled={!isActiveNode.value || hasGeneralization.value}
      // @ts-ignore
      onClick={() => {
        mindMap.value?.execCommand('INSERT_CHILD_NODE')
      }}
    >
      <VIcon>{mdiVectorPolyline}</VIcon>
      <span>子节点</span>
    </VBtn>
  }
})

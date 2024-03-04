import { useAppStore } from "@/store/app";
import { mdiTune } from "@mdi/js";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const PeerNode = defineComponent({
  name: 'PeerNode',
  setup() {
    const { isActiveNode, hasRoot, hasGeneralization, mindMap } = storeToRefs(useAppStore())

    return () => <VBtn
      stacked
      disabled={!isActiveNode.value || hasRoot.value || hasGeneralization.value}
      // @ts-ignore
      onClick={() => {
        mindMap.value?.execCommand('INSERT_NODE')
      }}
    >
      <VIcon>{mdiTune}</VIcon>
      <span>同级节点</span>
    </VBtn>
  }
})

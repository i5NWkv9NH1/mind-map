// TODO: add store

import { mdiFileUploadOutline } from "@mdi/js";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const OpenMindMapFile = defineComponent({
  name: 'OpenMindMapFile',
  setup() {
    return () => <VBtn
      stacked
      disabled
      // @ts-ignore
      onClick={() => { }}
    >
      <VIcon>{mdiFileUploadOutline}</VIcon>
      <span>打开</span>
    </VBtn>
  }
})

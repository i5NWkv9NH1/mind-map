// TODO: add store

import { mdiFilePlusOutline } from "@mdi/js";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const CreateNewMindMapFile = defineComponent({
  name: 'CreateNewMindMapFile',
  setup() {
    return () => <VBtn
      stacked
      disabled
      // @ts-ignore
      onClick={() => { }}
    >
      <VIcon>{mdiFilePlusOutline}</VIcon>
      <span>新建</span>
    </VBtn>
  }
})

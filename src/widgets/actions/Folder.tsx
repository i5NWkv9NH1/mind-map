// TODO: add store

import { mdiFolderOutline } from "@mdi/js";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const Folder = defineComponent({
  name: 'Folder',
  setup() {
    return () => <VBtn
      stacked
      disabled
      // @ts-ignore
      onClick={() => { }}
    >
      <VIcon>{mdiFolderOutline}</VIcon>
      <span>目录</span>
    </VBtn>
  }
})

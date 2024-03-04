// TODO: add store

import { mdiImagePlusOutline } from "@mdi/js";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const NodeImage = defineComponent({
  name: 'NodeImage',
  setup() {
    return () => <VBtn
      stacked
      disabled
      // @ts-ignore
      onClick={() => { }}
    >
      <VIcon>{mdiImagePlusOutline}</VIcon>
      <span>图片</span>
    </VBtn>
  }
})

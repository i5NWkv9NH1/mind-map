// TODO: add store

import { mdiContentSaveOutline } from "@mdi/js";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const ContentSaveAs = defineComponent({
  name: 'ContentSaveAs',
  setup() {
    return () => <VBtn
      stacked
      disabled
      // @ts-ignore
      onClick={() => { }}
    >
      <VIcon>{mdiContentSaveOutline}</VIcon>
      <span>另存为</span>
    </VBtn>
  }
})

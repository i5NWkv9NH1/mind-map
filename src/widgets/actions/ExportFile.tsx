// TODO: add store

import { mdiFileExportOutline } from "@mdi/js";
import { defineComponent } from "vue";
import { VBtn, VIcon } from 'vuetify/components';

export const ExportFile = defineComponent({
  name: 'ExportFile',
  setup() {
    return () => <VBtn
      stacked
      disabled
      // @ts-ignore
      onClick={() => { }}
    >
      <VIcon>{mdiFileExportOutline}</VIcon>
      <span>导出</span>
    </VBtn>
  }
})

// TODO: add store

import { mdiFileExportOutline } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn } from 'vuetify/components'
import dayjs from 'dayjs'
import { useMindMap } from '@/composables'

export const ExportFile = defineComponent({
  name: 'ExportFile',
  setup() {
    const { mindMap } = useMindMap()

    const onExport = async () => {
      // @ts-ignore
      await mindMap.value?.export('png', true, `${dayjs(new Date()).format('YYYY-MM-DD')}-思维导图`)
    }

    return () => (
      <VBtn
        // @ts-ignore
        onClick={onExport}
        prependIcon={mdiFileExportOutline}
        stacked
        text="导出图片"
      />
    )
  },
})

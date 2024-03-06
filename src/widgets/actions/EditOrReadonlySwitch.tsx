// TODO: add store
import { mdiEyeOutline, mdiNoteEditOutline } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { storeToRefs } from 'pinia'
import { useMindMap } from '@/composables'
import { useAppStore } from '@/store/app'

export const EditOrReadonlySwitch = defineComponent({
  name: 'EditOrReadonlySwitch',
  setup() {
    const { mindMapConfig } = storeToRefs(useAppStore())
    const { mindMap } = useMindMap()

    const onModeChange = () => {
      mindMapConfig.value.readonly ? mindMapConfig.value.readonly = false : mindMapConfig.value.readonly = true
      mindMap.value?.setMode(mindMapConfig.value.readonly)
    }

    return () => (
      <VTooltip
        transition="slide-y-transition"
        offset={10}
        openDelay={100}
        location="top"
        v-slots={{
          activator: ({ isActive, props }: { isActive: boolean, props: any }) => (
            <VBtn
              {...props}
              active={isActive || mindMapConfig.value.readonly}
              color={(isActive || mindMapConfig.value.readonly) ? 'primary' : 'default'}
              onClick={onModeChange}
              icon
            >
              <VIcon>{mindMapConfig.value.readonly ? mdiEyeOutline : mdiNoteEditOutline}</VIcon>
            </VBtn>
          ),
          default: () => <p>{mindMapConfig.value.readonly ? '切换为编辑模式' : '切换为只读模式'}</p>,
        }}
      />
    )
  },
})

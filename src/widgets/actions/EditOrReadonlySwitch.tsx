// TODO: add store
import { mdiEyeOutline, mdiNoteEditOutline } from '@mdi/js'
import { computed, defineComponent, ref } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { useMindMap } from '@/composables'

export const EditOrReadonlySwitch = defineComponent({
  name: 'EditOrReadonlySwitch',
  setup() {
    const mode = ref<'edit' | 'readonly'>('edit')
    const isReadonly = computed(() => mode.value === 'readonly')
    const { mindMap } = useMindMap()

    const onModeChange = () => {
      isReadonly.value ? mode.value = 'edit' : mode.value = 'readonly'
      mindMap.value?.setMode(mode.value)
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
              active={isActive || isReadonly.value}
              color={(isActive || isReadonly.value) ? 'primary' : 'default'}
              onClick={onModeChange}
              icon
            >
              <VIcon>{isReadonly.value ? mdiEyeOutline : mdiNoteEditOutline}</VIcon>
            </VBtn>
          ),
          default: () => <p>{isReadonly.value ? '切换为编辑模式' : '切换为只读模式'}</p>,
        }}
      />
    )
  },
})

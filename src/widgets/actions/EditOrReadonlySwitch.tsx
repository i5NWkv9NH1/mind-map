// TODO: add store
import { useAppStore } from '@/store/app';
import { mdiEyeOutline, mdiNoteEditOutline } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, ref } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

export const EditOrReadonlySwitch = defineComponent({
  name: 'EditOrReadonlySwitch',
  setup() {
    const mode = ref<'edit' | 'readonly'>('edit')
    const isReadonly = computed(() => mode.value === 'readonly')
    const { mindMap } = storeToRefs(useAppStore())

    const onModeChange = () => {
      isReadonly.value ? mode.value = 'edit' : mode.value = 'readonly'
      mindMap.value?.setMode(mode.value)
    }

    return () => (
      <VTooltip
        transition={'slide-y-transition'}
        offset={10}
        openDelay={100}
        location={'top'}
        v-slots={{
          activator: ({ isActive, props }: { isActive: boolean; props: any }) => (
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
          default: () => <p>{isReadonly.value ? '切换为编辑模式' : '切换为只读模式'}</p>
        }}
      />
    )
  }
})

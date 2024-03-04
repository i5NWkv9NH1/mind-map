// TODO: add store
import { useAppStore } from '@/store/app';
import { mdiFullscreen } from '@mdi/js';
import { debounce } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, onMounted } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

export const FullScreenView = defineComponent({
  name: 'FullScreenView',
  setup() {
    const { mindMap } = storeToRefs(useAppStore())

    const toggleFullScreenView = async () => {
      if (mindMap.value) {
        await (mindMap.value.el as HTMLElement).requestFullscreen()
      }
    }

    onMounted(() => {
      document['onfullscreenchange'] = () => {
        debounce(() => {
          mindMap.value?.resize()
        }, 1000)
      }
    })

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
              active={isActive}
              onClick={toggleFullScreenView}
              icon
            >
              <VIcon>{mdiFullscreen}</VIcon>
            </VBtn>
          ),
          default: () => <p>
            全屏查看
          </p>
        }}
      />
    )
  }
})

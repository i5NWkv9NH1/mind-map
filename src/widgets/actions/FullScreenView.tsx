// TODO: add store
import { mdiFullscreen } from '@mdi/js'
import { debounce } from 'lodash'
import { defineComponent, onMounted } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { useMindMap } from '@/composables'

export const FullScreenView = defineComponent({
  name: 'FullScreenView',
  setup() {
    const { mindMap } = useMindMap()

    const toggleFullScreenView = async () => {
      if (mindMap.value)
        await (mindMap.value.el as HTMLElement).requestFullscreen()
    }

    onMounted(() => {
      document.onfullscreenchange = () => {
        debounce(() => {
          mindMap.value?.resize()
        }, 1000)
      }
    })

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
              active={isActive}
              onClick={toggleFullScreenView}
              icon
            >
              <VIcon>{mdiFullscreen}</VIcon>
            </VBtn>
          ),
          default: () => (
            <p>
              全屏查看
            </p>
          ),
        }}
      />
    )
  },
})

// TODO: add store
import { mdiVectorSquareEdit } from '@mdi/js'
import { defineComponent, ref } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { useSettingsStore } from '@/store/settings'

export const FullScreenEdit = defineComponent({
  name: 'FullScreenEdit',
  setup() {
    const { toggleMessage } = useSettingsStore()
    const isFullScreen = ref(false)

    const toggleFullScreenEdit = async () => {
      if (!document.fullscreenEnabled) {
        // ! not support fullscreen
        toggleMessage('error', { title: 'Not Support', text: 'Your Browser is not support fullscreen!' })
        return
      }
      if (isFullScreen.value) {
        await document.exitFullscreen()
        isFullScreen.value = false
        return
      }
      isFullScreen.value = true
      await document.body.requestFullscreen()
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
              active={isActive || isFullScreen.value}
              color={isFullScreen.value ? 'primary' : 'default'}
              onClick={toggleFullScreenEdit}
              icon
            >
              <VIcon>{mdiVectorSquareEdit}</VIcon>
            </VBtn>
          ),
          default: () => (
            <p>
              {isFullScreen.value ? '退出全屏编辑' : '打开全屏编辑'}
            </p>
          ),
        }}
      />
    )
  },
})

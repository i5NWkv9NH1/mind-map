// TODO: add store

import { mdiGestureTapButton, mdiSelectDrag } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { useAppStore } from '@/store/app'
import { useMindMap } from '@/composables'

export const MouseBehavior = defineComponent({
  name: 'MouseBehavior',
  setup() {
    const { mindMapConfig } = storeToRefs(useAppStore())
    const { mindMap } = useMindMap()

    const toggle = () => {
      mindMapConfig.value.useLeftKeySelectionRightKeyDrag = !mindMapConfig.value.useLeftKeySelectionRightKeyDrag
      mindMap.value?.updateConfig({
        useLeftKeySelectionRightKeyDrag: mindMapConfig.value.useLeftKeySelectionRightKeyDrag,
      })
    }

    return () => (
      <VTooltip
        transition="slide-y-transition"
        offset={10}
        openDelay={100}
        location="top"
        v-slots={{
          activator: ({ props }: { props: any }) => (
            <VBtn
              {...props}
              active={true}
              color="primary"
              class="mx-2"
              onClick={toggle}
            >
              {mindMapConfig.value.useLeftKeySelectionRightKeyDrag
                ? (
                  <>
                    <VIcon>{mdiSelectDrag}</VIcon>
                    |
                    <VIcon>{mdiGestureTapButton}</VIcon>
                  </>
                  )
                : (
                  <>
                    <VIcon>{mdiGestureTapButton}</VIcon>
                    |
                    <VIcon>{mdiSelectDrag}</VIcon>
                  </>
                  )}
            </VBtn>
          ),
          default: () => (
            <>
              <p>
                {mindMapConfig.value.useLeftKeySelectionRightKeyDrag ? '当前：左键选择节点，右键拖动画布' : '当前：左键拖动画布，右键选择节点'}
              </p>
            </>
          ),
        }}
      />
    )
  },
})

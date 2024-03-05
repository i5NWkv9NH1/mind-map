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
    const { useLeftKeySelectionRightKeyDrag } = storeToRefs(useAppStore())
    const { mindMap } = useMindMap()

    const toggle = () => {
      useLeftKeySelectionRightKeyDrag.value = !useLeftKeySelectionRightKeyDrag.value
      mindMap.value?.updateConfig({
        useLeftKeySelectionRightKeyDrag: useLeftKeySelectionRightKeyDrag.value,
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
              {useLeftKeySelectionRightKeyDrag.value
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
                {useLeftKeySelectionRightKeyDrag.value ? '当前：左键选择节点，右键拖动画布' : '当前：左键拖动画布，右键选择节点'}
              </p>
            </>
          ),
        }}
      />
    )
  },
})

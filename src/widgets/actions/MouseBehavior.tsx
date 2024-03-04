// TODO: add store

import { mdiGestureTapButton, mdiSelectDrag } from '@mdi/js'
import { defineComponent, ref } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'

export const MouseBehavior = defineComponent({
  name: 'MouseBehavior',
  setup() {
    const useLeftKeySelectionRightKeyDrag = ref(false)

    return () => (
      <VTooltip
        transition={'slide-y-transition'}
        offset={10}
        openDelay={100}
        location={'top'}
        v-slots={{
          activator: ({ props }: { props: any }) => (
            <VBtn
              {...props}
              active={true}
              color="primary"
              class="mx-2"
              onClick={() => useLeftKeySelectionRightKeyDrag.value = !useLeftKeySelectionRightKeyDrag.value}
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

import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { useAppStore } from '@/store'

export const MouseBehavior = defineComponent({
  name: 'MouseBehavior',
  setup() {
    const { useLeftKeySelectionRightKeyDrag } = storeToRefs(useAppStore())

    return () => (
      <VTooltip
        transition="slide-y-transition"
        offset="10"
        open-delay="100"
        location="top"
        v-slots={{
          activator: ({ _, props }: { _: boolean, props: any }) => (
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
                    <VIcon>mdi-select-drag</VIcon>
                    |
                    <VIcon>mdi-gesture-tap-button</VIcon>
                  </>
                  )
                : (
                  <>
                    <VIcon>mdi-gesture-tap-button</VIcon>
                    |
                    <VIcon>mdi-select-drag</VIcon>
                  </>
                  )}
            </VBtn>
          ),
          default: () => (
            <>
              {/* @ts-ignore */}
              <p>
                {useLeftKeySelectionRightKeyDrag.value ? '当前：左键选择节点，右键拖动画布' : '当前：左键拖动画布，右键选择节点'}
                {/* @ts-ignore */}
              </p>
            </>
          ),
        }}
      />
    )
  },
})

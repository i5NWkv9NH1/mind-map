import { mdiArtboard } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { useMindMap } from '@/composables'
import { withEventModifiers } from '@/directives'

export const MindMapReRender = defineComponent({
  name: 'MindMapReRender',
  setup() {
    const { mindMap } = useMindMap()

    const onReRender = () => {
      mindMap.value?.render(() => {
        console.warn('render')
      })
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
              active={isActive}
              icon
              {...withEventModifiers({
                onclick: onReRender,
              }, ['stop'])}
            >
              <VIcon>{mdiArtboard}</VIcon>
            </VBtn>
          ),
          default: () => (
            <p>
              保留数据, 重新加载画布
            </p>
          ),
        }}
      />
    )
  },
})

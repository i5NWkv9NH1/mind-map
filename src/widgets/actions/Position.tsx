import { mdiCrosshairsGps } from '@mdi/js'
import { defineComponent } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { useMindMap } from '@/composables'

export const Position = defineComponent({
  name: 'Position',
  setup() {
    const { mindMap } = useMindMap()

    return () => (
      <VTooltip
        transition="slide-y-transition"
        offset={10}
        openDelay={100}
        location="top"
        v-slots={{
          activator: ({ isActive, props }) => (
            <VBtn
              {...props}
              active={isActive}
              icon
              // @ts-ignore
              onClick={() => {
                mindMap.value?.renderer.setRootNodeCenter()
              }}
            >
              <VIcon>{mdiCrosshairsGps}</VIcon>
            </VBtn>
          ),
          default: () => <p>回到根节点</p>,
        }}
      />
    )
  },
})

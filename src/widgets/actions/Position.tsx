import { useAppStore } from '@/store/app';
import { mdiCrosshairsGps } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { defineComponent } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

export const Position = defineComponent({
  name: 'Position',
  setup() {
    const { mindMap } = storeToRefs(useAppStore())

    return () => (
      <VTooltip
        transition={'slide-y-transition'}
        offset={10}
        openDelay={100}
        location={'top'}
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
          default: () => <p>回到根节点</p>
        }}
      />
    )
  }
})

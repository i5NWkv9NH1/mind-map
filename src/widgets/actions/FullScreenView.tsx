// TODO: add store
import { mdiFullscreen } from '@mdi/js';
import { defineComponent } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

export const FullScreenView = defineComponent({
  name: 'FullScreenView',
  setup() {
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
              onClick={() => {
              }}
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

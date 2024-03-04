// TODO: add store
import { mdiVectorSquareEdit } from '@mdi/js';
import { defineComponent } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

export const FullScreenEdit = defineComponent({
  name: 'FullScreenEdit',
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
              <VIcon>{mdiVectorSquareEdit}</VIcon>
            </VBtn>
          ),
          default: () => <p>
            全屏编辑
          </p>
        }}
      />
    )
  }
})

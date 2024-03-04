// TODO: add store

import { mdiCrosshairsGps } from '@mdi/js';
import { defineComponent, ref } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

export const SearchNodes = defineComponent({
  name: 'SearchNodes',
  setup() {
    const searchDialog = ref(false)

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
              active={searchDialog.value}
              color={searchDialog.value ? 'primary' : 'default'}
              onClick={() => { searchDialog.value = !searchDialog.value }}
              icon
            >
              <VIcon>{mdiCrosshairsGps}</VIcon>
            </VBtn>
          ),
          default: () => <p>搜索节点</p>
        }}
      />
    )
  }
})

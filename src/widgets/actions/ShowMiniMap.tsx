// TODO: add store

import { mdiMapMarkerOffOutline, mdiMapMarkerOutline } from '@mdi/js';
import { defineComponent, ref } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components';

export const ShowMiniMap = defineComponent({
  name: 'ShowMiniMap',
  setup() {
    const isMiniMapShowd = ref(false)

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
              active={isMiniMapShowd.value}
              color={isMiniMapShowd.value ? 'primary' : 'default'}
              onClick={() => { isMiniMapShowd.value = !isMiniMapShowd.value }}
              icon
            >
              <VIcon>{isMiniMapShowd.value ? mdiMapMarkerOffOutline : mdiMapMarkerOutline}</VIcon>
            </VBtn>
          ),
          default: () => <p>
            {isMiniMapShowd ? '关闭小地图' : '开启小地图'}
          </p>
        }}
      />
    )
  }
})

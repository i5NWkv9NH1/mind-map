// TODO: add store

import { defineComponent, ref } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { mdiMinusThick, mdiPlusThick } from '@mdi/js'

export const Scale = defineComponent({
  name: 'Scale',
  setup() {
    const scale = ref('100')

    return () => (
      <div class={'d-flex align-center gap-4'}>
        <VTooltip
          transition={'slide-y-transition'}
          offset={10}
          openDelay={100}
          location={'top'}
          v-slots={{
            activator: ({ isActive, props }) => (
              <VBtn
                {...props}
                icon
              >
                <VIcon>{mdiMinusThick}</VIcon>
              </VBtn>
            )
          }}
        />
        <span>{scale.value}</span>
        <VTooltip
          transition={'slide-y-transition'}
          offset={10}
          openDelay={100}
          location={'top'}
          v-slots={{
            activator: ({ isActive, props }) => (
              <VBtn
                {...props}
                icon
              >
                <VIcon>{mdiPlusThick}</VIcon>
              </VBtn>
            )
          }}
        />
      </div>
    )
  }
})

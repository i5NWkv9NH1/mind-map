// TODO: add store

import { defineComponent, onMounted, ref } from "vue";
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { mdiMinusThick, mdiPlusThick } from '@mdi/js'
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app";

export const Scale = defineComponent({
  name: 'Scale',
  setup() {
    const scale = ref('100')
    const { mindMap } = storeToRefs(useAppStore())

    onMounted(() => {
      mindMap.value?.on('scale', (_: number) => {
        scale.value = (_ * 100).toFixed(0)
      })
    })

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
                // @ts-ignore
                onClick={() => mindMap.value?.view.narrow()}
              >
                <VIcon>{mdiMinusThick}</VIcon>
              </VBtn>
            ),
            default: () => <p>缩小比例</p>
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
                //@ts-ignore
                onClick={() => mindMap.value?.view.enlarge()}
              >
                <VIcon>{mdiPlusThick}</VIcon>
              </VBtn>
            ),
            default: () => <p>放大比例</p>
          }}
        />
      </div>
    )
  }
})

import { useAppStore } from "@/store";
import { useToggle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { defineComponent, computed } from "vue";
import { VBtn, VIcon, VTooltip } from "vuetify/components";

export const ThemeSwitch = defineComponent({
  name: 'ThemeSwitch',
  setup() {
    const { isDark } = storeToRefs(useAppStore())
    const icon = computed(() => isDark.value ? 'mdi-weather-sunny' : 'mdi-weather-night')
    const toggle = useToggle(isDark)
    return () => (
      <VTooltip
        transition="slide-y-transition"
        offset="10"
        open-delay="100"
        location="top"
        v-slots={{
          activator: ({ isActive, props }: { isActive: boolean; props: any }) => <VBtn
            {...props}
            icon
            active={isActive}
            class="mr-2"
            onClick={() => toggle()}
          >
            <VIcon>{icon.value}</VIcon>
          </VBtn>,
          default: () => <>
            {/* @ts-ignore */}
            <p>切换主题</p>
          </>
        }}
      />


    )
  }
})

import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import { useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, defineComponent } from 'vue'
import { VBtn, VIcon, VTooltip } from 'vuetify/components'
import { useSettingsStore } from '@/store/settings'

export const ThemeSwitch = defineComponent({
  name: 'ThemeSwitch',
  setup() {
    const { isDark } = storeToRefs(useSettingsStore())
    const icon = computed(() => isDark.value ? mdiWeatherSunny : mdiWeatherNight)
    const toggle = useToggle(isDark)
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
              icon
              active={isActive}
              class="mr-2"
              onClick={() => toggle()}
            >
              <VIcon>{icon.value}</VIcon>
            </VBtn>
          ),
          default: () => <p>切换主题</p>,
        }}
      />

    )
  },
})

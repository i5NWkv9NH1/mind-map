import {computed, defineComponent, watch} from "vue";
import {VBtn} from "vuetify/components";
import {useStorage, useToggle} from '@vueuse/core'
import {useDark} from "@vueuse/core/index";
import {useTheme} from "vuetify";

export const ThemeSwitch = defineComponent({
  name: 'ThemeSwitch',
  setup() {
    const isDark = useDark({
      storageKey: 'theme',
      valueDark: 'dark',
      valueLight: 'light',
      attribute: 'data-theme'
    })

    const toggle = useToggle(isDark)
    const theme = computed<string>(() => isDark.value ? `dark` : 'light')
    const vuetify = useTheme()

    watch(theme, () => {
      vuetify.global.name.value = theme.value
    })

    return () => <VBtn
      onClick={() => toggle()}
    >
      {{theme}}
    </VBtn>
  }
})

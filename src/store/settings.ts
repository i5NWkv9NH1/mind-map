import { useDark } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useTheme } from "vuetify/lib/framework.mjs";

export type Message = 'default' | 'info' | 'success' | 'error' | 'warning'
export type ToggleMessage = {
  title: string;
  text: string;
  delay?: number;
}

export const useSettingsStore = defineStore('settings', () => {
  const isDark = useDark()
  const theme = computed(() => isDark.value ? 'dark' : 'light')
  const vuetify = useTheme()
  watch(isDark, () => {
    vuetify.global.name.value = theme.value
  }, { immediate: true })

  const message = ref({
    status: true,
    title: 'Default title',
    text: 'Default text',
    color: 'default',
    delay: 2000
  })

  function toggleMessage(type: Message, { title, text, delay }: ToggleMessage) {
    message.value.title = title
    message.value.text = text
    message.value.delay = delay || 2000
    switch (type) {
      case 'info':
        message.value.color = 'info'
      case 'success':
        message.value.color = 'success'
      case 'error':
        message.value.color = 'error'
      case 'warning':
        message.value.color = 'warning'
      default:
        message.value.color = 'default'
    }
    message.value.status = true
  }

  return {
    isDark, theme, vuetify, message,
    toggleMessage
  }

}, { persist: { enabled: true } })

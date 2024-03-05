import { useDark } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useTheme } from 'vuetify/lib/framework.mjs'

export type Message = 'default' | 'info' | 'success' | 'error' | 'warning'
export interface ToggleMessage {
  title: string
  text: string
  delay?: number
}

export const useSettingsStore = defineStore('settings', () => {
  const isDark = useDark()
  const theme = computed(() => isDark.value ? 'dark' : 'light')
  const vuetify = useTheme()
  watch(isDark, () => {
    vuetify.global.name.value = theme.value
  }, { immediate: true })

  const message = ref({
    status: false,
    title: 'Default title',
    text: 'Default text',
    color: 'default',
    delay: 2000,
  })

  const loading = ref({
    status: false,
    color: 'primary',
    size: 70,
    width: 7,
  })

  function toggleMessage(type: Message, { title, text, delay }: ToggleMessage) {
    message.value.title = title
    message.value.text = text
    message.value.delay = delay || 2000
    message.value.color = type
    message.value.status = true
  }
  function toggleLoading(value = true, { color = 'primary', size = 70, width = 7 }: { value?: boolean, color?: string, size?: number, width?: number }) {
    loading.value.color = color
    loading.value.size = size
    loading.value.width = width
    loading.value.status = value
  }

  return {
    isDark,
    theme,
    vuetify,
    message,
    loading,
    toggleMessage,
    toggleLoading,
  }
}, { persist: { enabled: true } })

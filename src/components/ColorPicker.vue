<script
  setup
  lang="ts"
>
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiSquareRounded } from '@mdi/js'
import { isEmpty } from 'lodash'
import { ref, watch } from 'vue'
import type { Anchor } from '@/@types'

// # props
interface Props {
  // # 常用颜色
  items?: string[]
  // # 常用颜色图标大小
  iconSize?: number
  // # 常用颜色一栏的宽度
  width?: number
  disabled?: boolean
  // # 点击内容时关闭
  closeOnContentClick?: boolean
  // # 是否强制停留 Dialog
  persistent?: boolean
  // # Dialog 定位
  location?: Anchor
  transition?: string
  hideCanvas?: boolean
  mode?: 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hex' | 'hexa'
  tip?: string
  icon?: string
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  size: 24,
  width: 300,
  disabled: false,
  closeOnContentClick: false,
  persistent: false,
  location: 'left bottom',
  transition: 'scroll-y-transition',
  hideCanvas: false,
  mode: 'rgba',
  icon: '',
  tip: '',
})
// # emits
// * confirm: 弹窗点击确定时回调
const emits = defineEmits(['close', 'confirm'])
// # state
// * v-model:color 颜色
const isMenuOpen = ref(false)
const color = defineModel<string>('color', {
  type: String,
  required: true,
})
const tempColor = ref('')
watch(color, () => {
  tempColor.value = color.value
}, { immediate: true })
function onClose() {
  tempColor.value = color.value
  isMenuOpen.value = false
}
function onConfirm() {
  isMenuOpen.value = false
  color.value = tempColor.value
  emits('confirm')
}
</script>

<template>
  <VMenu
    v-model="isMenuOpen"
    offset="10"
    :transition="props.transition"
    :close-on-content-click="props.closeOnContentClick"
    :persistent="props.persistent"
    :location="props.location"
    :disabled="props.disabled"
  >
    <template #activator="arg">
      <!-- ! 不解构,避免冲突 -->
      <slot
        name="activator"
        :props="arg.props"
        :is-active="arg.isActive"
        :color="tempColor"
      >
        <VTooltip
          :transition="props.transition"
          offset="10"
          open-delay="100"
          location="top"
        >
          <template #activator="tip">
            <VBtn
              v-bind="{ ...arg.props, ...tip.props }"
              :color="tempColor"
              rounded="lg"
              size="small"
              icon
            >
              <VIcon>{{ props.icon }}</VIcon>
            </VBtn>
          </template>
          <p>{{ props.tip }}</p>
        </VTooltip>
      </slot>
    </template>
    <VCard>
      <VCardText>
        <VColorPicker
          v-model="tempColor"
          :hide-canvas="props.hideCanvas"
          :mode="props.mode"
          class="my-4"
          @click.stop
        />
        <VList v-if="!isEmpty(props.items)">
          <VListSubheader>常用颜色</VListSubheader>
          <div
            class="d-flex flex-wrap align-center px-4"
            :style="{ width: `${props.width}px` }"
          >
            <VIcon
              v-for="item in props.items"
              :key="item"
              :color="item"
              :size="props.iconSize"
              @click.stop="tempColor = item"
            >
              {{ mdiSquareRounded }}
            </VIcon>
          </div>
        </VList>
      </VCardText>
      <VCardActions>
        <VBtn @click="onClose">
          <VIcon start>
            {{ mdiCloseCircleOutline }}}
          </VIcon>
          <span>取消</span>
        </VBtn>
        <VBtn
          color="primary"
          @click="onConfirm"
        >
          <VIcon start>
            {{ mdiContentSaveOutline }}}
          </VIcon>
          <span>确定</span>
        </VBtn>
      </VCardActions>
    </VCard>
  </VMenu>
</template>

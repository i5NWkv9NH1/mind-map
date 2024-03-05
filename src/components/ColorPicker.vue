<script
  setup
  lang="ts"
>
import type { Anchor } from '@/@types';
import { mdiSquareRounded } from '@mdi/js';
import { isEmpty } from 'lodash'
import { ref } from 'vue'

// # props
interface Props {
  // # 常用颜色
  items?: string[]
  // # 常用颜色大小
  size?: number
  // # 常用颜色一栏的宽度
  width?: number
  // # 点击内容时关闭
  closeOnContentClick?: boolean
  // # 是否强制停留 Dialog
  persistent?: boolean
  // # Dialog 定位
  location?: Anchor
  transition?: string
  hideCanvas?: boolean
  showActions?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  size: 24,
  width: 300,
  closeOnContentClick: false,
  persistent: false,
  location: 'left top',
  transition: "scroll-y-transition",
  hideCanvas: false,
  showActions: true
})
// # emits
// * confirm: 弹窗点击确定时回调
const emits = defineEmits(['close', 'confirm'])
// # state
// * v-model:color 颜色
const color = defineModel('color', {
  type: String,
  required: true
})
const isMenuOpen = ref(false)
// ? 复制一份临时的颜色
// ? 如果使用 confirm 回调函数，则即使选择了颜色，但是还没有确定该颜色
// ? 关闭 Dialog 时还原
const tempColor = ref(color.value)
// # actions
// * 关闭 Dialog
function onClose() {
  color.value = tempColor.value
  isMenuOpen.value = false
}
function onConfirm() {
  isMenuOpen.value = false
  emits('confirm')
}
// * 打开 Dialog
// # modelValue

</script>

<template>
  <VMenu
    v-model="isMenuOpen"
    offset="10"
    :transition="props.transition"
    :closeOnContentClick="props.closeOnContentClick"
    :persistent="props.persistent"
    :location="props.location"
  >
    <template #activator="args">
      <!-- ! 不解构,避免冲突 -->
      <slot
        name="activator"
        :props="args.props"
        :isActive="args.isActive"
      />
    </template>
    <VCard>
      <VCardText>
        <VColorPicker
          v-model="color"
          :hide-canvas="props.hideCanvas"
          class="my-4"
        />
        <VList v-if="!isEmpty(props.items)">
          <VListSubheader>常用颜色</VListSubheader>
          <div
            class="d-flex flex-wrap align-center px-4"
            :style="{ width: props.width + 'px' }"
          >
            <VIcon
              v-for="item in props.items"
              :key="item"
              :color="item"
              :size="props.size"
              @click.stop="color = item"
            >
              {{ mdiSquareRounded }}
            </VIcon>
          </div>
        </VList>
      </VCardText>
      <VCardActions v-if="props.showActions">
        <VBtn @click="onClose">
          取消
        </VBtn>
        <VBtn
          color="primary"
          @click="onConfirm"
        >
          确定
        </VBtn>
      </VCardActions>
    </VCard>
  </VMenu>
</template>

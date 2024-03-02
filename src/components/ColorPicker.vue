<script
  setup
  lang="ts"
>
import { isEmpty } from 'lodash';
import { ref } from 'vue';

const modelValue = defineModel<string>('modelValue', {
  required: true
})
interface Props {
  items?: string[]
  size?: number
  closeOnContentClick?: boolean
  persistent?: boolean
  location?: any
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  size: 24,
  closeOnContentClick: false,
  persistent: true,
  location: 'left top'
})
const emits = defineEmits(['confirm'])
const isMenuOpen = ref(false)
const tempColor = ref(modelValue.value)
function onClose() {
  modelValue.value = tempColor.value
  isMenuOpen.value = false
}
function onConfirm() {
  isMenuOpen.value = false
  emits('confirm')
}
</script>

<template>
  <VMenu
    v-model="isMenuOpen"
    offset="10"
    transition="scroll-y-transition"
    :close-on-content-click="props.closeOnContentClick"
    :persistent="props.persistent"
    :location="props.location"
  >
    <template #activator="menuArgs">
      <slot
        name="activator"
        :props="menuArgs.props"
        :isActive="menuArgs.isActive"
      />
    </template>
    <VCard>
      <VCardText>
        <VColorPicker
          v-model="modelValue"
          class="my-4"
        />
        <VList v-if="!isEmpty(props.items)">
          <VListSubheader>常用颜色</VListSubheader>
          <div class="d-flex flex-wrap align-center px-4 used-colors">
            <VIcon
              v-for="item in props.items"
              :color="item"
              :key="item"
              :size="props.size"
              @click="modelValue = item"
            >
              mdi-square-rounded
            </VIcon>
          </div>
        </VList>
      </VCardText>
      <VCardActions>
        <VBtn @click="onClose">取消</VBtn>
        <VBtn
          @click="onConfirm"
          color="primary"
        >
          确定
        </VBtn>
      </VCardActions>
    </VCard>
  </VMenu>
</template>

<style
  scoped
  lang="scss"
>
.used-colors {
  width: 300px;
}
</style>

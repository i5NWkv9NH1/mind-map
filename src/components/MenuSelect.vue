<script
  setup
  lang="ts"
>
const props = defineProps<Props>()
const modelValue = defineModel<number | string>('modelValue', {
  type: Number,
  required: true,
  default: 0,
})
interface Props {
  items: { id?: string, name: string, value: number | string }[]
  size?: number
}
</script>

<template>
  <VMenu
    offset="10"
    transition="scroll-y-transition"
    :close-on-content-click="false"
  >
    <template #activator="menuArgs">
      <slot
        name="activator"
        :props="menuArgs.props"
        :is-active="menuArgs.isActive"
      />
    </template>
    <VList
      v-if="props.items"
      density="compact"
      nav
    >
      <VListItem
        v-for="(item, index) in props.items"
        :key="item.id || index"
        :value="item.value"
        :variant="item.value === modelValue ? 'tonal' : 'flat'"
        :disabled="item.value === modelValue"
        @click="modelValue = item.value"
      >
        <slot name="title">
          <VListItemTitle>{{ item.name }}</VListItemTitle>
        </slot>
      </VListItem>
    </VList>
  </VMenu>
</template>

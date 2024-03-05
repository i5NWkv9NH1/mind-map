<script
  setup
  lang="ts"
>
interface Props {
  items: { id?: string, name: string, value: number | string }[]
  transition?: string
  closeOnContentClick?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  transition: 'scroll-y-transition',
  closeOnContentClick: false,
})
const modelValue = defineModel<number | string>('modelValue', {
  type: Number,
  required: true,
  default: 0,
})
</script>

<template>
  <VMenu
    offset="10"
    :transition="props.transition"
    :close-on-content-click="props.closeOnContentClick"
  >
    <template #activator="args">
      <slot
        name="activator"
        :props="args.props"
        :is-active="args.isActive"
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

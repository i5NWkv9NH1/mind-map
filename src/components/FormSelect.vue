<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia'
import type { Density, Variant } from '@/@types'
import { useSettingsStore } from '@/store/settings'

interface Props {
  items?: Record<string, any>[]
  itemTitle?: string
  itemValue?: string
  variant?: Variant
  variantActive?: Variant
  listDensity?: Density
  selectDensity?: Density
  hideDetails?: boolean
  nav?: boolean
  label?: string
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  itemTitle: 'name',
  itemValue: 'value',
  variant: 'solo',
  variantActive: 'outlined',
  listDensity: 'compact',
  selectDensity: 'compact',
  hideDetails: true,
  nav: true,
})

const modelValue = defineModel<string | number>({
  required: true,
})
const { isDark } = storeToRefs(useSettingsStore())
</script>

<template>
  <VLabel v-if="props.label" class="text-subtitle-2 mb-2" :text="props.label" />
  <VSelect
    v-model="modelValue"
    :items="props.items"
    :item-title="props.itemTitle"
    :item-value="props.itemValue"
    :hide-details="props.hideDetails"
    :density="props.selectDensity"
    :variant="isDark ? props.variantActive : props.variant"
  >
    <!--    # slot -->
    <!--    # arg = { item, index, props } -->
    <template #item="arg">
      <VList :density="props.listDensity" :nav="props.nav">
        <!--          v-bind="args.props" -->
        <!--          :value="args.item.value" -->
        <VListItem
          :key="arg.index"
          :active="modelValue === arg.item.value"
          @click="() => {
            modelValue = arg.item.value
          }"
        >
          <slot name="default" v-bind="arg">
            <VListItemTitle>{{ arg.item.title }}</VListItemTitle>
          </slot>
        </VListItem>
      </VList>
    </template>
  </VSelect>
</template>

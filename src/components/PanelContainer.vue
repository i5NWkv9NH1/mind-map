<script setup lang="ts">
interface Props {
  top?: number
}
const props = withDefaults(defineProps<Props>(), {
  top: 112
})
</script>

<template>
  <VCard
    id="panel"
    rounded="xs"
  >
    <VCardTitle id="panel-title">
      <slot name="title" />
    </VCardTitle>
    <VCardText id="panel-content">
      <slot name="content" />
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
#panel {

  // height: calc(100vh - v-bind(top + 'px'));
  &-title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity));

    :first-child {
      flex: 1;
      text-align: center;
    }
  }

  &-content {
    overflow-y: scroll;
    height: calc(100vh - 128px - 64px);
  }
}
</style>

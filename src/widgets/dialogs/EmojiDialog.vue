<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'

const { emojiDialog } = storeToRefs(useAppStore())
</script>

<template>
  <VDialog
    v-model="emojiDialog.status"
    transition="scroll-y-transition"
  >
    <VContainer>
      <VRow justify="center">
        <VCol
          cols="12"
          lg="6"
          md="6"
          sm="8"
        >
          <VCard>
            <VCardTitle>图标</VCardTitle>
            <VCardText />
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VDialog>
</template>

<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'

const { linkDialog } = storeToRefs(useAppStore())

function close() {
  linkDialog.value.status = false
}
function confirm() {
  linkDialog.value.status = false
}
</script>

<template>
  <VDialog
    v-model="linkDialog.status"
    transition="scroll-y-transition"
    persistent
  >
    <VContainer>
      <VRow justify="center">
        <VCol
          cols="12"
          lg="6"
          md="6"
          sm="8"
        >
          <VCard elevation="6">
            <VCardTitle>超链接</VCardTitle>
            <VCardText>
              <VLabel>链接</VLabel>
              <VTextField
                variant="outlined"
                placeholder="https://example.com"
              />
              <VLabel>名称</VLabel>
              <VTextField
                placeholder="Example"
                variant="outlined"
              />
            </VCardText>
            <VCardActions>
              <VBtn @click="close">
                <VIcon start>
                  mdi-close
                </VIcon>
                <span>取消</span>
              </VBtn>
              <VBtn
                color="primary"
                @click="confirm"
              >
                <VIcon start>
                  mdi-content-save-outline
                </VIcon>
                <span>确定</span>
              </VBtn>
              <VSpacer />
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VDialog>
</template>

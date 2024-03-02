<script
  setup
  lang="ts"
>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import '@toast-ui/editor/dist/toastui-editor.css'
import { useAppStore } from '@/store/app'

const { noteDialog } = storeToRefs(useAppStore())
const el = ref<HTMLElement>()

function close() {
  noteDialog.value.status = false
}
function confirm() {
  noteDialog.value.status = false
}
</script>

<template>
  <VDialog
    v-model="noteDialog.status"
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
            <VCardTitle>备注</VCardTitle>
            <VCardText>
              <!-- TODO: create custom editor UI -->
              <div ref="el" />
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

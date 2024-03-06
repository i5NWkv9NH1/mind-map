// TODO: support multiple nodes seleceted
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiSigma } from '@mdi/js'
import { defineComponent, ref, watchEffect } from 'vue'
import { VBtn, VCard, VCardActions, VCardText, VCol, VContainer, VDialog, VIcon, VListItem, VRow, VSheet, VTextarea } from 'vuetify/components'
import { storeToRefs } from 'pinia'

// @ts-ignore

import katex from 'katex'

// import { useSettingsStore } from '@/store/settings'
import { useMindMap, usePresets } from '@/composables'
import { useAppStore } from '@/store/app'
import 'katex/dist/katex.min.css'

export const NodeMath = defineComponent({
  name: 'NodeMath',
  setup() {
    const { mindMap } = useMindMap()
    // const { toggleMessage } = useSettingsStore()
    const { usedFormluaItems } = usePresets()
    const { activeNodes, isActiveNode, hasGeneralization } = storeToRefs(useAppStore())

    const dialog = ref(false)
    const text = ref('')
    const preview = ref('')
    const textareaEl = ref<HTMLTextAreaElement>()
    const previewEl = ref<HTMLDivElement>()

    watchEffect(() => {
      if (text.value)
        preview.value = katex.renderToString(text.value)
    })

    const onReset = () => {
      text.value = ''
      preview.value = ''
      dialog.value = false
    }
    const onAbort = () => {
      onReset()
    }
    const onConfirm = () => {
      if (!isActiveNode.value)
        return
      mindMap.value?.execCommand('INSERT_FORMULA', text.value, activeNodes.value)
      onReset()
    }

    return () => {
      return (
        <>
          <VDialog
            v-model={dialog.value}
            transition="slide-y-transition"
          >
            <VContainer>
              <VRow justify="center">
                <VCol cols={12} lg={8} md={8}>
                  <VCard
                    title="公式"
                    prependIcon={mdiSigma}
                  >
                    <VCardText>
                      <VTextarea
                        ref={textareaEl}
                        v-model={text.value}
                        maxRows={5}
                        variant="solo"
                        density="compact"
                      />
                      <div class="d-flex flex-wrap gap-2">
                        {usedFormluaItems.value.map(item => (
                          <VListItem v-html={katex.renderToString(item)} onClick={() => { text.value += item }} />
                        ))}
                      </div>
                      <VSheet ref={previewEl} v-html={preview.value} maxHeight={200} class="overflow-y pa-4" />
                    </VCardText>
                    <VCardActions>
                      <VBtn
                        // @ts-ignore
                        onClick={onAbort}
                      >
                        <VIcon start>{mdiCloseCircleOutline}</VIcon>
                        <span>取消</span>
                      </VBtn>
                      <VBtn
                        // @ts-ignore
                        onClick={onConfirm}
                        color="primary"
                      >
                        <VIcon start>{mdiContentSaveOutline}</VIcon>
                        <span>确定</span>
                      </VBtn>
                    </VCardActions>
                  </VCard>
                </VCol>
              </VRow>
            </VContainer>
          </VDialog>
          <VBtn
            stacked
            active={dialog.value}
            color={dialog.value ? 'primary' : 'default'}
            disabled={!isActiveNode.value || hasGeneralization.value}
            // @ts-ignore
            onClick={() => {
              dialog.value = true
            }}
          >
            <VIcon>{mdiSigma}</VIcon>
            <span>公式</span>
          </VBtn>
        </>
      )
    }
  },
})

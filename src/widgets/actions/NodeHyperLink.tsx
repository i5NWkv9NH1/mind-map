// TODO: support multiple nodes seleceted
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiLinkVariantPlus } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, ref } from 'vue'
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VContainer, VDialog, VForm, VIcon, VTextField } from 'vuetify/components'

// @ts-ignore

// import { useSettingsStore } from '@/store/settings'
import { useMindMap } from '@/composables'
import { withEventModifiers } from '@/directives'
import { useAppStore } from '@/store/app'

export const NodeHyperLink = defineComponent({
  name: 'NodeHyperLink',
  setup() {
    const { mindMap, activeNodes } = useMindMap()
    // const { toggleMessage } = useSettingsStore()
    const { isActiveNode } = storeToRefs(useAppStore())

    const dialog = ref(false)
    const link = ref('')
    const title = ref('')

    const onAbort = () => {
      dialog.value = false
    }
    const onConfirm = () => {
      activeNodes.value!.forEach((node) => {
        node.setHyperlink(link.value, title.value)
      })
      dialog.value = false
    }

    onMounted(() => {
      mindMap.value?.on('node_active', () => {
        if (!activeNodes.value || activeNodes.value.length === 0) {
          link.value = ''
          title.value = ''
        }
        else {
          link.value = activeNodes.value[0].getData('hyperlink') || ''
          title.value = activeNodes.value[0].getData('hyperlinkTitle') || ''
        }
        // if (!activeNodes.value) {
        //   link.value = ''
        //   title.value = ''
        // }
        // else if (activeNodes.value.length > 0) {
        //   link.value = activeNodes.value[0].getData('hyperlink') || ''
        //   title.value = activeNodes.value[0].getData('hyperlinkTitle') || ''
        // }
        // else {
        //   link.value = ''
        //   title.value = ''
        // }
      })
    })

    return () => (
      <>
        <VDialog
          v-model={dialog.value}
          // transition="dialog-bottom-transition"
          transition="slide-y-transition"
          persistent
        >
          <VContainer>
            <VCard maxWidth={400} class="mx-auto">
              <VCardTitle>添加超链接</VCardTitle>
              <VCardText>
                <VForm>
                  <VTextField
                    v-model={link.value}
                    label="链接"
                    variant="solo"
                    clearable
                    persistentPlaceholder
                    {...withEventModifiers({
                      onkeydown: () => { },
                      onkeyup: () => { },
                    }, ['stop'])}
                  />
                  <VTextField
                    v-model={title.value}
                    // @ts-ignore
                    label="名称"
                    variant="solo"
                    clearable
                    persistentPlaceholder
                    {...withEventModifiers({
                      onkeydown: () => { },
                      onkeyup: () => { },
                    }, ['stop'])}
                  />
                </VForm>
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
          </VContainer>
        </VDialog>
        <VBtn
          stacked
          active={dialog.value}
          color={dialog.value ? 'primary' : 'default'}
          disabled={!isActiveNode.value}
          // @ts-ignore
          onClick={() => {
            dialog.value = true
          }}
        >
          <VIcon>{mdiLinkVariantPlus}</VIcon>
          <span>超链接</span>
        </VBtn>
      </>
    )
  },
})

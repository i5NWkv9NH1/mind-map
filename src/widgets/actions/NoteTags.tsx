// TODO: support multiple nodes seleceted
// TODO: 删除节点的标签但不保存, 重新打开后标签内容为空 (增加回收站, 标签点击删除移入回收站,等用户点确定时再进行真实删除, 点击取消返回回收站的数组)
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiTagOutline, mdiTagSearchOutline } from '@mdi/js'
import { isEmpty } from 'lodash'
import { storeToRefs } from 'pinia'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { VBtn, VCard, VCardActions, VCardText, VChip, VCol, VContainer, VDialog, VExpandTransition, VIcon, VRow, VTextField } from 'vuetify/components'

import {
  generateColorByContent,
  // @ts-ignore
} from 'simple-mind-map/src/utils/index'
import { useAppStore } from '@/store/app'
import { withEventModifiers } from '@/directives'
import { useMindMap } from '@/composables'
import type { MindMapNode } from '@/@types'

export const NodeTags = defineComponent({
  name: 'NodeTags',
  setup() {
    // const { toggleMessage } = useSettingsStore()
    const { mindMap, activeNodes } = useMindMap()
    const { isActiveNode, mindMapConfig } = storeToRefs(useAppStore())

    const dialog = ref(false)
    const text = ref('')
    const items = ref<string[]>([])
    const isMaxTags = computed(() => items.value.length >= mindMapConfig.value.maxTag)

    const onReset = () => {
      dialog.value = false
      text.value = ''
      items.value = []
    }
    const onAbort = () => {
      if (isActiveNode.value)
        dialog.value = false

      else onReset()
    }
    const onConfirm = () => {
      activeNodes.value.forEach(node => node.setTag(items.value))
      dialog.value = false
    }
    const onAddTag = () => {
      if (!text.value)
        return
      if (isMaxTags.value)
        return
      items.value.push(text.value)
      text.value = ''
    }

    onMounted(() => {
      mindMap.value?.on('node_active', (node: MindMapNode, _nodes: MindMapNode[]) => {
        if (_nodes.length > 0)
          items.value = _nodes[0].getData('tag') || []
        else
          onReset()
      })
    })

    return () => (
      <>
        <VDialog
          v-model={dialog.value}
          transition="slide-y-transition"
        >
          <VContainer>
            <VRow justify="center">
              <VCol cols={12} lg={6} md={6} sm={8}>
                <VCard
                  title="标签"
                  prependIcon={mdiTagOutline}
                >
                  <VCardText>
                    <VTextField
                      v-model={text.value}
                      variant="outlined"
                      placeholder={isMaxTags.value ? '标签不能大于5个' : '请按回车键添加标签'}
                      disabled={isMaxTags.value}
                      {...withEventModifiers({
                        onkeyup: onAddTag,
                      }, ['enter', 'stop'])}
                      {...withEventModifiers({
                        onkeydown: () => { },
                      }, ['stop'])}
                      v-slots={{
                        'append-inner': () => (
                          <VBtn
                            disabled={isMaxTags.value}
                            variant="flat"
                            {...withEventModifiers({
                              onclick: onAddTag,
                            }, ['stop'])}
                          >
                            添加
                          </VBtn>
                        ),
                      }}
                    />
                    <VExpandTransition>
                      {!isEmpty(items.value) && (
                        <div
                          class="d-flex flex-wrap gap-2"
                        >
                          {items.value.map((tag, index) => (
                            <VChip
                              key={index}
                              color={generateColorByContent(tag)}
                              text={tag}
                              rounded="lg"
                              v-slots={{
                                close: () => (
                                  <VIcon
                                    {...withEventModifiers({
                                      onclick: () => { items.value = items.value.filter(_ => _ !== tag) },
                                    }, ['stop'])}
                                  >
                                    {mdiCloseCircleOutline}
                                  </VIcon>
                                ),
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </VExpandTransition>
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
          disabled={!isActiveNode.value}
          // @ts-ignore
          onClick={() => {
            dialog.value = true
          }}
        >
          <VIcon>{mdiTagSearchOutline}</VIcon>
          <span>标签</span>
        </VBtn>
      </>
    )
  },
})

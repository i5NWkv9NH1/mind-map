// TODO: 优化
import { Logger, StateLogger } from '@/helpers';
import { useAppStore } from '@/store/app';
import { mdiChevronDown, mdiChevronRight, mdiClose, mdiCloseCircle, mdiMagnify } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { } from 'simple-mind-map/src/utils';
import { defineComponent, nextTick, onMounted, ref, withKeys } from "vue";
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VExpandTransition, VIcon, VSlideXTransition, VSlideYTransition, VTextField, VTooltip } from 'vuetify/components';

export const SearchNodes = defineComponent({
  name: 'SearchNodes',
  setup() {
    const { mindMap, isMindMapReadonly } = storeToRefs(useAppStore())

    const searchDialog = ref(false)
    const textFieldEl = ref<HTMLInputElement>()
    // # 要搜索的文字
    const searchText = ref('')
    // # 要替换的文字
    const replaceText = ref('')
    // # 当前结果的索引数
    const currentIndex = ref(0)
    // # 全部结果索引数
    const total = ref(0)
    // # 是否渲染搜索结果索引和总数
    const showSearchResult = ref(false)
    // # 是否渲染替换和全部替换
    const showReplace = ref(false)
    const loading = ref(false)

    // watchEffect(() => {
    //   if (isEmpty(searchText.value)) {
    //     currentIndex.value = 0
    //     total.value = 0
    //     showSearchResult.value = false
    //   }
    // })

    const onShortkey = () => {
      // * fix mind map search bug
      if (searchDialog.value) {
        textFieldEl.value?.focus()
        return
      }
      searchDialog.value = !searchDialog.value
      // ! dom
      nextTick(() => {
        textFieldEl.value?.focus()
      })
    }
    const onSearchChange = (data: any) => {
      Logger.debug('key down')
      currentIndex.value = data.currentIndex + 1
      total.value = data.total
      // # show index and total
      showSearchResult.value = true
      textFieldEl.value?.focus()
    }
    const onSearchNext = () => {
      // ! 调用 mindmap 查找, 当 mindmap 查找到时会强制激活对用的节点
      // ! 此时无法使用回车键继续查找
      // ! 需要在回调中强制聚焦输入框
      mindMap.value?.search.search(searchText.value, () => {
        Logger.debug('search in mindmap...')
        // ! 当 mindmap 查找完毕后会 emit search_info_change 和回调函数 onSearchChange
      })
    }
    const replace = () => {
      mindMap.value?.search.replace(replaceText.value, true)
    }
    const replaceAll = () => {
      StateLogger.debug('replace text:', replaceText.value)
      mindMap.value?.search.replaceAll(replaceText.value)
    }
    const onSearchClose = () => {
      searchDialog.value = false;
      searchText.value = ''
      replaceText.value = ''
      showReplace.value = false
      showSearchResult.value = false
      currentIndex.value = 0
      total.value = 0
      mindMap.value?.search.endSearch()
    }

    onMounted(() => {
      mindMap.value?.on('search_info_change', onSearchChange)
      mindMap.value?.keyCommand.addShortcut('Control+f', onShortkey)
    })


    return () => (
      <>
        <VSlideXTransition
        >
          {searchDialog.value && <VCard style={{ position: 'fixed', right: '1rem', top: '1rem' }} width={400}>
            <VCardTitle>查找和替换</VCardTitle>
            <VCardText>
              <VTextField
                ref={textFieldEl}
                v-model={searchText.value}
                placeholder={'使用回车键进行查找'}
                label={'查找'}
                rounded={'lg'}
                persistentPlaceholder
                variant={'solo'}
                loading={loading.value}
                disabled={isMindMapReadonly.value}
                //@ts-ignore
                // @ts-ignore
                // onKeydown={withKeys(onSearchNext, ['native', 'enter', 'stop'])}
                onKeyup={withKeys(onSearchNext, ['native', 'enter', 'stop'])}
                onKeydown={withKeys(() => { searchDialog.value = false }, ['native', 'esc', 'stop'])}
                v-slots={{
                  "prepend-inner": () => (
                    <>
                      <VBtn
                        variant={'text'}
                        // @ts-ignore
                        onClick={() => {
                          showReplace.value = !showReplace.value
                        }}
                        size={'small'}
                        icon
                      >
                        <VIcon >{showReplace.value ? mdiChevronDown : mdiChevronRight}</VIcon>
                      </VBtn>
                    </>
                  ),
                  "append-inner": () => (
                    <>
                      <VExpandTransition>
                        {showSearchResult.value && (<div class={'d-flex align-items gap-1 mr-2'}>
                          <span>{currentIndex.value}</span> / <span>{total.value}</span>
                        </div>)}
                      </VExpandTransition>
                      <VBtn
                        variant={'text'}
                        // @ts-ignore
                        onClick={onSearchNext}
                      >
                        <span>查找</span>
                      </VBtn>
                    </>
                  )
                }}
              />
              <VSlideYTransition>
                {showReplace.value && (
                  <VTextField
                    v-model={replaceText.value}
                    rounded={'lg'}
                    disabled={isMindMapReadonly.value}
                    label={'替换内容'}
                    variant={'solo'}
                    persistentPlaceholder
                    v-slots={{
                      "append-inner": () => (
                        <>
                          <VBtn class={'mr-2'}
                            // @ts-ignore
                            onClick={replace}
                          >替换</VBtn>
                          <VBtn
                            // @ts-ignore
                            onClick={replaceAll}
                          >全部替换</VBtn>
                        </>
                      )
                    }}
                  />
                )}
              </VSlideYTransition>
            </VCardText>
            <VCardActions>
              <VBtn
                // @ts-ignore
                onClick={onSearchClose}
                elevation={0}
              >
                <VIcon start>{mdiCloseCircle}</VIcon>
                <span>关闭</span>
              </VBtn>
              {/* <VBtn
                color={'primary'}
                // @ts-ignore
                onClick={onSearchConfirm}
              >
                确定
              </VBtn> */}
            </VCardActions>
          </VCard>}

        </VSlideXTransition>
        <VTooltip
          transition={'slide-y-transition'}
          offset={10}
          openDelay={100}
          location={'top'}
          v-slots={{
            activator: ({ props }: { props: any }) => (
              <VBtn
                {...props}
                active={searchDialog.value}
                color={searchDialog.value ? 'primary' : 'default'}
                onClick={() => {
                  searchDialog.value = !searchDialog.value;
                  if (searchDialog.value) {
                    nextTick(() => {
                      textFieldEl.value?.focus()
                    })
                  }
                }}
                icon
              >
                <VIcon>{mdiMagnify}</VIcon>
              </VBtn>
            ),
            default: () => <p>搜索节点</p>
          }}
        />
      </>
    )
  }
})

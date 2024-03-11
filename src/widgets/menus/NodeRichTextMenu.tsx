// TODO:  qull editor error
import { mdiEraser, mdiFormatBold, mdiFormatColorFill, mdiFormatColorText, mdiFormatFont, mdiFormatItalic, mdiFormatStrikethrough, mdiFormatText, mdiFormatUnderline } from '@mdi/js'
import { computed } from '@vue/reactivity'
import { v4 as uuid } from 'uuid'
import { defineComponent, onMounted, ref, withModifiers } from 'vue'
import { VBtn, VCard, VCardActions, VExpandTransition, VIcon, VList, VListItem, VListItemTitle, VMenu, VTooltip, VVirtualScroll } from 'vuetify/lib/components/index.mjs'
import { useMindMap, usePresets } from '@/composables'
import ColorPicker from '@/components/ColorPicker.vue'
import './NodeRichTextMenu.scss'
import { withEventModifiers } from '@/directives'

export interface NodeFormat {
  bold: boolean
  italic: boolean
  underline: boolean
  strike: boolean
  font: string
  color: string
  size: number
  bgColor: string
}
export interface Rect {
  width: number
  left: number
  top: number
  right: number
  bottom: number
}

export const NodeRichTextMenu = defineComponent({
  name: 'NodeRichTextMenu',
  setup() {
    const { mindMap } = useMindMap()
    const { fontFamilyItems, fontSizeItems, usedColorItems } = usePresets()

    const isShow = ref(false)
    const currentFormat = ref<NodeFormat>({
      bold: false,
      italic: false,
      underline: false,
      strike: false,
      color: '',
      bgColor: '',
      font: '',
      size: 16,
    })

    const position = ref<Rect>({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
    })

    const items = computed(() => {
      if (true) {
        return [
          {
            id: uuid(),
            name: '加粗',
            icon: mdiFormatBold,
            active: currentFormat.value?.bold,
            action: () => {
              currentFormat.value.bold = !currentFormat.value.bold
              mindMap.value?.richText.formatText({
                bold: currentFormat.value.bold,
              })
            },
          },
          {
            id: uuid(),
            name: '斜体',
            icon: mdiFormatItalic,
            active: currentFormat.value?.italic,
            action: () => {
              currentFormat.value.italic = !currentFormat.value.italic
              mindMap.value?.richText.formatText({
                italic: currentFormat.value.italic,
              })
            },
          },
          {
            id: uuid(),
            name: '下划线',
            icon: mdiFormatUnderline,
            active: currentFormat.value?.underline,
            action: () => {
              currentFormat.value.underline = !currentFormat.value.underline
              mindMap.value?.richText.formatText({
                underline: currentFormat.value.underline,
              })
            },
          },
          {
            id: uuid(),
            name: '删除线',
            icon: mdiFormatStrikethrough,
            active: currentFormat.value?.strike,
            action: () => {
              currentFormat.value.strike = !currentFormat.value.strike
              mindMap.value?.richText.formatText({
                strike: currentFormat.value.strike,
              })
            },
          },
          { id: uuid(), component: <FontFmaily /> },
          { id: uuid(), component: <FontSize /> },
          { id: uuid(), component: <FontColor /> },
          { id: uuid(), component: <BgColor /> },
          { id: uuid(), name: '清楚样式', icon: mdiEraser, active: false, action: () => { mindMap.value?.richText.removeFormat() } },
        ]
      }
    })

    function FontFmaily() {
      return (
        <VMenu
          offset={10}
          transition="slide-y-transiton"
          location="bottom"
          closeOnContentClick={false}
          openOnClick
          v-slots={{
            activator: args => (
              <VTooltip
                offset={10}
                transition="slide-y-transition"
                location="top"
                v-slots={{
                  default: () => (
                    <p>字体</p>
                  ),
                  activator: ({ isActive, props }) => (
                    <VBtn
                      {...args.props}
                      {...props}
                      active={isActive}
                      rounded="lg"
                      icon
                    >
                      <VIcon>{mdiFormatFont}</VIcon>
                    </VBtn>
                  ),
                }}
              />
            ),
            default: () => (
              <VList
                density="compact"
                nav
                slim
                {...{ onClick: withModifiers(() => { }, ['stop']) }}
              >
                {/* ! 避免数据过多造成 location 失效  */}
                <VVirtualScroll
                  itemHeight={40}
                  maxHeight={200}
                  items={fontFamilyItems.value}
                  v-slots={{
                    default: ({ item }) => {
                      const isActive = computed(() => {
                        if (!currentFormat.value.font)
                          return false
                        return item.value === currentFormat.value.font
                      })
                      return (
                        <VListItem
                          key={item.id}
                          value={item.value}
                          active={isActive.value}
                          color={isActive.value ? 'primary' : 'default'}
                          class="pa-0 my-1"
                          v-slots={{
                            default: () => (
                              <VListItemTitle>
                                <VBtn
                                  variant="text"
                                  block
                                  // @ts-ignore
                                  onClick={() => {
                                    currentFormat.value.font = item.value
                                    mindMap.value?.richText.formatText({
                                      font: currentFormat.value.font,
                                    })
                                  }}
                                >
                                  {item.name}
                                </VBtn>
                              </VListItemTitle>
                            ),
                          }}
                        />
                      )
                    },
                  }}
                />
              </VList>
            ),
          }}
        />
      )
    }
    function FontSize() {
      return (
        <VMenu
          offset={10}
          transition="slide-y-transiton"
          location="bottom"
          closeOnContentClick={false}
          v-slots={{
            activator: args => (
              <VTooltip
                offset={10}
                transition="slide-y-transition"
                location="top"
                v-slots={{
                  default: () => (
                    <p>字号</p>
                  ),
                  activator: ({ isActive, props }) => (
                    <VBtn
                      {...args.props}
                      {...props}
                      active={isActive}
                      rounded="lg"
                      icon
                    >
                      <VIcon>{mdiFormatText}</VIcon>
                    </VBtn>
                  ),
                }}
              />
            ),
            default: () => (
              <VList density="compact" nav>
                {/* ! 避免数据过多造成 location 失效  */}
                <VVirtualScroll
                  itemHeight={40}
                  maxHeight={200}
                  items={fontSizeItems.value}
                  v-slots={{
                    default({ item }) {
                      const isActive = computed(() => {
                        if (!currentFormat.value)
                          return false
                        if (!currentFormat.value.size)
                          return false
                        return +(currentFormat.value.size) === item
                      })
                      return (
                        <VListItem
                          key={item}
                          value={item}
                          active={isActive.value}
                          color={isActive.value ? 'primary' : 'default'}
                          class="pa-0 my-1"
                          v-slots={{
                            default: () => (
                              <VListItemTitle>
                                <VBtn
                                  variant="text"
                                  height={`${36 + item}px`}
                                  // @ts-ignore
                                  onClick={withModifiers(() => {
                                    currentFormat.value.size = item
                                    mindMap.value?.richText.formatText({
                                      size: `${currentFormat.value.size}px`,
                                    })
                                  }, ['stop'])}
                                  block
                                >
                                  <span style={{
                                    fontSize: `${item}px`,
                                    lineHeight: `${item}px`,
                                  }}
                                  >
                                    {item}
                                    {' '}
                                    px
                                  </span>
                                </VBtn>
                              </VListItemTitle>
                            ),
                          }}
                        />
                      )
                    },
                  }}
                />
              </VList>
            ),
          }}
        />
      )
    }
    function FontColor() {
      return (
        <ColorPicker
          transition="slide-y-transiton"
          location="bottom"
          closeOnContentClick={false}
          color={currentFormat.value.color}
          // @ts-ignore
          showActions={false}
          onUpdate:color={(value: string) => {
            currentFormat.value.color = value
            mindMap.value?.richText.formatText({
              color: currentFormat.value.color,
            })
          }}
          items={usedColorItems.value}
          v-slots={{
            activator: (args: { isActive: boolean, props: any }) => (
              <VTooltip
                offset={10}
                transition="slide-y-transition"
                location="top"
                v-slots={{
                  default: () => (
                    <p>文字颜色</p>
                  ),
                  activator: ({ isActive, props }) => (
                    <VBtn
                      {...args.props}
                      {...props}
                      active={isActive}
                      rounded="lg"
                      icon
                    >
                      <VIcon>{mdiFormatColorText}</VIcon>
                    </VBtn>
                  ),
                }}
              />
            ),
          }}
        />
      )
    }
    function BgColor() {
      return (
        <ColorPicker
          transition="slide-y-transiton"
          location="bottom"
          closeOnContentClick={false}
          color={currentFormat.value.bgColor}
          // @ts-ignore
          onUpdate:color={(value: string) => {
            currentFormat.value.bgColor = value
            mindMap.value?.richText.formatText({
              background: currentFormat.value.bgColor,
            })
          }}
          items={usedColorItems.value}
          v-slots={{
            activator: (args: { isActive: boolean, props: any }) => (
              <VTooltip
                offset={10}
                transition="slide-y-transition"
                location="top"
                v-slots={{
                  default: () => (
                    <p>背景颜色</p>
                  ),
                  activator: ({ isActive, props }) => (
                    <VBtn
                      {...props}
                      {...args.props}
                      active={isActive}
                      rounded="lg"
                      icon
                    >
                      <VIcon>{mdiFormatColorFill}</VIcon>
                    </VBtn>
                  ),
                }}
              />
            ),
          }}
        />
      )
    }

    onMounted(() => {
      mindMap.value?.on('rich_text_selection_change', (hasRange: boolean, rect: Rect, formatInfo: any) => {
        // ! 是否更新位置
        // ! 需要判断, 不然抛出异常: DOM Exception
        // ! Failed to execute 'setStart' on 'Range': The offset 4294967295 is larger than the node's length (2).
        if (hasRange) {
          currentFormat.value.bold = formatInfo?.bold ?? false
          currentFormat.value.italic = formatInfo?.italic ?? false
          currentFormat.value.underline = formatInfo?.underline ?? false
          currentFormat.value.strike = formatInfo?.strike ?? false
          // @ts-ignore // * 必有的字段
          currentFormat.value.font = formatInfo?.font ?? ''
          // @ts-ignore // * 必有的字段
          currentFormat.value.size = formatInfo?.size ? +(formatInfo.size.replace('px', '')) : 16
          // @ts-ignore // * 必有的字段
          currentFormat.value.color = formatInfo?.color ?? ''
          // @ts-ignore // * 必有的字段
          currentFormat.value.bgColor = formatInfo?.background ?? ''
          position.value = rect
        }
        isShow.value = hasRange
      })
    })

    return () => (
      <VExpandTransition>
        {isShow.value && (
          <VCard
            {...withEventModifiers({
              onclick: () => { },
            }, ['stop', 'passive'])}
            style={{
              top: `${position.value.top - 80}px`,
              left: `${position.value.left + position.value.width / 2}px`,
              right: `${position.value.right}px`,
              bottom: `${position.value.bottom}px`,
              position: 'fixed',
              width: 'max-content',
              height: 'max-content',
            }}
          >
            <VCardActions>
              {items.value.map((item) => {
                if (item.component)
                  return item.component

                return (
                  <VTooltip
                    offset={10}
                    transition="slide-y-transition"
                    location="top"
                    v-slots={{
                      activator: ({ props }) => (
                        <VBtn
                          icon
                          key={item.id}
                          rounded="lg"
                          color={item.active ? 'primary' : 'default'}
                          {...props}
                          {...withEventModifiers({
                            onclick: item.action,
                          }, ['stop'])}
                        >
                          <VIcon>{item.icon}</VIcon>
                        </VBtn>
                      ),
                      default: () => <p>{item.name}</p>,
                    }}
                  />
                )
              })}
            </VCardActions>
          </VCard>
        )}
      </VExpandTransition>
    )
  },
})

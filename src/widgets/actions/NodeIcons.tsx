// TODO: support multiple nodes
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { VBtn, VCard, VCardText, VCardTitle, VIcon, VList, VListItem, VListItemSubtitle, VMenu, VTab, VTabs, VVirtualScroll, VWindow, VWindowItem } from 'vuetify/components'
import { mdiEmoticonLolOutline } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { useAppStore } from '@/store/app'
import type { NodeIcon, NodeIconGroup, NodeSticker, NodeStickerGroup } from '@/@types'
import { useMindMap, usePresets } from '@/composables'

export const NodeIcons = defineComponent({
  name: 'NodeIcons',
  setup() {
    const { iconGroupItems, stickerGroupItems } = usePresets()
    const { isActiveNode } = storeToRefs(useAppStore())
    const { activeNodes } = useMindMap()

    const dialog = ref(false)
    const tab = ref(0)
    const tabs = ref<{ id: string, name: string, value: number, items: any }[]>([
      { id: uuid(), name: '图标', value: 0, items: iconGroupItems.value },
      { id: uuid(), name: '贴纸', value: 1, items: stickerGroupItems.value },
    ])

    const currentNodeIcons = ref<string[]>([])
    const currentNodeImage = ref('')

    watchEffect(() => {
      if (isActiveNode.value) {
        currentNodeIcons.value = activeNodes.value![0].getData('icon') || []
        currentNodeImage.value = activeNodes.value![0].getData('image') || ''
      }
      else {
        currentNodeIcons.value = []
        currentNodeImage.value = ''
        dialog.value = false
      }
    })

    const setIcon = (group: string, name: string) => {
      activeNodes.value!.forEach((node) => {
        const icons = [...(node.getData('icon') || [])]
        const key = `${group}_${name}`
        const index = icons.findIndex(item => item === key)

        if (index !== -1) {
          icons.splice(index, 1)
        }
        else {
          const groupIndex = icons.findIndex(item => item.split('_')[0] === group)
          if (groupIndex !== -1)
            icons.splice(groupIndex, 1, key)
          else
            icons.push(key)
        }
        node.setIcon(icons)
        if (activeNodes.value!.length === 1)
          currentNodeIcons.value = icons
      })
    }

    const setImage = (image: { url: string, width: number, height: number }) => {
      activeNodes.value!.forEach((node) => {
        node.setImage({ ...image })
      })
    }

    function IconGroup({ icons, group }: { icons: NodeIcon[] | NodeIconGroup['list'], group: string }) {
      return (
        <div class="d-flex flex-wrap gap-2">
          {icons.map((item) => {
            const key = computed(() => `${group}_${item.name}`)
            const iconActived = computed(() => currentNodeIcons.value.includes(key.value))
            return (
              <VBtn
                size="x-small"
                variant={iconActived.value ? 'outlined' : 'text'}
                color={iconActived.value ? 'primary' : 'default'}
                // @ts-ignore
                onClick={() => {
                  setIcon(group, item.name)
                }}
                data-key={key.value}
                icon
              >
                {item.icon.startsWith('<svg')
                  ? (
                    <VIcon v-html={item.icon} size={24} />
                  )
                  : (
                    <img src={item.icon} width={24} height={24} />
                  )}
              </VBtn>
            )
          })}
        </div>
      )
    }

    function StickerGroup({ stickers }: { stickers: NodeSticker[] | NodeStickerGroup['list'] }) {
      return (
        <div class="d-flex flex-wrap gap-2">
          {stickers.map((item) => {
            const stickerActived = computed(() => currentNodeImage.value === item.url)
            return (
              <VBtn
                size="x-large"
                rounded="lg"
                variant={stickerActived.value ? 'outlined' : 'text'}
                color={stickerActived.value ? 'primary' : 'default'}
                height={item.height}
                // @ts-ignore
                onClick={() => {
                  currentNodeImage.value = item.url
                  setImage({ url: currentNodeImage.value, width: item.width, height: item.height })
                }}
              >
                <img src={item.url} width={item.width / 2} height={item.height / 2} />
              </VBtn>
            )
          })}
        </div>
      )
    }

    return () => (
      <VMenu
        offset={10}
        transition="slide-y-transition"
        location="bottom"
        closeOnContentClick={false}
        v-model={dialog.value}
        v-slots={{
          default: () => {
            return (
              <VCard width={400}>
                <VCardTitle>图标库</VCardTitle>
                <VCardText>
                  <VTabs v-model={tab.value} density="compact" fixedTabs>
                    {tabs.value.map(tab => (
                      <VTab value={tab.value} key={tab.id} text={tab.name} />
                    ))}
                  </VTabs>
                  <VWindow v-model={tab.value}>
                    {tabs.value.map(tab => (
                      <VWindowItem value={tab.value}>
                        <VVirtualScroll
                          items={tab.items}
                          maxHeight={400}
                          v-slots={{
                            default({ index, item }: { index: number, item: any }) {
                              return (
                                <VList density="compact" key={index} nav slim>
                                  <VListItemSubtitle>
                                    {item.name}
                                  </VListItemSubtitle>
                                  <VListItem>
                                    {/* ! 每组分别渲染, 每组图标节点只能选一个 */}
                                    {tab.value ? <StickerGroup stickers={item.list} /> : <IconGroup icons={item.list} group={item.type} />}
                                  </VListItem>
                                </VList>
                              )
                            },
                          }}
                        />
                      </VWindowItem>
                    ))}
                  </VWindow>
                </VCardText>
              </VCard>
            )
          },
          activator: ({ isActive, props }) => (
            <VBtn
              {...props}
              stacked
              disabled={!isActiveNode.value}
              active={isActive}
              color={isActive ? 'primary' : 'default'}
              // @ts-ignore
              onClick={() => { }}
            >
              <VIcon>{mdiEmoticonLolOutline}</VIcon>
              <span>图标</span>
            </VBtn>
          ),
        }}
      />
    )
  },
})

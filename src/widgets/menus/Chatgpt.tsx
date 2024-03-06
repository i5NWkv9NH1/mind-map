import { computed, defineComponent, onMounted, ref } from 'vue'
import { VBtn, VCard, VCardSubtitle, VCardText, VExpandTransition, VIcon } from 'vuetify/components'
import { useMindMap, usePresets } from '@/composables'
import type { MindMapNode, NodeIconGroup } from '@/@types'
import { Logger } from '@/helpers'

export const NodeIconMenu = defineComponent({
  name: 'NodeIconMenu',
  setup() {
    const { mindMap } = useMindMap()
    const { iconGroupItems } = usePresets()

    const isMenuVisible = ref(false)
    const activeNode = ref<MindMapNode | null>()
    const selectedIconName = ref<string>('')
    const selectedIconGroup = ref<NodeIconGroup>()
    const nodeIcons = ref<string[]>([])
    const menuPosition = ref({ top: 0, left: 0 })

    const onUpdatePosition = () => {
      if (!activeNode.value)
        return
      const { x, y, height } = activeNode.value.getRect()
      menuPosition.value.left = x
      menuPosition.value.top = y + height
    }

    const openIconMenu = (_node: MindMapNode, _icon: string) => {
      activeNode.value = _node
      const [type, name] = _icon.split('_')
      selectedIconName.value = name
      nodeIcons.value = _node.getData('icon') as string[]
      selectedIconGroup.value = iconGroupItems.value.find(group => group.type === type)

      onUpdatePosition()
      isMenuVisible.value = true
      Logger.debug(selectedIconGroup.value)
    }

    const closeIconMenu = () => {
      isMenuVisible.value = false
      activeNode.value = null
    }

    const setIcon = (name: string) => {
      const key = `${selectedIconGroup.value!.type}_${name}`
      const index = nodeIcons.value.findIndex(item => item === key)

      if (index !== -1) {
        nodeIcons.value.splice(index, 1)
      }
      else {
        const typeIndex = nodeIcons.value.findIndex((item) => {
          const [type] = item.split('_')
          return selectedIconGroup.value!.type === type
        })

        if (typeIndex !== -1) {
          nodeIcons.value.splice(typeIndex, 1, key)
          selectedIconName.value = name
        }
        else {
          nodeIcons.value.push(key)
        }
      }

      activeNode.value?.setIcon([...nodeIcons.value])
    }

    onMounted(() => {
      mindMap.value?.on('node_icon_click', openIconMenu)
      mindMap.value?.on('node_active', closeIconMenu)
      mindMap.value?.on('onScale', onUpdatePosition)
      mindMap.value?.on('draw_click svg_mousedown node_dblclick', closeIconMenu)
    })

    return () => (
      <VExpandTransition>
        {isMenuVisible.value && (
          <VCard
            style={{ position: 'fixed', left: `${menuPosition.value.left}px`, top: `${menuPosition.value.top}px` }}
            maxWidth={300}
          >
            <VCardSubtitle>{selectedIconGroup.value?.name}</VCardSubtitle>
            <VCardText>
              <div class="d-flex align-center gap-4 flex-wrap fill-width">
                {selectedIconGroup.value?.list.map((item) => {
                  const activeColor = computed(() => selectedIconName.value === item.name ? 'primary' : 'default')
                  const activeVariant = computed(() => selectedIconName.value === item.name ? 'outlined' : 'text')

                  return (
                    <VBtn
                      size="x-small"
                      color={activeColor.value}
                      variant={activeVariant.value}
                      onClick={() => setIcon(item.name)}
                      icon
                    >
                      {item.icon.startsWith('<svg') ? <VIcon v-html={item.icon} size={24} /> : <img src={item.icon} />}
                    </VBtn>
                  )
                })}
              </div>
            </VCardText>
          </VCard>
        )}
      </VExpandTransition>
    )
  },
})

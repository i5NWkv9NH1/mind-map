// ! 点击节点内置的单个图标
// TODO: add custom icons and merge internalicons
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { VBtn, VCard, VCardText, VCardTitle, VExpandTransition, VIcon } from 'vuetify/components'
import { useMindMap, usePresets } from '@/composables'
import type { MindMapNode, NodeIconGroup } from '@/@types'
import { Logger } from '@/helpers'

export const NodeIconContextMenu = defineComponent({
  name: 'NodeIconContextMenu',
  setup() {
    const { mindMap } = useMindMap()
    const { iconGroupItems } = usePresets()

    const isShow = ref(false)
    const _activeNode = ref<MindMapNode | null>()
    // * 当前的图标名
    const iconName = ref<string>('')
    // * 当前选择的图标, 所属的图标组
    const iconGroup = ref<NodeIconGroup>()
    // * 当前节点已设置的图标列表
    // * example: ['group-1 _ 1', 'group-3 _ 4'] - [组_名, 组_名]
    const nodeIcons = ref<string[]>([])

    // * 菜单定位
    const position = reactive({
      top: 0,
      left: 0,
    })

    const onUpdatePosition = () => {
      if (!_activeNode.value)
        return
      const { x, y, height } = _activeNode.value.getRect()
      position.left = x
      position.top = y + height
    }

    const setIcon = (name: string) => {
      const key = `${iconGroup.value!.type}_${name}`
      Logger.debug('key', key)
      const index = nodeIcons.value!.findIndex(item => item === key)
      Logger.debug('index', index)
      if (index !== -1) {
        Logger.warn('index !== -1')
        nodeIcons.value.splice(index, 1)
        Logger.debug('current icons', nodeIcons.value)
      }
      else {
        Logger.warn('index === -1, not exist current node icons')
        const typeIndex = nodeIcons.value!.findIndex((item) => {
          const [type] = item.split('_')
          return iconGroup.value!.type === type
        })
        Logger.debug('typeIndex', typeIndex)
        if (typeIndex !== -1) {
          nodeIcons.value.splice(typeIndex, 1, key)
          iconName.value = name
          Logger.debug('typeIndex exist, remove from node icons')
          Logger.debug('current node icons', nodeIcons.value)
        }
        else {
          Logger.warn('typeIndex not exist')
          nodeIcons.value.push(key)
          Logger.debug('update node icons', nodeIcons.value)
        }
      }
      _activeNode.value?.setIcon([...nodeIcons.value])
    }

    onMounted(() => {
      // # show
      mindMap.value?.on('node_icon_click', (_node: MindMapNode, _icon: string) => {
        // ! 获取当前节点数据
        _activeNode.value = _node
        // * icon name: [group_name]
        const [type, name] = _icon.split('_')
        iconName.value = name
        nodeIcons.value = _node.getData('icon') as string[]
        // # 获取当前所在的图标组
        iconGroup.value = iconGroupItems.value.find(group => group.type === type)
        // ! 当移除图标时, 监听事件更新的数据 iconGroup 会为空
        // ! 此时如果判断 iconGroups 则不继续停留面板
        // if (!iconGroup.value)
        //   return
        onUpdatePosition()
        isShow.value = true
        Logger.debug(iconGroup.value)
      })
      // # render data
      mindMap.value?.on('node_active', (_node: MindMapNode) => {
        // if (isEqual(_node, _activeNode.value))
        //   return
        if (_node === _activeNode.value)
          // return
          isShow.value = false
        // _activeNode.value = null
      })
      // # resize
      mindMap.value?.on('onScale', onUpdatePosition)
      // # close
      mindMap.value?.on('draw_click', () => { isShow.value = false })
      mindMap.value?.on('svg_mousedown', () => { isShow.value = false })
      mindMap.value?.on('node_dblclick', () => { isShow.value = false })
    })

    return () => (
      <VExpandTransition>
        {isShow.value && (
          <VCard
            style={{
              position: 'fixed',
              left: `${position.left}px`,
              top: `${position.top}px`,
            }}
            width={305}
          >
            <VCardTitle>{iconGroup.value?.name}</VCardTitle>
            <VCardText>
              <div class="d-flex align-center gap-4 flex-wrap fill-width">
                {iconGroup.value?.list.map((item) => {
                  const isActive = computed(() => iconName.value === item.name)
                  function RenderIcon() {
                    if (item.icon.startsWith('<svg'))
                      return <VIcon v-html={item.icon} size={24} />
                    return <img src={item.icon} width={24} />
                  }
                  return (
                    <VBtn
                      size="x-small"
                      color={isActive.value ? 'primary' : 'default'}
                      variant={isActive.value ? 'outlined' : 'text'}
                      // @ts-ignore
                      onClick={() => {
                        setIcon(item.name)
                      }}
                      data-key={`${iconGroup.value!.type}_${item.name}`}
                      icon
                    >
                      <RenderIcon />
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

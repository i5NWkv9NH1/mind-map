import { v4 as uuid } from 'uuid'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import { VCode, VList, VListItem, VSlideYTransition } from 'vuetify/components'
import { useMindMap } from '@/composables'
import type { MindMapNode } from '@/@types'

// # 节点菜单
export const NodeContextMenu = defineComponent({
  name: 'NodeContextMenu',
  setup() {
    const { mindMap } = useMindMap()

    // # 节点数据
    // # 通过监听事件获取
    const activeNode = ref<MindMapNode | null>(null)
    // # 菜单禁用状态
    const isRoot = computed(() => activeNode.value?.isRoot)
    const isGeneralization = computed(() => activeNode.value?.isGeneralization)
    // ! 插入同级节点: 非根节点, 非概要节点
    const insertNodeDisabled = computed(() => !activeNode.value || isRoot.value || isGeneralization.value)
    const upMoveNodeDisabled = computed(() => {
      if (!activeNode.value || activeNode.value.isRoot || activeNode.value.isGeneralization)
        return true

      const isFirst
        = activeNode.value.parent.children.findIndex((item) => {
          return item === activeNode.value
        }) === 0
      return isFirst
    })
    const downMoveNodeDisabled = computed(() => {
      if (!activeNode.value || activeNode.value.isRoot || activeNode.value.isGeneralization)
        return true

      const children = activeNode.value.parent.children
      const isLast
        = children.findIndex((item) => {
          return item === activeNode.value
        })
        === children.length - 1
      return isLast
    })
    const hasHyperLink = computed(() => !!activeNode.value?.getData('hyperlink'))
    const hasNote = computed(() => !!activeNode.value?.getData('note'))

    // # 事件状态
    const position = reactive({ top: 0, left: 0, bottom: 0, right: 0 })
    const mouseDown = reactive({ x: 0, y: 0, isMouseDown: true })
    const isShowContextMenu = ref(false)

    // # 事件
    const onShowMenu = (e: PointerEvent, node: MindMapNode) => {
      const { top, left } = toRefs(position)
      left.value = e.clientX + 10
      top.value = e.clientY + 10
      isShowContextMenu.value = true
      activeNode.value = node
      // TODO: 关闭画布菜单
    }
    const onHiddenMenu = () => {
      isShowContextMenu.value = false
      const { top, left } = toRefs(position)
      left.value = 0
      top.value = 0
    }
    const onMouseDown = (e: MouseEvent) => {
      if (e.which !== 3)
        return
      const { x, y, isMouseDown } = toRefs(mouseDown)
      x.value = e.clientX
      y.value = e.clientY
      isMouseDown.value = true
    }
    const onMouseUp = (e: MouseEvent) => {
      const { x, y, isMouseDown } = toRefs(mouseDown)
      if (!isMouseDown.value)
        return
      isMouseDown.value = false
      if (
        Math.abs(x.value - e.clientX) > 3
        || Math.abs(y.value - e.clientY) > 3
      )
        onHiddenMenu()

      // * show MindMapContextMenu
    }

    // # 绑定事件
    onMounted(() => {
      if (!mindMap.value) {
        // !
      }
      mindMap.value?.on('node_contextmenu', onShowMenu)
      mindMap.value?.on('node_click', onHiddenMenu)
      mindMap.value?.on('draw_click', onHiddenMenu)
      mindMap.value?.on('expand_btn_click', onHiddenMenu)
      mindMap.value?.on('svg_mousedown', onMouseDown)
      mindMap.value?.on('mouseup', onMouseUp)
    })

    onBeforeUnmount(() => {
      // mindMap.value?.on('node_click', onHiddenMenu)
      // mindMap.value?.on('draw_click', onHiddenMenu)
      // mindMap.value?.on('expand_btn_click', onHiddenMenu)
      // mindMap.value?.on('svg_mousedown', onMouseDown)
      // mindMap.value?.on('mouseup', onMouseUp)
    })

    const items = computed(() => {
      if (true) {
        return [
          { id: uuid(), name: '插入同级节点', color: 'default', disabled: insertNodeDisabled.value, hidden: false, shortKey: 'Enter', action: () => { mindMap.value?.execCommand('INSERT_NODE') } },
          { id: uuid(), name: '插入子级节点', color: 'default', disabled: isGeneralization.value, hidden: false, shortKey: 'Tab', action: () => mindMap.value?.execCommand('INSERT_CHILD_NODE') },
          { id: uuid(), name: '插入父级节点', color: 'default', disabled: insertNodeDisabled.value, hidden: false, shortKey: 'Shift + Tab', action: () => mindMap.value?.execCommand('INSERT_PARENT_NODE') },
          { id: uuid(), name: '插入概要', color: 'default', disabled: insertNodeDisabled.value, hidden: false, shortKey: 'Ctrl + G', action: () => mindMap.value?.execCommand('ADD_GENERALIZATION') },
          { id: uuid(), name: '上移节点', color: 'default', disabled: upMoveNodeDisabled.value, hidden: false, shortKey: 'Ctrl + ↑', action: () => mindMap.value?.execCommand('UP_NODE') },
          { id: uuid(), name: '下移节点', color: 'default', disabled: downMoveNodeDisabled.value, hidden: false, shortKey: 'Ctrl + ↓', action: () => mindMap.value?.execCommand('DOWN_NODE') },
          { id: uuid(), name: '删除节点', color: 'error', disabled: false, hidden: false, shortKey: 'Delete', action: () => mindMap.value?.execCommand('REMOVE_NODE') },
          { id: uuid(), name: '仅删除节点', color: 'error', disabled: false, hidden: false, shortKey: 'Shift + Backspace', action: () => mindMap.value?.execCommand('REMOVE_CURRENT_NODE') },
          { id: uuid(), name: '复制节点', color: 'default', disabled: isGeneralization.value, hidden: false, shortKey: 'Ctrl + C', action: () => mindMap.value?.renderer.copy() },
          { id: uuid(), name: '剪切节点', color: 'default', disabled: isGeneralization.value, hidden: false, shortKey: 'Ctrl + X', action: () => mindMap.value?.renderer.cut() },
          { id: uuid(), name: '粘贴节点', color: 'default', disabled: false, hidden: false, shortKey: 'Ctrl + V', action: () => mindMap.value?.renderer.paste() },
          { id: uuid(), name: '一键去除自定义样式', color: 'default', disabled: false, hidden: false, shortKey: '', action: () => activeNode.value?.setHyperlink('', '') },
          { id: uuid(), name: '移除超链接', color: 'default', disabled: !hasHyperLink.value, hidden: false, shortKey: '', action: () => activeNode.value?.setNote('') },
          { id: uuid(), name: '移除备注', color: 'default', disabled: !hasNote.value, hidden: false, shortKey: '', action: () => activeNode.value?.setNote('') },
        ]
      }
    })

    return () => (
      <VSlideYTransition>
        {isShowContextMenu.value
          ? (
            <VList
              density="compact"
              width={240}
              style={{
                position: 'fixed',
                left: `${position.left}px`,
                top: `${position.top}px`,
                zIndex: 2,
              }}
              lines="one"
              rounded="lg"
              nav
              slim
            >
              {items.value.map(item => (
                !item.hidden && (
                  <VListItem
                    onClick={() => {
                      item.action()
                      isShowContextMenu.value = false
                    }}
                    title={item.name}
                    class={`text-${item.color}`}
                    disabled={item.disabled}
                    v-slots={{
                      append: () => item.shortKey ? <VCode class="text-caption">{item.shortKey}</VCode> : <></>,
                    }}
                  />
                )
              ))}
            </VList>
            )
          : <div />}
      </VSlideYTransition>
    )
  },
})

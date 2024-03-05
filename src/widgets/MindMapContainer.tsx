import { defineComponent, onMounted, ref, watch } from 'vue'
import './MindMapContainer.scss'

// ! plugins
import { storeToRefs } from 'pinia'
import MindMap from 'simple-mind-map'
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
import Drag from 'simple-mind-map/src/plugins/Drag.js'
import Export from 'simple-mind-map/src/plugins/Export.js'
import Formula from 'simple-mind-map/src/plugins/Formula.js'
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js'
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js'
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust.js'
import Painter from 'simple-mind-map/src/plugins/Painter.js'
import RichText from 'simple-mind-map/src/plugins/RichText.js'
import Search from 'simple-mind-map/src/plugins/Search.js'
import Select from 'simple-mind-map/src/plugins/Select.js'
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'
import { nodeRichTextToTextWithWrap } from 'simple-mind-map/src/utils'
import { useAppStore } from '@/store/app'
import { SimplePlugin } from '@/plugins/mindmap'
import { useMindMap, usePresets } from '@/composables'
import { StateLogger } from '@/helpers'

export const MindMapContainer = defineComponent({
  name: 'MindMapContainer',
  setup() {
    const { mindMapData, getRoot, activeNode, activeNodes, canUnod, canRedo } = storeToRefs(useAppStore())
    const { exampleData, customThemes } = usePresets()
    const MindMapEl = ref<HTMLElement | null>(null)
    const { mindMap } = useMindMap()

    mindMapData.value.root = {
      data: {
        text: 'Root',
      },
      children: [],
    }
    mindMapData.value.layout = exampleData.value.layout
    mindMapData.value.theme = exampleData.value.theme
    mindMapData.value.view = null
    mindMapData.value.theme.template = 'default'

    onMounted(() => {
      // # plugins
      // ! pinia persist not support html
      MindMap.usePlugin(RichText)
      MindMap.usePlugin(AssociativeLine)
      MindMap.usePlugin(Select)
      MindMap.usePlugin(Drag)
      MindMap.usePlugin(KeyboardNavigation)
      MindMap.usePlugin(Export)
      MindMap.usePlugin(MiniMap)
      MindMap.usePlugin(Watermark)
      MindMap.usePlugin(TouchEvent)
      MindMap.usePlugin(NodeImgAdjust)
      MindMap.usePlugin(Search)
      MindMap.usePlugin(Painter)
      // ! 节点无法自由拖拽
      // MindMap.usePlugin(Scrollbar)
      MindMap.usePlugin(Formula)
      MindMap.usePlugin(SimplePlugin)

      customThemes.value.forEach((item) => {
        MindMap.defineTheme(item.value, item.theme)
      })

      if (MindMapEl.value) {
        mindMap.value = new MindMap({
          // @ts-ignore
          el: MindMapEl.value,
          data: mindMapData.value.root,
          fit: false,
          layout: mindMapData.value.layout,
          theme: mindMapData.value.theme.template,
          themeConfig: mindMapData.value.theme.config,
          viewData: mindMapData.value.view,
          nodeTextEditZIndex: 1000,
          nodeNoteTooltipZIndex: 1000,
          defaultNodeImage: '/img/图片加载失败.svg',
          ...(mindMapData.value.config || {}),
          useLeftKeySelectionRightKeyDrag: false,
          customInnerElsAppendTo: null,
          enableAutoEnterTextEditWhenKeydown: true,
          initRootNodePosition: ['center', 'center'],
          errorHandler: (code: string | 'export_error', _error) => {
            switch (code) {
              case 'export_error': {
                break
              }
              default: {
                break
              }
            }
          },
          handleIsSplitByWrapOnPasteCreateNewNode: () => { },
        })
        // # 注册完毕

        watch(getRoot, () => {
        }, { immediate: true })
        // * 视图更新频繁
        // watch(getView, () => {
        //   WatchLogger.debug('view 数据已更新', getRoot.value)
        // })
        /**
         * # 渲染树数据变化，可以监听该方法获取最新数据
         * # data: MindMapData.root
         */
        mindMap.value?.on('data_change', (rootData: any) => {
          rootData.root = true
          const walk = (root: any) => {
            const text = (root.data.richText ? nodeRichTextToTextWithWrap(root.data.text) : root.data.text).replaceAll(/\n/g, '<br>')
            root.textCache = text
            root.label = text
            root.uid = root.data.uid
            if (root.children && root.children.length > 0) {
              root.children.forEach((item: any) => {
                walk(item)
              })
            }
          }
          walk(rootData)
          // TODO: update to store
          mindMapData.value.root = rootData
        })
        /**
         * # 视图变化数据，比如拖动或缩放时会触发
         * # view: 当前视图状态数据
         */
        mindMap.value?.on('view_data_change', (view: any) => {
          mindMapData.value.view = view
        })
        /**
         * # 前进或回退
         * # activeHistoryIndex（当前在历史数据数组里的索引）、length（当前历史数据数组的长度）
         */
        mindMap.value?.on('back_forward', (index: number, length: number) => {
          canUnod.value = index <= 0
          canRedo.value = index >= length - 1
        })
        /**
         * # 画布的单击事件
         * # e: PointerEvent
         */
        mindMap.value?.on('draw_click', (_p: PointerEvent) => {
        })
        /**
         * # svg画布的鼠标按下事件
         * # e: MouseEvent
         */
        mindMap.value?.on('svg_mousedown', (_m: MouseEvent) => {
        })
        /**
         * # el元素的鼠标按下事件
         * # e: MouseEvent
         * # _: Event
         */
        mindMap.value?.on('mousedown', (_m: MouseEvent, _e: Event) => {
        })
        /**
         * # el元素的鼠标移动事件
         * # e: MouseEvent
         * # _: Event
         */
        mindMap.value?.on('mousemove', (_m: MouseEvent, _e: Event) => {
        })
        /**
         * # svg 画布的鼠标右键菜单事件
         * # e: PointeEvent
         */
        mindMap.value?.on('contextmenu', (_p: PointerEvent) => {
        })
        /**
         * # 节点的单击事件
         * # node: any
         * # e: PointerEvent
         */
        mindMap.value?.on('node_click', (_node: any, _p: PointerEvent) => {
        })
        /**
         * # 节点的鼠标按下事件
         * # node: any
         * # e: MouseEvent
         */
        mindMap.value?.on('node_mousedown', (_node: any, _e: MouseEvent) => { })
        /**
         * # 节点的鼠标松开事件
         * # node: any
         * # e: MouseEvent
         */
        mindMap.value?.on('node_mouseup', (_node: any, _m: MouseEvent) => {
        })
        /**
         * # 节点的双击事件
         * # node: any
         * # e: MouseEvent
         */
        mindMap.value?.on('node_dblclick', (_node: any, _m: MouseEvent) => {
        })
        /**
         * # 节点的右键菜单事件
         * # e: MouseEvent
         * # node: any
         */
        mindMap.value?.on('node_contextmenu', (_: PointerEvent, _node: any) => {
        })
        /**
         * # 节点的鼠标移入事件
         * # node: any
         * # e: MouseEvent
         */
        mindMap.value?.on('node_mouseenter', (_node: any, _m: MouseEvent) => {
        })
        /**
         * # 节点的鼠标移出事件
         * # node: any
         * # e: MouseEvent
         */
        mindMap.value?.on('node_mouseleave', (_node: any, _m: MouseEvent) => {
        })
        /**
         * # 节点激活前事件
         * # node: any
         * # items: any[]
         */
        mindMap.value?.on('before_node_active', (_node: any, _items: any[]) => {
        })
        /**
         * # 节点激活事件
         * # node: any 节点实例
         * # items: any[] 当前激活的所有节点列表
         */
        mindMap.value?.on('node_active', (node: any, nodes: any[]) => {
          StateLogger.info('node active update')
          activeNode.value = node
          activeNodes.value = nodes
        })
        /**
         * # 节点展开或收缩事件
         * # node: any 节点实例
         */
        mindMap.value?.on('expand_btn_click', (_node: any) => { })
        /**
         * # 节点文本编辑框即将打开事件
         */
        mindMap.value?.on('before_show_text_edit', () => {
        })
        /**
         * # 节点文本编辑框关闭事件
         * # node: any 节点实例
         * # items: any[] 当前激活的所有节点列表
         */
        mindMap.value?.on('hide_text_edit', (_node: any, _items: any) => {
        })
        /**
         * # 放大缩小事件
         * # scale: number 缩放比例
         */
        mindMap.value?.on('scale', (_scale: number) => {
        })
        /**
         * TODO: not work
         * # 节点内图片的双击事件
         * # node: any
         * # e: MouseEvent
         */
        mindMap.value?.on('node_img_dblick', (_node: any, _m: MouseEvent) => {
        })
        /**
         * # 节点内图片的鼠标移入事件
         * # node: any
         * # e: MouseEvent
         */
        mindMap.value?.on('node_img_mouseenter', (_node: any, _m: MouseEvent) => { })
        /**
         * # 节点内图片的鼠标移出事件
         * # node: any
         * # e: MouseEvent
         */
        mindMap.value?.on('node_img_mouseleave', (_node: any, _m: MouseEvent) => { })
        /**
         * # 节点内图片的鼠标移动事件
         * # node: any
         * # e: MouseEvent
         */
        mindMap.value?.on('node_img_mousemove', (_node: any, _m: MouseEvent) => { })
        /**
         * # 节点树渲染完毕事件
         */
        mindMap.value?.on('node_tree_render_end', () => {

        })
        /**
         * # 当注册了 RichText 插件时可用。当节点编辑时，文本选区发生改变时触发
         * # args: RichTextSelectionChange
         * # hasRange（是否存在选区）
         * # rectInfo（选区的尺寸和位置信息）
         * # formatInfo（选区的文本格式化信息）
         */
        mindMap.value?.on('rich_text_selection_change', (_hasRange: boolean, _rectInfo: any, _formatInfo: any) => {
        })
        /**
         * # 当注册了RichText插件时可用。当svg中存在DOM节点时，导出为图片时会将DOM节点转换为图片，转换过程中会触发该事件，可用通过该事件给用户提示，告知目前转换到的节点
         * # index: （当前转换到的节点索引）
         * # length: （一共需要转换的节点数量）
         */
        mindMap.value?.on('transforming-dom-to-images', (_index: number, _length: number) => {
        })
        /**
         * # 当某个节点被拖拽时触发
         * # node: any
         */
        mindMap.value?.on('node_dragging', (_node: any) => {
        })
        /**
         * # 节点被拖拽结束时触发
         * # { overlapNodeUid, prevNodeUid, nextNodeUid }（本次节点移动到的节点uid，比如本次移动到了节点A上，那么overlapNodeUid就是节点A的uid，如果移动到了B节点的前面，那么nextNodeUid就是节点B的uid，你可以通过mindMap.renderer.findNodeByUid(uid)方法来获取节点实例）
         */
        mindMap.value?.on('node_dragend', (_dragData: any) => {
        })

        // # 显示节点图片
        mindMap.value?.on('showNodeImage', (_: any) => {
        })
      }
    })

    return () => (
      <div
        id="MindMapContainer"
      >
        <div id="MindMap" ref={MindMapEl} />
        {/* # 工具栏 */}
      </div>
    )
  },
})

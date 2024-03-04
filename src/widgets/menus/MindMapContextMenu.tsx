import type { MindMapNode } from "@/@types";
import { useAppStore } from "@/store/app";
import { mdiCrosshairsGps, mdiFitToPageOutline, mdiFormatClear, mdiImageFilterCenterFocusStrong, mdiImageFilterCenterFocusStrongOutline, mdiMenuDown, mdiMenuUp, mdiRomanNumeral1, mdiRomanNumeral2, mdiRomanNumeral3, mdiRomanNumeral4, mdiRomanNumeral5, mdiRomanNumeral6, mdiUnfoldMoreVertical, mdiVectorArrangeBelow } from '@mdi/js';
import { storeToRefs } from "pinia";
import { v4 as uuid } from 'uuid';
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { VCode, VList, VListItem, VMenu, VScrollYTransition } from 'vuetify/components';

// # 画布菜单
export const MindMapContextMenu = defineComponent({
  name: 'MindMapContextMenu',
  setup() {
    const { mindMap, isZenMode } = storeToRefs(useAppStore())

    // # 节点数据
    // # 通过监听事件获取
    const activeNode = ref<MindMapNode | null>(null)

    const position = reactive({ top: 0, left: 0, bottom: 0, right: 0 })
    const mouseDown = reactive({ x: 0, y: 0, isMouseDown: true })
    const isShowContextMenu = ref(false)

    // # 事件
    const onShowMenu = (e: MouseEvent) => {
      const { top, left, bottom, right } = toRefs(position)
      left.value = e.clientX + 10
      top.value = e.clientY + 10
      isShowContextMenu.value = true
      // TODO: 关闭节点菜单
    }
    const onHiddenMenu = () => {
      isShowContextMenu.value = false
      const { top, left } = toRefs(position)
      left.value = 0
      top.value = 0
    }
    const onMouseDown = (e: MouseEvent) => {
      if (e.which !== 3) return
      const { x, y, isMouseDown } = toRefs(mouseDown)
      x.value = e.clientX
      y.value = e.clientY
      isMouseDown.value = true
    }
    const onMouseUp = (e: MouseEvent) => {
      const { x, y, isMouseDown } = toRefs(mouseDown)
      if (!isMouseDown.value) return
      isMouseDown.value = false
      if (
        Math.abs(x.value - e.clientX) > 3 ||
        Math.abs(y.value - e.clientY) > 3
      ) {
        onHiddenMenu()
        return
      }
      // * show MindMapContextMenu
      onShowMenu(e)
    }

    onMounted(() => {
      mindMap.value?.on('draw_click', onHiddenMenu)
      mindMap.value?.on('expand_btn_click', onHiddenMenu)
      mindMap.value?.on('svg_mousedown', onMouseDown)
      mindMap.value?.on('mouseup', onMouseUp)
    })

    const items = computed(() => {
      if (true) return [
        { id: uuid(), name: '回到根节点', icon: mdiCrosshairsGps, shortKey: 'Ctrl + Enter', action: () => mindMap.value?.renderer.setRootNodeCenter() },
        { id: uuid(), name: '展开所有', icon: mdiMenuDown, shortKey: '', action: () => mindMap.value?.execCommand('EXPAND_ALL') },
        { id: uuid(), name: '收起所有', icon: mdiMenuUp, shortKey: '', action: () => mindMap.value?.execCommand('UNEXPAND_ALL') },
        {
          id: uuid(), name: '展开到', icon: mdiUnfoldMoreVertical, children: [
            { id: uuid(), name: '一级主题', icon: mdiRomanNumeral1, shortKey: '', action: () => mindMap.value?.execCommand('UNEXPAND_TO_LEVEL', 1) },
            { id: uuid(), name: '二级主题', icon: mdiRomanNumeral2, shortKey: '', action: () => mindMap.value?.execCommand('UNEXPAND_TO_LEVEL', 2) },
            { id: uuid(), name: '三级主题', icon: mdiRomanNumeral3, shortKey: '', action: () => mindMap.value?.execCommand('UNEXPAND_TO_LEVEL', 3) },
            { id: uuid(), name: '四级主题', icon: mdiRomanNumeral4, shortKey: '', action: () => mindMap.value?.execCommand('UNEXPAND_TO_LEVEL', 4) },
            { id: uuid(), name: '五级主题', icon: mdiRomanNumeral5, shortKey: '', action: () => mindMap.value?.execCommand('UNEXPAND_TO_LEVEL', 5) },
            { id: uuid(), name: '六级主题', icon: mdiRomanNumeral6, shortKey: '', action: () => mindMap.value?.execCommand('UNEXPAND_TO_LEVEL', 6) },
          ]
        },
        { id: uuid(), name: '一键整理画布', icon: mdiVectorArrangeBelow, shortKey: 'Ctrl + L', action: () => mindMap.value?.execCommand('RESET_LAYOUT') },
        { id: uuid(), name: '适应画布', icon: mdiFitToPageOutline, shortKey: 'Ctrl + i', action: () => mindMap.value?.view.fit() },
        { id: uuid(), name: '专注模式', icon: isZenMode.value ? mdiImageFilterCenterFocusStrong : mdiImageFilterCenterFocusStrongOutline, shortKey: '', action: () => { isZenMode.value = !isZenMode.value; mindMap.value?.updateConfig({ isZenMode: isZenMode.value }) }, isActived: isZenMode.value },
        { id: uuid(), name: '一键去除所有节点自定义样式', icon: mdiFormatClear, shortKey: '', action: () => mindMap.value?.execCommand('REMOVE_ALL_NODE_CUSTOM_STYLES') },
      ]
    })

    return () => (
      <VScrollYTransition>
        {isShowContextMenu.value ? <VList density={'compact'} width={240} style={{
          position: 'fixed',
          left: position.left + 'px',
          top: position.top + 'px',
          zIndex: 2
        }} lines={'one'} rounded={'lg'} nav slim>
          {items.value.map(item => {
            if (item.children) {
              return (
                <>
                  <VMenu
                    offset={10}
                    location={'right bottom'}
                    transition={'slide-x-transition'}
                    openOnHover
                    openDelay={0}
                    v-slots={{
                      activator: ({ isActive, props }) => (
                        <VListItem prependIcon={item.icon} {...props} title={item.name} class={'cursor-pointer'} active={isActive} />
                      ),
                      default: () => (
                        <VList density={'compact'} rounded={'lg'} nav slim>
                          {item.children.map(sub => (
                            <VListItem onClick={() => {
                              sub.action();
                              isShowContextMenu.value = false;
                            }} prependIcon={sub.icon} title={sub.name} v-slots={{
                              append: () => sub.shortKey ? <VCode class={'text-caption'}>{item.shortKey}</VCode> : <></>
                            }} />
                          ))}
                        </VList>
                      )
                    }}
                  />
                </>
              )
            } else {
              return (
                <VListItem onClick={() => {
                  item.action();
                  isShowContextMenu.value = false;
                }} prependIcon={item.icon} title={item.name} active={item.isActived} v-slots={{
                  append: () => item.shortKey ? <VCode class={'text-caption'}>{item.shortKey}</VCode> : <></>
                }} />
              )
            }
          })}
        </VList> : <div />}
      </VScrollYTransition>
    )
  }
})

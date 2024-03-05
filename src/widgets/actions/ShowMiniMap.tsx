// TODO: 优化
// TODO: 使用 Teleport 解决 ·专注模式· 下地图隐藏的问题
import { mdiMapMarkerOffOutline, mdiMapMarkerOutline } from '@mdi/js'
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs } from 'vue'
import { VBtn, VCard, VIcon, VSlideXReverseTransition, VTooltip } from 'vuetify/components'
import { withEventModifiers } from '@/directives'
import { useMindMap } from '@/composables'

export const ShowMiniMap = defineComponent({
  name: 'ShowMiniMap',
  setup() {
    const isMiniMapShow = ref(false)
    // ! vuetify component not is pure element
    const miniMapEl = ref<{ $el: HTMLElement }>()
    const { mindMap } = useMindMap()
    const timer = ref<NodeJS.Timeout>()
    const setSizeTimer = ref<NodeJS.Timeout>()

    const width = ref(0)
    const miniMapImage = ref('')
    const _miniMapStyles = reactive({
      width: 0,
      height: 0,
    })
    const _svgStyles = ref({
      scale: 0,
      left: 0,
      top: 0,
    })
    const _viewBoxStyle = ref({})

    const init = () => {
      const el = miniMapEl.value?.$el.getBoundingClientRect()
      const { width, height } = toRefs(_miniMapStyles)
      width.value = el!.width
      height.value = el!.height
    }

    const drawMiniMapUI = () => {
      const { width, height } = toRefs(_miniMapStyles)
      const { getImgUrl, viewBoxStyle, miniMapBoxScale, miniMapBoxLeft, miniMapBoxTop } = mindMap.value?.miniMap.calculationMiniMap(width.value, height.value)

      getImgUrl((img: string) => miniMapImage.value = img)
      _viewBoxStyle.value = viewBoxStyle
      _svgStyles.value.scale = miniMapBoxScale
      _svgStyles.value.left = miniMapBoxLeft
      _svgStyles.value.top = miniMapBoxTop
    }

    const setSize = () => {
      clearTimeout(setSizeTimer.value)
      setSizeTimer.value = setTimeout(() => {
        // * 计算地图卡片容器尺寸
        width.value = Math.min(window.innerWidth - 80, 370)
        nextTick(() => {
          if (isMiniMapShow.value) {
            init()
            drawMiniMapUI()
          }
        })
      })
    }

    const toggleMiniMap = () => {
      if (isMiniMapShow.value) {
        isMiniMapShow.value = false
        return
      }
      isMiniMapShow.value = true
      nextTick(() => {
        if (miniMapEl.value) {
          init()
          drawMiniMapUI()
        }
      })
    }

    const onDataChange = async () => {
      if (!isMiniMapShow.value)
        return
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        drawMiniMapUI()
      }, 500)
    }
    const onMousedown = (e: MouseEvent) => {
      mindMap.value?.miniMap.onMousemove(e)
    }
    const onMouseup = (e: MouseEvent) => {
      mindMap.value?.miniMap.onMousemove(e)
    }
    const onMouseMove = (e: MouseEvent) => {
      mindMap.value?.miniMap.onMousemove(e)
    }

    onMounted(() => {
      setSize()
      mindMap.value?.on('data_change', onDataChange)
      mindMap.value?.on('view_data_change', onDataChange)
      mindMap.value?.on('node_tree_render_end', onDataChange)
    })

    return () => (
      <>
        <VSlideXReverseTransition>
          {isMiniMapShow.value && (
            <VCard
              ref={miniMapEl}
              position="fixed"
              height={200}
              class="pa-4"
              style={{ width: `${width.value}px`, bottom: `5rem`, right: `4.375rem`, userSelect: 'none', zIndex: 2 }}
              // //@ts-ignore
              // onMousedown={withMemo(onMousedown, ['mousedown'])}
              // //@ts-ignore
              // onMouseup={withKeys(onMouseup, ['mouseup'])}
              // onMouseMove={withKeys(onMouseMove, ['mousemove'])}
              {...withEventModifiers({
                onMousedown,
                onMouseMove,
                onMouseup,
              }, [])}
            >
              <div
                class="svg-box"
                style={{
                  position: 'absolute',
                  transform: `scale(${_svgStyles.value.scale})`,
                  left: `${_svgStyles.value.left}px`,
                  top: `${_svgStyles.value.top}px`,
                  transformOrigin: 'left top',
                }}
              >
                {miniMapImage.value && (
                  <img
                    src={miniMapImage.value}
                    {...withEventModifiers({
                      onmousedown: () => { },
                    }, ['prevent'])}
                  />
                )}
              </div>
              <div class="view-box" style={{ ..._viewBoxStyle.value, position: 'absolute', border: '2px solid red', transition: 'all .3s' }}></div>
            </VCard>
          )}
        </VSlideXReverseTransition>
        <VTooltip
          transition="slide-y-transition"
          offset={10}
          openDelay={100}
          location="top"
          v-slots={{
            activator: ({ props }: { props: any }) => (
              <VBtn
                {...props}
                active={isMiniMapShow.value}
                color={isMiniMapShow.value ? 'primary' : 'default'}
                onClick={() => toggleMiniMap()}
                icon
              >
                <VIcon>{isMiniMapShow.value ? mdiMapMarkerOffOutline : mdiMapMarkerOutline}</VIcon>
              </VBtn>
            ),
            default: () => (
              <p>
                {isMiniMapShow.value ? '关闭小地图' : '开启小地图'}
              </p>
            ),
          }}
        />
      </>
    )
  },
})

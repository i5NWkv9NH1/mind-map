import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { defineComponent, ref } from 'vue'
import { VSlideYTransition, VToolbar } from 'vuetify/components'
import { EditOrReadonlySwitch, FeedBack, FullScreenEdit, FullScreenView, MindMapReRender, MouseBehavior, Position, Scale, SearchNodes, ShowMiniMap, Stats, ThemeSwitch } from '../actions'
import { useAppStore } from '@/store/app'
import './BottomBar.scss'

export const BottomBar = defineComponent({
  name: 'BottomBar',
  setup() {
    const { mindMapConfig } = storeToRefs(useAppStore())

    const defaultActions = ref([
      { id: uuid(), component: <Position /> },
      { id: uuid(), component: <ThemeSwitch /> },
      { id: uuid(), component: <Scale /> },
      { id: uuid(), component: <SearchNodes /> },
      { id: uuid(), component: <ShowMiniMap /> },
      { id: uuid(), component: <EditOrReadonlySwitch /> },
      { id: uuid(), component: <FullScreenView /> },
      { id: uuid(), component: <FullScreenEdit /> },
    ])
    const extendActions = ref([
      { id: uuid(), component: <MouseBehavior /> },
      { id: uuid(), component: <Stats /> },
      { id: uuid(), component: <MindMapReRender /> },
      { id: uuid(), component: <FeedBack /> },
    ])

    return () => (
      <VSlideYTransition>
        {!mindMapConfig.value.isZenMode
          ? (
            <VToolbar
              class="bottom-bar"
              tag="footer"
              elevation={8}
              v-slots={{
                default: () => (
                  <>
                    {defaultActions.value.map(item => item.component)}
                  </>
                ),
                extension: () => (
                  <>
                    {extendActions.value.map(item => item.component)}
                  </>
                ),
              }}
            />
          )
          : <div />}
      </VSlideYTransition>
    )
  },
})

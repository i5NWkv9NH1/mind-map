import { v4 as uuid } from "uuid";
import { defineComponent, ref } from "vue";
import { VContainer, VSlideYTransition, VToolbar } from "vuetify/components";
import { EditOrReadonlySwitch, FullScreenEdit, FullScreenView, MouseBehavior, Position, Scale, SearchNodes, ShowMiniMap, Stats, ThemeSwitch } from "../actions";
import './BottomBar.scss';
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app";

export const BottomBar = defineComponent({
  name: 'BottomBar',
  setup() {
    const { isZenMode } = storeToRefs(useAppStore())

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
    ])

    return () => (
      <VSlideYTransition>
        {!isZenMode.value ? <VToolbar
          class={'bottom-bar'}
          tag={'footer'}
          elevation={8}
          v-slots={{
            default: () => <>
              {defaultActions.value.map(item => item.component)}
              {extendActions.value.map(item => item.component)}
            </>,
          }}
        /> : <div />}
      </VSlideYTransition>
    )
  }
})

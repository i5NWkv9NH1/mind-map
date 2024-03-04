import { mdiBlockHelper, mdiHeart } from '@mdi/js';
import { computed, defineComponent, ref } from "vue";
import { VBtn, VIcon, VNavigationDrawer, VSlideXTransition } from 'vuetify/lib/components/index.mjs';
export const Drawer = defineComponent({
  name: 'Drawer',
  setup() {
    const current = ref(1)
    function one() {
      return <VIcon>{mdiHeart}</VIcon>
    }
    function two() {
      return <VIcon>{mdiBlockHelper}</VIcon>
    }
    const component = computed(() => {
      switch (current.value) {
        case 1:
          return one()
        case 2:
          return two()
        default:
          return one()
      }
    })

    return () => <VNavigationDrawer
      location="right"
      permanent
      width="300"
    >
      {Array.from({ length: 3 }).map((item, index) => (
        <VBtn
          //@ts-ignore
          onClick={() => current.value = index + 1}
        >{item}</VBtn>
      ))}
      <VSlideXTransition>
        {component.value}
      </VSlideXTransition>
    </VNavigationDrawer>
  }
})

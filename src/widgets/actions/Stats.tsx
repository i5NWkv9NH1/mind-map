import { defineComponent, ref } from "vue";

export const Stats = defineComponent({
  name: 'Stats',
  setup() {
    const words = ref(100)
    const nodes = ref(40)

    return () => (
      <div class={'px-4 d-flex align-center gap-4'}>
        <div>
          <span>字数：</span>
          <span>{{ words }}</span>
        </div>
        <div>
          <span>节点数：</span>
          <span>{{ nodes }}</span>
        </div>
      </div>
    )
  }
})

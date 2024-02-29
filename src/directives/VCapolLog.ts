import type { Directive, DirectiveBinding, DirectiveHook } from 'vue'
import { debounce } from 'lodash'

// # 元素上绑定的
export type Arguments = Record<string, any>

export const VCapolLog: Directive<HTMLElement, Arguments> = {
  mounted(el, binding) {
    function handleClick(el: HTMLElement, binding: DirectiveBinding<Arguments>, event: Event) {
      const idFlag = binding.modifiers.idFlag ? 1 : 0
      const data = binding.value
      const payload = { idFlag, ...data }
      // # api
      console.info(payload)
    }

    function wrapper(event: Event) {
      return handleClick(el, binding, event)
    }

    el.addEventListener('click', (e: Event) => debounce(wrapper, 300))
    // e.handleClick = handleClick
  },
  unmounted(el, binding) {
    // const handleClick = el.handleClick
    el.removeEventListener('click', el.click)
    // delete e.handleClick
  }
}

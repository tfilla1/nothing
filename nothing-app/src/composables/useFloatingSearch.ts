import { ref } from "vue"

const visible = ref(false)
export default function useFloatingSearch() {
  const show = () => visible.value = true
  const hide = () => visible.value = false
  const toggle = () => visible.value = !visible.value

  return {
    visible,
    show,
    hide,
    toggle
  }
}

import { Toast } from 'vant'
import { h } from 'vue'
import { createDetachedRenderer } from '../__builtins__/shared/popup-runtime'

export function startOpenLoading(loadingText = 'Loading...') {
  const renderer = createDetachedRenderer('FormPopupLoading', ({ visible }: { visible: boolean }) => h(Toast, {
    show: visible,
    type: 'loading',
    message: loadingText,
    duration: 0,
    forbidClick: true,
  }))
  const timer = setTimeout(() => renderer.render({}, true), 100)

  return () => {
    clearTimeout(timer)
    renderer.dispose()
  }
}

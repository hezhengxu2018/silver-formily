import type { TreeNode } from '@silver-formily/designer-core'
import type { Ref } from 'vue'
import { CursorStatus, ScreenStatus } from '@silver-formily/designer-core'
import { nextTick, shallowRef, watch } from 'vue'
import { LayoutObserver } from './observer'
import { useDesigner } from './useDesigner'
import { useViewport } from './useViewport'

interface NodeOffsetRect {
  height: number
  width: number
  x: number
  y: number
}

export function useValidNodeOffsetRect(nodeRef: Ref<TreeNode | null>) {
  const designerRef = useDesigner()
  const viewportRef = useViewport()
  const rectRef = shallowRef<NodeOffsetRect | null>(null)
  let frame: number | null = null

  function isEqualRect(rect1?: Partial<NodeOffsetRect> | null, rect2?: Partial<NodeOffsetRect> | null) {
    return (
      rect1?.x === rect2?.x
      && rect1?.y === rect2?.y
      && rect1?.width === rect2?.width
      && rect1?.height === rect2?.height
    )
  }

  function shouldUpdateRect() {
    const engine = designerRef.value
    if (!engine)
      return true
    return !(
      engine.cursor.status !== CursorStatus.Normal
      && engine.screen.status === ScreenStatus.Normal
    )
  }

  function updateRect() {
    if (!shouldUpdateRect())
      return

    const node = nodeRef.value
    const viewport = viewportRef.value
    const nextRect = node && viewport
      ? viewport.getValidNodeOffsetRect(node) ?? null
      : null

    if (!isEqualRect(rectRef.value, nextRect))
      rectRef.value = nextRect
  }

  function scheduleUpdate() {
    if (frame != null)
      cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      frame = null
      updateRect()
    })
  }

  watch(
    [nodeRef, viewportRef],
    ([node, viewport], _oldValue, onCleanup) => {
      let disposed = false
      let layoutObserver: LayoutObserver | null = null
      let viewportLayoutObserver: LayoutObserver | null = null

      updateRect()
      nextTick(() => {
        if (disposed)
          return

        updateRect()

        if (!node || !viewport)
          return

        const element = viewport.findElementById(node.id)
        layoutObserver = new LayoutObserver(scheduleUpdate)
        if (element?.isConnected)
          layoutObserver.observe(element)

        viewportLayoutObserver = new LayoutObserver(scheduleUpdate)
        if (viewport.viewportElement?.isConnected)
          viewportLayoutObserver.observe(viewport.viewportElement)
      })

      onCleanup(() => {
        disposed = true
        if (frame != null) {
          cancelAnimationFrame(frame)
          frame = null
        }
        layoutObserver?.disconnect()
        viewportLayoutObserver?.disconnect()
      })
    },
    {
      flush: 'post',
      immediate: true,
    },
  )

  return rectRef
}

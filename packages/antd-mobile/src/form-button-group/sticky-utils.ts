import { autoUpdate } from '@floating-ui/dom'

interface StickyGeometry {
  position: 'top' | 'bottom'
  offset: number
  viewportHeight: number
  rootTop: number
  boundaryTop: number
  boundaryBottom: number
  contentHeight: number
}

export function getStickyAnchor({ position, offset, viewportHeight, rootTop, boundaryTop, boundaryBottom, contentHeight }: StickyGeometry): number | undefined {
  const edge = position === 'top' ? offset : viewportHeight - offset
  if (position === 'top')
    return rootTop < edge ? Math.min(edge, boundaryBottom - contentHeight) : undefined
  return rootTop + contentHeight > edge ? Math.max(edge, boundaryTop + contentHeight) : undefined
}

interface StickyElements {
  root: HTMLElement
  inner: HTMLElement
  boundary: HTMLElement
  onResize: (size: { width: number, height: number } | null) => void
  onUpdate: () => void
}

/** Share one size observer instead of duplicating autoUpdate's observers. */
export function observeStickyElements({ root, inner, boundary, onResize, onUpdate }: StickyElements) {
  const sizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === inner) {
        const size = entry.borderBoxSize[0]
        onResize(size ? { width: size.inlineSize, height: size.blockSize } : null)
      }
    }
    onUpdate()
  })
  sizeObserver.observe(root)
  sizeObserver.observe(inner)
  sizeObserver.observe(boundary)
  const stopRootUpdates = autoUpdate(root, inner, onUpdate, { elementResize: false })
  const stopBoundaryUpdates = autoUpdate(boundary, null, onUpdate, {
    ancestorScroll: false,
    ancestorResize: false,
    elementResize: false,
  })
  return () => {
    sizeObserver.disconnect()
    stopRootUpdates()
    stopBoundaryUpdates()
  }
}

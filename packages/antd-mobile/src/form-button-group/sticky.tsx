import type { CSSProperties, HTMLAttributes } from 'react'
import { autoUpdate, computePosition } from '@floating-ui/dom'
import cls from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { usePrefixCls } from '../__builtins__'
import { FormLayoutRootContext } from '../form-layout/root-context'
import { FormButtonGroupStickyContext } from './context'

export interface IFormButtonGroupStickyProps extends HTMLAttributes<HTMLDivElement> {
  position?: 'top' | 'bottom'
  offsetTop?: number | string
  offsetBottom?: number | string
  container?: HTMLElement
  zIndex?: number | string
}

interface StickyState {
  fixed: boolean
  width: number
  height: number
  x: number
  y: number
}

const initialState: StickyState = { fixed: false, width: 0, height: 0, x: 0, y: 0 }

export function FormButtonGroupSticky({
  position = 'bottom',
  offsetTop = 0,
  offsetBottom = 0,
  container,
  zIndex,
  className,
  style,
  children,
  ...props
}: IFormButtonGroupStickyProps) {
  const prefixCls = usePrefixCls('formily-button-group')
  const layoutRoot = useContext(FormLayoutRootContext)
  const rootRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState(initialState)
  const offset = position === 'top' ? offsetTop : offsetBottom

  useEffect(() => {
    const root = rootRef.current
    const inner = innerRef.current
    const probe = offsetRef.current
    if (!root || !inner || !probe)
      return

    const boundary = container ?? root.closest('form') ?? layoutRoot?.current?.nativeElement ?? root.parentElement
    if (!boundary)
      return
    let frame = 0
    let revision = 0
    let disposed = false
    let visible = false
    let contentSize: { width: number, height: number } | null = null
    let stopUpdates: (() => void) | undefined

    const reset = () => {
      if (inner.style.width)
        inner.style.width = ''
      setState(previous => previous.fixed ? initialState : previous)
    }
    const measure = async (requestMeasure: () => void) => {
      frame = 0
      if (disposed || !visible)
        return
      const currentRevision = ++revision
      const rootRect = root.getBoundingClientRect()
      if (!root.getClientRects().length || !rootRect.width) {
        reset()
        return
      }
      const boundaryRect = boundary.getBoundingClientRect()
      const viewportHeight = document.documentElement.clientHeight
      if (boundaryRect.bottom <= 0 || boundaryRect.top >= viewportHeight) {
        reset()
        return
      }
      // ResizeObserver supplies the border-box size. Only activation or a width
      // change needs a fallback measurement before the next observer notification.
      contentSize ??= inner.getBoundingClientRect()
      const { height } = contentSize
      const offsetPx = typeof offset === 'number' ? offset : probe.getBoundingClientRect().top
      const edge = position === 'top' ? offsetPx : viewportHeight - offsetPx
      const fixed = position === 'top' ? rootRect.top < edge : rootRect.top + height > edge
      if (!fixed) {
        reset()
        return
      }
      const width = `${rootRect.width}px`
      if (inner.style.width !== width) {
        inner.style.width = width
        if (Math.abs(contentSize.width - rootRect.width) > 0.01) {
          // Width can change text wrapping. Defer reading its new height instead
          // of forcing synchronous layout immediately after this style write.
          contentSize = null
          requestMeasure()
          return
        }
      }
      const anchorY = position === 'top'
        ? Math.min(edge, boundaryRect.bottom - height)
        : Math.max(edge, boundaryRect.top + height)
      const anchor = {
        contextElement: root,
        getBoundingClientRect: () => new DOMRect(rootRect.left, anchorY, rootRect.width, 0),
      }
      const { x, y } = await computePosition(anchor, inner, {
        strategy: 'fixed',
        placement: position === 'top' ? 'bottom-start' : 'top-start',
      })
      if (disposed || currentRevision !== revision)
        return
      const next = { fixed: true, width: rootRect.width, height, x, y }
      setState(previous => previous.fixed && previous.width === next.width
        && previous.height === next.height && previous.x === next.x && previous.y === next.y
        ? previous
        : next)
    }
    function schedule() {
      if (disposed || !visible)
        return
      revision++
      if (!frame)
        frame = requestAnimationFrame(() => { void measure(schedule) })
    }
    const startUpdates = () => {
      contentSize = null
      // Share one size observer instead of duplicating autoUpdate's observers.
      const sizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === inner) {
            const size = entry.borderBoxSize[0]
            contentSize = size
              ? { width: size.inlineSize, height: size.blockSize }
              : null
          }
        }
        schedule()
      })
      sizeObserver.observe(root)
      sizeObserver.observe(inner)
      sizeObserver.observe(boundary)
      const stopRootUpdates = autoUpdate(root, inner, schedule, { elementResize: false })
      const stopBoundaryUpdates = autoUpdate(boundary, null, schedule, {
        ancestorScroll: false,
        ancestorResize: false,
        elementResize: false,
      })
      stopUpdates = () => {
        sizeObserver.disconnect()
        stopRootUpdates()
        stopBoundaryUpdates()
      }
    }
    const pauseUpdates = () => {
      revision++
      cancelAnimationFrame(frame)
      frame = 0
      stopUpdates?.()
      stopUpdates = undefined
      contentSize = null
    }
    // This is the only observer kept alive while the form is outside the viewport.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (disposed)
        return
      const nextVisible = entry.isIntersecting && entry.intersectionRect.width > 0 && entry.intersectionRect.height > 0
      if (visible === nextVisible)
        return
      visible = nextVisible
      if (visible) {
        startUpdates()
      }
      else {
        pauseUpdates()
        reset()
      }
    })
    reset()
    visibilityObserver.observe(boundary)
    return () => {
      disposed = true
      visible = false
      visibilityObserver.disconnect()
      pauseUpdates()
      if (inner.style.width)
        inner.style.width = ''
    }
  }, [container, layoutRoot, position, offset])

  const fixedStyle: CSSProperties | undefined = state.fixed
    ? { position: 'fixed', width: state.width, left: state.x, top: state.y, zIndex }
    : undefined

  return (
    <div
      {...props}
      ref={rootRef}
      className={cls(`${prefixCls}-sticky`, className)}
      style={{ ...style, ...(state.fixed ? { height: state.height } : {}) }}
    >
      <div
        ref={offsetRef}
        aria-hidden
        style={{ position: 'fixed', top: offset, width: 0, height: 0, visibility: 'hidden', pointerEvents: 'none' }}
      />
      <div ref={innerRef} className={cls(`${prefixCls}-sticky-inner`, { [`${prefixCls}-sticky-fixed`]: state.fixed })} style={fixedStyle}>
        <FormButtonGroupStickyContext.Provider value={position === 'bottom'}>
          {children}
        </FormButtonGroupStickyContext.Provider>
      </div>
    </div>
  )
}

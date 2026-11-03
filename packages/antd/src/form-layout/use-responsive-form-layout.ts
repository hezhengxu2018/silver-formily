import type { IFormLayoutContext, IFormLayoutProps } from './index'
import { useEffect, useRef, useState } from 'react'

export function useResponsiveFormLayout(props: IFormLayoutProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>()
  const responsive = Boolean(props.breakpoints?.length)
  useEffect(() => {
    const element = ref.current
    if (!element || !responsive)
      return
    const update = () => setWidth(element.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [responsive])

  const breakpoints = props.breakpoints ?? []
  const match = breakpoints.findIndex(point => (width ?? 0) <= point)
  const index = match === -1 ? breakpoints.length : match
  const factor = <T>(value: T | T[]): T | undefined => Array.isArray(value)
    ? value[Math.min(index, value.length - 1)]
    : value
  const resolved: IFormLayoutContext = {
    ...props,
    layout: factor(props.layout),
    labelAlign: factor(props.labelAlign),
    wrapperAlign: factor(props.wrapperAlign),
    labelCol: factor(props.labelCol),
    wrapperCol: factor(props.wrapperCol),
  }
  return { ref, props: resolved }
}

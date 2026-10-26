import type { IFormItemProps } from './types'
import { useFormLayout } from '../form-layout'

export function useFormItemLayout(props: IFormItemProps) {
  const context = useFormLayout()
  return {
    colon: props.colon ?? context.colon ?? false,
    layout: props.layout ?? context.layout ?? 'horizontal',
    labelAlign: props.labelAlign ?? context.labelAlign ?? 'left',
    wrapperAlign: props.wrapperAlign ?? context.wrapperAlign ?? 'left',
    labelWrap: props.labelWrap ?? context.labelWrap,
    wrapperWrap: props.wrapperWrap ?? context.wrapperWrap,
    labelWidth: props.labelWidth ?? context.labelWidth,
    wrapperWidth: props.wrapperWidth ?? context.wrapperWidth,
    bordered: props.bordered ?? context.bordered ?? true,
    tooltipLayout: props.tooltipLayout ?? context.tooltipLayout ?? 'icon',
    tooltipIcon: props.tooltipIcon !== undefined ? props.tooltipIcon : context.tooltipIcon,
  }
}

export function widthStyle(width: number | string | undefined) {
  if (width === undefined)
    return {}
  return { width: width === 'auto' ? undefined : width, maxWidth: width === 'auto' ? undefined : width }
}

import type { IComponentMapper } from '@silver-formily/react'
import type { ComponentProps, ComponentType } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { isVoidField } from '@silver-formily/core'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { createElement, forwardRef } from 'react'
import { useNativeFeedback } from './feedback'
import { useControlProps } from './index'

// Adapters preserve native props, callbacks and generics; connect hoists statics.
// Apply mappers left-to-right so value adaptation also applies to readPretty.
export function connectControl<T extends ComponentType<any>>(target: T, ...mappers: IComponentMapper<NoInfer<T>>[]): T {
  return connect(target, ...[...mappers].reverse(), mapProps((props: ComponentProps<T>) => useControlProps(props))) as unknown as T
}

export function mapOptions(target: 'options' | 'treeData' | 'dataSource') {
  return mapProps((props, field) => {
    const source = field && 'dataSource' in field ? field.dataSource : undefined
    return { [target]: source?.length ? source : props[target] ?? source }
  })
}

export function mapLoading() {
  return mapProps((props, field) => ({
    loading: props.loading ?? (field && 'loading' in field ? field.loading : undefined),
  }))
}

export function mapLoadingIcon(property: 'suffixIcon' | 'suffix' = 'suffixIcon') {
  return mapProps((props, field) => {
    const { hasFeedback } = useNativeFeedback()
    const loading = field && 'loading' in field && (field.loading || (field.validating && !hasFeedback))
    const icon = loading ? <LoadingOutlined /> : null
    return { [property]: property === 'suffix'
      ? (
          <span>
            {props.suffix}
            {icon}
          </span>
        )
      : loading
        ? (
            <>
              {props.suffixIcon}
              {icon}
            </>
          )
        : props.suffixIcon }
  })
}

// A preview has no native input handle. Consume the ref so React 18 does not
// forward it to a plain text function component when the field changes pattern.
export function mapReadPrettyControl(preview: ComponentType<any>, props?: Record<string, unknown>) {
  const Preview = forwardRef<unknown, Record<string, unknown>>((props, _ref) => createElement(preview, props))
  return mapReadPretty(Preview, props)
}

export function mapChecked() {
  return mapProps((props, field) => {
    // Native Group children have their own option value and no field binding.
    if (!field || isVoidField(field) || !props.onChange)
      return props
    const value = props.value
    delete props.value
    return { checked: value ?? props.checked }
  })
}

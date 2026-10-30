import type { SelectorOption, SelectorProps } from 'antd-mobile/es/components/selector'
import { isVoidField } from '@silver-formily/core'
import { connect, mapProps } from '@silver-formily/react'
import { toJS } from '@silver-formily/reactive'
import { Selector as AntdSelector, Loading } from 'antd-mobile'
import { PreviewText } from '../preview-text'

export type ISelectorValue = string | number
export type ISelectorOption<V extends ISelectorValue = ISelectorValue> = SelectorOption<V>
export type ISelectorProps<V extends ISelectorValue = ISelectorValue> = SelectorProps<V>

function BaseSelector<V extends ISelectorValue>({ loading, readPretty, ...props }: ISelectorProps<V> & { loading?: boolean, readPretty?: boolean }) {
  if (loading)
    return <Loading />
  return readPretty ? <PreviewText.Selector {...props} /> : <AntdSelector {...props} />
}

// connect's component type cannot retain a generic call signature; restore the
// native Selector signature after mapping internal model state to props.
export const Selector = connect(
  BaseSelector,
  mapProps((props, field) => ({
    ...props,
    disabled: props.disabled || field?.readOnly,
    loading: !isVoidField(field) && field?.loading,
    readPretty: !isVoidField(field) && field?.pattern === 'readPretty',
    options: toJS(!isVoidField(field) && field?.dataSource?.length ? field.dataSource : props.options ?? []),
  })),
) as typeof AntdSelector

export default Selector

import type { Field } from '@silver-formily/core'
import type { SelectorOption, SelectorProps } from 'antd-mobile/es/components/selector'
import { isVoidField } from '@silver-formily/core'
import { observer, useField } from '@silver-formily/react'
import { Selector as AntdSelector, Loading } from 'antd-mobile'
import { PreviewText } from '../preview-text'

export type ISelectorValue = string | number
export type ISelectorOption<V extends ISelectorValue = ISelectorValue> = SelectorOption<V>
export type ISelectorProps<V extends ISelectorValue = ISelectorValue> = SelectorProps<V>

export const Selector = observer(<V extends ISelectorValue,>(props: ISelectorProps<V>) => {
  const field = useField<Field>()

  const dataSource: ISelectorOption<V>[] = field?.dataSource?.length
    ? field.dataSource
    : props?.options?.length
      ? props.options
      : []

  if (field?.loading) {
    return <Loading />
  }

  if (!isVoidField(field) && field?.pattern === 'readPretty') {
    return <PreviewText.Selector {...props} />
  }

  return <AntdSelector {...props} options={dataSource} />
})

export default Selector

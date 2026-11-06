import type { Field } from '@silver-formily/core'
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import { observer, useField } from '@silver-formily/react'
import { Tag } from 'antd'
import cls from 'clsx'
import { createContext, useContext } from 'react'
import { usePrefixCls, useTokenStyle } from '../__builtins__'
import './style.css'

export interface IPreviewTextProps {
  value?: any
  className?: string
  style?: CSSProperties
  prefixCls?: string
  prefix?: ReactNode
  suffix?: ReactNode
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  formatter?: (value: any, info: { userTyping: boolean, input: string }) => ReactNode
}
export interface IPreviewSelectProps extends IPreviewTextProps {
  options?: any[]
  mode?: 'multiple' | 'tags'
  labelInValue?: boolean
  fieldNames?: { label?: string, value?: string, options?: string }
}

const PlaceholderContext = createContext<ReactNode>('N/A')
export function usePlaceholder(value?: ReactNode) {
  const placeholder = useContext(PlaceholderContext)
  return value === undefined || value === null || value === '' ? placeholder : value
}

function Text({ value, children, className, style, prefixCls }: PropsWithChildren<IPreviewTextProps>) {
  const prefix = usePrefixCls('form-text', { prefixCls })
  const tokens = useTokenStyle()
  const content = usePlaceholder(value)
  return <span className={cls('sf-preview', prefix, className)} style={{ ...tokens, ...style }}>{children ?? content}</span>
}
function Input(props: IPreviewTextProps) {
  const value = usePlaceholder(props.value)
  return (
    <Text {...props}>
      {props.addonBefore}
      {props.prefix}
      {value}
      {props.suffix}
      {props.addonAfter}
    </Text>
  )
}
function NumberPicker(props: IPreviewTextProps) {
  const value = props.value === undefined || props.value === null || props.value === ''
    ? props.value
    : props.formatter ? props.formatter(props.value, { userTyping: false, input: '' }) : props.value
  return <Input {...props} value={value} />
}
const Select = observer((props: IPreviewSelectProps) => {
  const field = useField<Field>()
  const placeholder = usePlaceholder()
  const sources = field?.dataSource?.length ? field.dataSource : props.options ?? []
  const labelKey = props.fieldNames?.label ?? 'label'
  const valueKey = props.fieldNames?.value ?? 'value'
  const optionsKey = props.fieldNames?.options ?? 'options'
  const flatten = (items: any[]): any[] => items.flatMap(item => Array.isArray(item[optionsKey]) ? flatten(item[optionsKey]) : [item])
  const options = flatten(sources)
  const values = props.mode ? Array.isArray(props.value) ? props.value : [] : props.value === undefined || props.value === null ? [] : [props.value]
  const labels = values.map((value) => {
    const key = props.labelInValue ? value.value : value
    const option = options.find(item => item[valueKey] === key)
    return option?.[labelKey] ?? (props.labelInValue ? value.label ?? key : key)
  })
  return <Text {...props}>{labels.length ? props.mode ? labels.map((label, index) => <Tag key={index}>{label}</Tag>) : labels[0] : placeholder}</Text>
})

export const PreviewText = Object.assign(Text, {
  Input,
  Select,
  NumberPicker,
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder,
})
export default PreviewText

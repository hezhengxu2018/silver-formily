import type { Field } from '@silver-formily/core'
import type { UploadProps } from 'antd'
import type { Dayjs } from 'dayjs'
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import { observer, useField } from '@silver-formily/react'
import { Upload as AntdUpload, Tag } from 'antd'
import cls from 'clsx'
import { Children, createContext, isValidElement, useContext } from 'react'
import { createBem, useTokenStyle } from '../__builtins__'
import './style.css'

const b = createBem('preview-text')

export interface IPreviewTextProps {
  value?: any
  className?: string
  style?: CSSProperties
  prefix?: ReactNode
  suffix?: ReactNode
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  formatter?: (value: any, info: { userTyping: boolean, input: string }) => ReactNode
}
export interface IPreviewSelectProps extends IPreviewTextProps {
  options?: any[]
  children?: ReactNode
  mode?: 'multiple' | 'tags'
  labelInValue?: boolean
  fieldNames?: { label?: string, value?: string, options?: string }
  /** Internal previews can supply an already resolved data source. */
  resolvedOptions?: any[]
}

const PlaceholderContext = createContext<ReactNode>('N/A')
export function usePlaceholder(value?: ReactNode) {
  const placeholder = useContext(PlaceholderContext)
  return value === undefined || value === null || value === '' ? placeholder : value
}

function Text({ value, children, className, style }: PropsWithChildren<IPreviewTextProps>) {
  const tokens = useTokenStyle()
  const content = usePlaceholder(value)
  return <span className={cls(b(), className)} style={{ ...tokens, ...style }}>{children ?? content}</span>
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
  const fromChildren = (children: ReactNode): any[] => Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ value?: unknown, children?: ReactNode }>(child))
      return []
    return 'value' in child.props
      ? [{ value: child.props.value, label: child.props.children }]
      : fromChildren(child.props.children)
  })
  const sources = props.resolvedOptions ?? (field?.dataSource?.length ? field.dataSource : props.options ?? fromChildren(props.children))
  const labelKey = props.fieldNames?.label ?? 'label'
  const valueKey = props.fieldNames?.value ?? 'value'
  const optionsKey = props.fieldNames?.options ?? 'options'
  const flatten = (items: any[]): any[] => items.flatMap(item => Array.isArray(item[optionsKey]) ? flatten(item[optionsKey]) : [item])
  const options = flatten(sources.map(item => typeof item === 'object' ? item : { [labelKey]: item, [valueKey]: item }))
  const values = props.mode ? Array.isArray(props.value) ? props.value : [] : props.value === undefined || props.value === null ? [] : [props.value]
  const labels = values.map((value) => {
    const key = props.labelInValue ? value.value : value
    const option = options.find(item => item[valueKey] === key)
    return option?.[labelKey] ?? (props.labelInValue ? value.label ?? key : key)
  })
  return <Text {...props}>{labels.length ? props.mode ? labels.map((label, index) => <Tag key={index}>{label}</Tag>) : labels[0] : placeholder}</Text>
})

interface PreviewBooleanProps extends IPreviewTextProps {
  checked?: boolean
  checkedChildren?: ReactNode
  unCheckedChildren?: ReactNode
}
function BooleanPreview({ checked, value, checkedChildren, unCheckedChildren, ...props }: PreviewBooleanProps) {
  const selected = checked ?? value
  return <Text {...props} value={selected == null ? undefined : selected ? checkedChildren ?? '是' : unCheckedChildren ?? '否'} />
}
function Password(props: IPreviewTextProps) {
  return <Text {...props} value={props.value == null || props.value === '' ? undefined : '••••••••'} />
}
function Slider(props: IPreviewTextProps) {
  return <Text {...props} value={Array.isArray(props.value) ? props.value.join(' ~ ') : props.value} />
}
interface PreviewDateProps extends Omit<IPreviewTextProps, 'value'> {
  value?: Dayjs | (Dayjs | null)[] | null
  format?: string | ((value: Dayjs) => string) | (string | ((value: Dayjs) => string))[] | { format: string, type?: 'mask' }
  picker?: string
  showTime?: unknown
  use12Hours?: boolean
}
function DatePreview({ value, format, picker, showTime, use12Hours, ...props }: PreviewDateProps, time = false, range = false) {
  const placeholder = usePlaceholder()
  const selectedFormat = Array.isArray(format) ? format[0] : format
  const pattern = selectedFormat ?? (time ? use12Hours ? 'h:mm:ss a' : 'HH:mm:ss' : ({ year: 'YYYY', month: 'YYYY-MM', quarter: 'YYYY-[Q]Q', week: 'gggg-wo' }[picker ?? ''] ?? (showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')))
  const render = (date: Dayjs | null) => !date || !date.isValid() ? placeholder : typeof pattern === 'function' ? pattern(date) : date.format(typeof pattern === 'string' ? pattern : pattern.format)
  const dates = Array.isArray(value) ? value : value ? [value] : []
  return (
    <Text {...props}>
      {dates.length
        ? dates.map((date, index) => (
            <span key={index}>
              {index > 0 && (range ? ' ~ ' : ', ')}
              {render(date)}
            </span>
          ))
        : placeholder}
    </Text>
  )
}
function DatePicker(props: PreviewDateProps) {
  return DatePreview(props)
}
function DateRangePicker(props: PreviewDateProps) {
  return DatePreview(props, false, true)
}
function TimePicker(props: PreviewDateProps) {
  return DatePreview(props, true)
}
function TimeRangePicker(props: PreviewDateProps) {
  return DatePreview(props, true, true)
}

interface PreviewTreeProps extends Omit<IPreviewSelectProps, 'fieldNames'> {
  treeData?: any[]
  multiple?: boolean
  treeCheckable?: boolean
  treeCheckStrictly?: boolean
  fieldNames?: { label?: string, value?: string, children?: string }
  displayRender?: (labels: ReactNode[], selectedOptions?: any[]) => ReactNode
  treeNodeLabelProp?: string
  treeDataSimpleMode?: boolean | { id?: string, pId?: string, rootPId?: unknown }
}
const TreeSelect = observer((props: PreviewTreeProps) => {
  const field = useField<Field>()
  const source = field?.dataSource?.length ? field.dataSource : props.treeData ?? []
  const childrenKey = props.fieldNames?.children ?? 'children'
  const flatten = (items: any[]): any[] => items.flatMap(item => [item, ...flatten(item[childrenKey] ?? [])])
  return <Select {...props} resolvedOptions={flatten(source)} fieldNames={{ label: props.treeNodeLabelProp ?? props.fieldNames?.label ?? 'title', value: props.fieldNames?.value }} mode={props.multiple || props.treeCheckable ? 'multiple' : undefined} labelInValue={props.labelInValue || props.treeCheckStrictly} />
})
const Cascader = observer((props: PreviewTreeProps) => {
  const field = useField<Field>()
  const placeholder = usePlaceholder()
  const source = field?.dataSource?.length ? field.dataSource : props.options ?? []
  const labelKey = props.fieldNames?.label ?? 'label'
  const valueKey = props.fieldNames?.value ?? 'value'
  const childrenKey = props.fieldNames?.children ?? 'children'
  const paths: any[][] = props.multiple ? props.value ?? [] : props.value?.length ? [props.value] : []
  return (
    <Text {...props}>
      {paths.length
        ? paths.map((path, index) => {
            let options = source
            const selected: any[] = []
            const labels = path.map((value) => {
              const option = options.find(item => item[valueKey] === value)
              if (option)
                selected.push(option)
              options = option?.[childrenKey] ?? []
              return option?.[labelKey] ?? value
            })
            const label = props.displayRender
              ? props.displayRender(labels, selected)
              : labels.map((label, i) => (
                  <span key={i}>
                    {i > 0 && ' / '}
                    {label}
                  </span>
                ))
            return (
              <span key={index}>
                {index > 0 && ', '}
                {label}
              </span>
            )
          })
        : placeholder}
    </Text>
  )
})
interface PreviewTransferProps extends IPreviewTextProps {
  targetKeys?: (string | number)[]
  dataSource?: any[]
  rowKey?: (item: any) => string
  render?: (item: any) => ReactNode | { label: ReactNode, value: string }
}
function Transfer(props: PreviewTransferProps) {
  const placeholder = usePlaceholder()
  const labels = (props.targetKeys ?? props.value ?? []).map((key: string | number) => {
    const item = props.dataSource?.find(item => (props.rowKey ? props.rowKey(item) : item.key) === key)
    const rendered = item && props.render ? props.render(item) : item?.title ?? key
    return rendered && typeof rendered === 'object' && 'label' in rendered ? rendered.label : rendered
  })
  return <Text {...props}>{labels.length ? labels.map((label: ReactNode, index: number) => <Tag key={index}>{label}</Tag>) : placeholder}</Text>
}
function Upload(props: UploadProps) {
  const placeholder = usePlaceholder()
  return props.fileList?.length ? <AntdUpload {...props} disabled openFileDialogOnClick={false} onChange={undefined} onRemove={undefined} showUploadList={{ ...(typeof props.showUploadList === 'object' ? props.showUploadList : {}), showRemoveIcon: false }}>{null}</AntdUpload> : <Text>{placeholder}</Text>
}

export const PreviewText = Object.assign(Text, {
  Input,
  Select,
  NumberPicker,
  Boolean: BooleanPreview,
  Password,
  Slider,
  DatePicker,
  DateRangePicker,
  TimePicker,
  TimeRangePicker,
  TreeSelect,
  Cascader,
  Transfer,
  Upload,
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder,
})
export default PreviewText

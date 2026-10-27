import type { Field } from '@silver-formily/core'
import type { CascaderProps } from 'antd-mobile/es/components/cascader'
import type { InputProps } from 'antd-mobile/es/components/input'
import type { SelectorOption, SelectorProps } from 'antd-mobile/es/components/selector'
import type { IDatePickerProps } from '../date-picker'
import type { ISelectorValue } from '../selector'
import { observer, useField } from '@silver-formily/react'
import { isArr, isFn, isValid } from '@silver-formily/shared'
import { Tag } from 'antd-mobile'
import cls from 'classnames'
import React, { createContext, useContext } from 'react'
import { formatDayjsValue, usePrefixCls } from '../__builtins__'

export interface IPreviewTextProps {
  value?: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  prefixCls?: string
  renderText?: (value: React.ReactNode[]) => React.ReactNode
}

export type IPreviewTextInputProps = Omit<InputProps, 'value'> & IPreviewTextProps
export type IPreviewTextSelectorProps<V extends ISelectorValue = ISelectorValue> = SelectorProps<V> & Omit<IPreviewTextProps, 'value'>
export type IPreviewTextDatePickerProps = Omit<IDatePickerProps, 'onChange'> & Omit<IPreviewTextProps, 'value'>
export type IPreviewTextCascaderProps = CascaderProps & Omit<IPreviewTextProps, 'value'>

const PlaceholderContext = createContext<React.ReactNode>('N/A')

const Placeholder = PlaceholderContext.Provider

function usePlaceholder(value?: React.ReactNode): React.ReactNode {
  const placeholder = useContext(PlaceholderContext) || 'N/A'
  return isValid(value) && value !== '' ? value : placeholder
}

function Input({ className, ...props }: IPreviewTextInputProps) {
  const prefixCls = usePrefixCls('form-text', props)
  return (
    <div className={cls(prefixCls, className)}>
      {usePlaceholder(props.value)}
    </div>
  )
}

function Text(props: IPreviewTextProps) {
  const prefixCls = usePrefixCls('form-text', props)

  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {usePlaceholder(props.value)}
    </div>
  )
}

const Selector = observer(
  <V extends ISelectorValue,>(props: IPreviewTextSelectorProps<V>) => {
    const field = useField<Field>()
    const prefixCls = usePrefixCls('form-text', props)
    const dataSource: SelectorOption<V>[] = field?.dataSource?.length
      ? field.dataSource
      : props?.options?.length
        ? props.options
        : []
    const placeholder = usePlaceholder()
    const getSelected = () => {
      return props.value || []
    }

    const getLabel = (target: V) => {
      return (
        dataSource?.find(item => String(item.value) === String(target))?.label || placeholder
      )
    }

    const getLabels = () => {
      const selected = getSelected()
      if (!selected.length)
        return placeholder
      if (selected.length === 1)
        return getLabel(selected[0])
      return selected.map((item, key) => {
        return (
          <Tag key={key} fill="outline">
            {getLabel(item)}
          </Tag>
        )
      })
    }
    return (
      <div className={cls(prefixCls, props.className)} style={props.style}>
        {getLabels()}
      </div>
    )
  },
)

function DatePicker(props: IPreviewTextDatePickerProps) {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('form-text', props)
  const getLabels = () => {
    return formatDayjsValue(props.value, props.format, placeholder)
  }
  return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
}

const Cascader = observer(
  (props: IPreviewTextCascaderProps) => {
    const field = useField<Field>()
    const placeholder = usePlaceholder()
    const prefixCls = usePrefixCls('form-text', props)
    const dataSource: CascaderProps['options'] = field?.dataSource?.length
      ? field.dataSource
      : props?.options?.length
        ? props.options
        : []
    const getSelected = () => {
      return isArr(props.value) ? props.value : []
    }
    const findLabel = (value: NonNullable<CascaderProps['value']>[number], dataSource: CascaderProps['options']): React.ReactNode => {
      for (let i = 0; i < dataSource?.length; i++) {
        const item = dataSource[i]
        if (item?.value === value) {
          return item?.label
        }
        else {
          const childLabel = findLabel(value, item?.children ?? [])
          if (childLabel)
            return childLabel
        }
      }
    }
    const getLabels = () => {
      const selected = getSelected()
      if (!selected?.length) {
        return placeholder
      }
      const labels = selected.map((value) => {
        return findLabel(value, dataSource) || placeholder
      })
      if (isFn(props.renderText)) {
        return props.renderText(labels)
      }
      return labels.join(' / ')
    }

    return (
      <div className={cls(prefixCls, props.className)} style={props.style}>
        {getLabels()}
      </div>
    )
  },
)

export const PreviewText = Object.assign(Text, {
  Input,
  Selector,
  Placeholder,
  DatePicker,
  Cascader,
  usePlaceholder,
})

export default PreviewText

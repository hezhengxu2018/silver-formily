import type { DataField } from '@silver-formily/core'
import type {
  CheckboxGroupProps,
  CheckboxProps,
} from 'antd-mobile/es/components/checkbox'
import { connect, mapProps, observer, useField } from '@silver-formily/react'
import { Checkbox as AntdCheckbox, Space } from 'antd-mobile'
import React from 'react'
import { useFormLayout } from '../form-layout'
import './style.less'

export interface ICheckboxOption {
  label: string
  value: string
  disabled?: boolean
}

interface Props {
  options?: string[] | ICheckboxOption[]
  layout?: 'vertical' | 'horizontal'
  layoutBlock?: boolean
}

export interface ICheckboxProps extends Props, CheckboxProps {}

export interface ICheckboxGroupProps extends Props, CheckboxGroupProps {}

function isCheckbox(node: any) {
  return (
    React.isValidElement(node)
    && !!(node.type as React.ComponentType<any>).displayName?.includes('Checkbox')
  )
}

export function BaseCheckbox({
  children,
  options,
  ...rest
}: ICheckboxProps) {
  const props = { block: true, ...rest }
  const layout = useFormLayout()
  const field = useField<DataField>()

  const dataSource = field?.dataSource?.length
    ? field.dataSource
    : options?.length
      ? options
      : []

  if (children) {
    // 线jsx模式
    if (Array.isArray(children)) {
      return <>{children}</>
    }
    return !isCheckbox(children)
      ? (
          <AntdCheckbox {...props}>{children}</AntdCheckbox>
        )
      : (
          (children as any)
        )
  }

  if (dataSource.length === 0) {
    return <AntdCheckbox {...props}>{field?.title || props.value}</AntdCheckbox>
  }

  return (
    <Space
      direction={props.layout ?? layout.layout ?? 'vertical'}
      block={props.layoutBlock}
      wrap={true}
    >
      {dataSource.map((item) => {
        const option
          = typeof item === 'string' ? { label: item, value: item } : item
        return (
          <AntdCheckbox
            {...props}
            disabled={option.disabled}
            value={option.value}
            key={option.value}
          >
            {option.label}
          </AntdCheckbox>
        )
      })}
    </Space>
  )
}

export const CheckboxGroup = observer(
  ({ value, defaultValue, disabled, onChange, ...props }: ICheckboxGroupProps) => {
    return (
      <AntdCheckbox.Group
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      >
        <BaseCheckbox {...props} />
      </AntdCheckbox.Group>
    )
  },
)
export const Checkbox = Object.assign(connect(BaseCheckbox, mapProps({})), {
  displayName: 'Checkbox',
  __ANTD_MOBILE_CHECKBOX: true,
  Group: Object.assign(CheckboxGroup, { displayName: 'Checkbox.Group' }),
})

export default Checkbox

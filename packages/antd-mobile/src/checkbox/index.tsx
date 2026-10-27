import type { DataField } from '@silver-formily/core'
import type { CheckboxGroupProps, CheckboxProps, CheckboxValue } from 'antd-mobile/es/components/checkbox'
import type { ReactNode } from 'react'
import { observer, useField } from '@silver-formily/react'
import { Checkbox as AntdCheckbox, Space } from 'antd-mobile'
import { createContext, useContext } from 'react'
import { useFormLayout } from '../form-layout'
import './style.less'

export interface ICheckboxOption {
  label: ReactNode
  value: CheckboxValue
  disabled?: boolean
}

export interface ICheckboxProps extends Omit<CheckboxProps, 'value'> {
  value?: boolean | CheckboxValue
}

export interface ICheckboxGroupProps extends CheckboxGroupProps {
  options?: (CheckboxValue | ICheckboxOption)[]
  layout?: 'vertical' | 'horizontal'
  layoutBlock?: boolean
}

const GroupContext = createContext(false)

export const BaseCheckbox = observer(({ value, checked, children, block = true, ...props }: ICheckboxProps) => {
  const inGroup = useContext(GroupContext)
  const field = useField<DataField>()
  const fieldChecked = !inGroup && field ? Boolean(value) : checked
  return (
    <AntdCheckbox
      {...props}
      block={block}
      checked={!inGroup && typeof value === 'boolean' ? value : fieldChecked}
      value={typeof value === 'boolean' ? undefined : value}
    >
      {children ?? (!inGroup ? field?.title : undefined)}
    </AntdCheckbox>
  )
})

export const CheckboxGroup = observer(({
  children,
  options,
  layout,
  layoutBlock,
  ...props
}: ICheckboxGroupProps) => {
  const field = useField<DataField>()
  const formLayout = useFormLayout()
  const dataSource = field?.dataSource?.length ? field.dataSource : options ?? []
  return (
    <GroupContext.Provider value={true}>
      <AntdCheckbox.Group {...props}>
        {children ?? (
          <Space direction={layout ?? formLayout.layout ?? 'vertical'} block={layoutBlock} wrap>
            {dataSource.map((item) => {
              const option = typeof item === 'object' ? item : { label: item, value: item }
              return (
                <AntdCheckbox key={option.value} value={option.value} disabled={option.disabled} block>
                  {option.label}
                </AntdCheckbox>
              )
            })}
          </Space>
        )}
      </AntdCheckbox.Group>
    </GroupContext.Provider>
  )
})

export const Checkbox = Object.assign(BaseCheckbox, {
  displayName: 'Checkbox',
  Group: Object.assign(CheckboxGroup, { displayName: 'Checkbox.Group' }),
})

export default Checkbox

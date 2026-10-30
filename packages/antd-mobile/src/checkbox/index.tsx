import type { ConnectedComponent } from '@silver-formily/react'
import type { CheckboxGroupProps, CheckboxProps, CheckboxValue } from 'antd-mobile/es/components/checkbox'
import type { FC, ReactNode } from 'react'
import { isVoidField } from '@silver-formily/core'
import { connect, mapProps } from '@silver-formily/react'
import { toJS } from '@silver-formily/reactive'
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

interface BaseCheckboxProps extends ICheckboxProps {
  fieldState?: { title: ReactNode, checked: boolean }
}

function BaseCheckboxView({ value, checked, children, block = true, fieldState, ...props }: BaseCheckboxProps) {
  const inGroup = useContext(GroupContext)
  const fieldChecked = !inGroup && fieldState ? fieldState.checked : checked
  return (
    <AntdCheckbox
      {...props}
      block={block}
      checked={!inGroup && typeof value === 'boolean' ? value : fieldChecked}
      value={typeof value === 'boolean' ? undefined : value}
    >
      {children ?? (!inGroup ? fieldState?.title : undefined)}
    </AntdCheckbox>
  )
}

export const BaseCheckbox: ConnectedComponent<FC<ICheckboxProps>> = connect(
  BaseCheckboxView,
  mapProps((props, field) => ({
    disabled: props.disabled || field?.readOnly,
    fieldState: field ? { title: field.title, checked: Boolean(props.value) } : undefined,
  })),
)

export const CheckboxGroup = connect(({
  children,
  options,
  layout,
  layoutBlock,
  ...props
}: ICheckboxGroupProps) => {
  const formLayout = useFormLayout()
  const dataSource = options ?? []
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
}, mapProps((props, field) => ({
  disabled: props.disabled || field?.readOnly,
  options: !isVoidField(field) && field?.dataSource?.length
    ? toJS(field.dataSource).map(option => ({ ...option, label: option.label, value: option.value }))
    : toJS(props.options ?? []),
})))

export const Checkbox = Object.assign(BaseCheckbox, {
  displayName: 'Checkbox',
  Group: Object.assign(CheckboxGroup, { displayName: 'Checkbox.Group' }),
})

export default Checkbox

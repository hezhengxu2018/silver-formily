import type { RadioGroupProps, RadioProps, RadioValue } from 'antd-mobile/es/components/radio'
import type { ReactNode } from 'react'
import { isVoidField } from '@silver-formily/core'
import { connect, mapProps } from '@silver-formily/react'
import { toJS } from '@silver-formily/reactive'
import { Radio as AntdRadio, Space } from 'antd-mobile'
import { createContext, useContext, useState } from 'react'
import { useFormLayout } from '../form-layout'

export interface IRadioOption {
  label: ReactNode
  value: RadioValue
  disabled?: boolean
}

interface Props {
  options?: (RadioValue | IRadioOption)[]
  layout?: 'vertical' | 'horizontal'
  layoutBlock?: boolean
}

export interface IRadioProps extends Omit<RadioProps, 'value'> {
  value?: RadioValue | boolean
}

export interface IRadioGroupProps extends Props, Omit<RadioGroupProps, 'onChange'> {
  allowClear?: boolean
  onChange?: (value: RadioValue | null) => void
}

const ClearContext = createContext<{
  value: RadioValue | null
  clear: () => void
} | null>(null)

function BaseRadio({ value, onClick, ...props }: IRadioProps) {
  const clearContext = useContext(ClearContext)
  return (
    <AntdRadio
      {...props}
      {...(typeof value === 'boolean' ? { checked: value } : { value })}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !props.disabled && clearContext && value === clearContext.value) {
          event.preventDefault()
          clearContext.clear()
        }
      }}
    />
  )
}

export const RadioGroup = connect(({
  children,
  options,
  layout,
  layoutBlock,
  allowClear = false,
  value,
  defaultValue = null,
  onChange,
  ...props
}: IRadioGroupProps) => {
  const formLayout = useFormLayout()
  const dataSource = options ?? []
  const [innerValue, setInnerValue] = useState(defaultValue)
  const selectedValue = value === undefined ? innerValue : value
  const changeValue = (nextValue: RadioValue | null) => {
    if (value === undefined)
      setInnerValue(nextValue)
    onChange?.(nextValue)
  }

  return (
    <ClearContext.Provider value={allowClear && !props.disabled ? { value: selectedValue, clear: () => changeValue(null) } : null}>
      <AntdRadio.Group {...props} value={selectedValue} onChange={changeValue}>
        {children ?? (
          <Space direction={layout ?? formLayout.layout ?? 'vertical'} block={layoutBlock} wrap>
            {dataSource.map((item) => {
              const option = typeof item === 'object' ? item : { label: item, value: item }
              return (
                <BaseRadio key={option.value} value={option.value} disabled={option.disabled} block>
                  {option.label}
                </BaseRadio>
              )
            })}
          </Space>
        )}
      </AntdRadio.Group>
    </ClearContext.Provider>
  )
}, mapProps((props, field) => ({
  disabled: props.disabled || field?.readOnly,
  options: !isVoidField(field) && field?.dataSource?.length
    ? toJS(field.dataSource).map(option => ({ ...option, label: option.label, value: option.value }))
    : toJS(props.options ?? []),
})))

export const Radio = Object.assign(
  connect(BaseRadio, mapProps((props, field) => ({ disabled: props.disabled || field?.readOnly }))),
  {
    displayName: 'Radio',
    Group: Object.assign(RadioGroup, { displayName: 'Radio.Group' }),
  },
)

export default Radio

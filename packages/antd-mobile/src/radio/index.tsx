import type { RadioGroupProps, RadioProps, RadioValue } from 'antd-mobile/es/components/radio'
import type { ReactNode } from 'react'
import { isVoidField } from '@silver-formily/core'
import { connect, mapProps } from '@silver-formily/react'
import { toJS } from '@silver-formily/reactive'
import { Radio as AntdRadio, Space } from 'antd-mobile'
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

export interface IRadioGroupProps extends Props, RadioGroupProps {}

export const RadioGroup = connect(({
  children,
  options,
  layout,
  layoutBlock,
  ...props
}: IRadioGroupProps) => {
  const formLayout = useFormLayout()
  const dataSource = options ?? []

  return (
    <AntdRadio.Group {...props}>
      {children ?? (
        <Space direction={layout ?? formLayout.layout ?? 'vertical'} block={layoutBlock} wrap>
          {dataSource.map((item) => {
            const option = typeof item === 'object' ? item : { label: item, value: item }
            return (
              <AntdRadio key={option.value} value={option.value} disabled={option.disabled} block>
                {option.label}
              </AntdRadio>
            )
          })}
        </Space>
      )}
    </AntdRadio.Group>
  )
}, mapProps((props, field) => ({
  disabled: props.disabled || field?.readOnly,
  options: !isVoidField(field) && field?.dataSource?.length
    ? toJS(field.dataSource).map(option => ({ ...option, label: option.label, value: option.value }))
    : toJS(props.options ?? []),
})))

export const Radio = Object.assign(
  connect(({ value, ...props }: IRadioProps) => (
    <AntdRadio
      {...props}
      {...(typeof value === 'boolean' ? { checked: value } : { value })}
    />
  ), mapProps((props, field) => ({ disabled: props.disabled || field?.readOnly }))),
  {
    displayName: 'Radio',
    Group: Object.assign(RadioGroup, { displayName: 'Radio.Group' }),
  },
)

export default Radio

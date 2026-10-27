import type { DataField } from '@silver-formily/core'
import type { RadioGroupProps, RadioProps, RadioValue } from 'antd-mobile/es/components/radio'
import type { ReactNode } from 'react'
import { observer, useField } from '@silver-formily/react'
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

export const RadioGroup = observer(({
  children,
  options,
  layout,
  layoutBlock,
  ...props
}: IRadioGroupProps) => {
  const field = useField<DataField>()
  const formLayout = useFormLayout()
  const dataSource = field?.dataSource?.length ? field.dataSource : options ?? []

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
})

export const Radio = Object.assign(
  observer(({ value, ...props }: IRadioProps) => (
    <AntdRadio
      {...props}
      {...(typeof value === 'boolean' ? { checked: value } : { value })}
    />
  )),
  {
    displayName: 'Radio',
    Group: Object.assign(RadioGroup, { displayName: 'Radio.Group' }),
  },
)

export default Radio

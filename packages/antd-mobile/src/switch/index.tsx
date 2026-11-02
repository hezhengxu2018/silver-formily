import type { SwitchProps } from 'antd-mobile'
import { connect, mapProps } from '@silver-formily/react'
import { Switch as AntdSwitch } from 'antd-mobile'

export interface ISwitchProps extends Omit<SwitchProps, 'beforeChange'> {
  /** Resolve to allow the change; return false or reject to keep the current value. */
  beforeChange?: (checked: boolean) => Promise<boolean | void>
}

function SwitchComponent({ beforeChange, onChange, ...props }: ISwitchProps) {
  return (
    <AntdSwitch
      {...props}
      onChange={beforeChange
        ? async (checked) => {
          let result: boolean | void
          try {
            result = await beforeChange(checked)
          }
          catch {
            return
          }
          if (result !== false)
            await onChange?.(checked)
        }
        : onChange}
    />
  )
}

export const Switch = connect(
  SwitchComponent,
  mapProps({ value: 'checked' }, (props, field) => ({ disabled: props.disabled || field?.readOnly })),
)

export default Switch

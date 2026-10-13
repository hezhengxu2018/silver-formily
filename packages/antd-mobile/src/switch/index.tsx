import { connect, mapProps } from '@silver-formily/react'
import { isNum } from '@silver-formily/shared'
import { Switch as AntdSwitch } from 'antd-mobile'

export const Switch = connect(
  AntdSwitch,
  mapProps(
    {
      value: 'checked',
    },
    (props) => {
      const onChange = props.onChange
      props.checked = isNum(props.checked) ? props.checked === 1 : props.checked

      delete (props as any).value
      return {
        ...props,
        onChange(checked) {
          onChange?.(checked)
        },
      }
    },
  ),
)

export default Switch

import { connect, mapProps } from '@silver-formily/vue'
import { ElSwitch } from 'element-plus'

export type SwitchProps = typeof ElSwitch

export const Switch = connect<typeof ElSwitch>(
  ElSwitch,
  mapProps({
    readOnly: 'readonly',
  }),
)

export default Switch

import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElSwitch } from 'element-plus'

export type SwitchProps = VueComponentProps<typeof ElSwitch>
export type SwitchComponent = typeof ElSwitch

export const Switch = connect<typeof ElSwitch>(
  ElSwitch,
  mapProps({
    readOnly: 'readonly',
  }),
)

export default Switch

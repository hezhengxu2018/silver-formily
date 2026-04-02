import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FSwitch from './switch.vue'

export const Switch = connect<typeof FSwitch>(
  FSwitch,
  mapProps({
    disabled: true,
    loading: true,
  }),
  mapReadPretty(PreviewText.Switch),
)

export type { SwitchBeforeChange, SwitchBeforeChangeContext, SwitchProps, SwitchValue } from './types'

export default Switch

import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { Switch as VanSwitch } from 'vant'
import { PreviewText } from '../preview-text'

export const Switch = connect<typeof VanSwitch>(
  VanSwitch,
  mapProps({
    disabled: true,
    loading: true,
  }),
  mapReadPretty(PreviewText.Switch),
)

export default Switch

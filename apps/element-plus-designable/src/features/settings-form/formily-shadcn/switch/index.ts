import { connect, mapProps } from '@silver-formily/vue'
import { Switch as ShadcnSwitch } from '@/components/ui/switch'
import { fieldControlIdMapper } from '../utils'

export const Switch = connect<typeof ShadcnSwitch>(
  ShadcnSwitch,
  mapProps({
    readOnly: 'readonly',
  }, fieldControlIdMapper),
)

export default Switch

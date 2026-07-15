import { connect, mapProps } from '@silver-formily/vue'
import { Switch as ShadcnSwitch } from '@/components/ui/switch'

export const Switch = connect<typeof ShadcnSwitch>(
  ShadcnSwitch,
  mapProps({
    readOnly: 'readonly',
  }),
)

export default Switch

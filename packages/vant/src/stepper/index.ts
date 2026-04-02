import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FStepper from './stepper.vue'

export const Stepper = connect<typeof FStepper>(
  FStepper,
  mapProps({
    disabled: true,
  }),
  mapReadPretty(PreviewText.Input),
)

export default Stepper

export type { StepperProps, StepperTheme, StepperThemeVars } from 'vant'

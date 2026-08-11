import type {
  StepperTheme,
  StepperThemeVars,
  StepperProps as VanStepperProps,
} from 'vant'
import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FStepper from './stepper.vue'

export type StepperProps = Partial<VanStepperProps>

export const Stepper = connect<typeof FStepper, StepperProps>(
  FStepper,
  mapProps({
    disabled: true,
  }),
  mapReadPretty(PreviewText.Input),
)

export default Stepper

export type { StepperTheme, StepperThemeVars, VanStepperProps }

export type StepperComponent = typeof Stepper

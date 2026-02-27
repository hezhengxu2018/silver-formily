import { composeExport } from '../__builtins__'
import FFormStepPane from './form-step-pane.vue'
import FFormStep from './form-step.vue'
import { createFormStep } from './utils'

export const FormStep = composeExport(FFormStep, {
  StepPane: FFormStepPane,
  createFormStep,
})

export default FormStep

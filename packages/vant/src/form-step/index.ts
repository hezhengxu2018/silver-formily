import { composeExport } from '../__builtins__'
import FFormStepPane from './form-step-pane.vue'
import FFormStep from './form-step.vue'
import { useFormStep } from './hooks'
import { createFormStep } from './utils'
import './style.scss'

export const FormStep = composeExport(FFormStep, {
  StepPane: FFormStepPane,
  createFormStep,
  useFormStep,
})

export default FormStep

export { useFormStep }

export type {
  FormStepEnv,
  FormStepSchemaSlots,
  IFormStep,
  IFormStepProps,
  SchemaStep,
} from './types'

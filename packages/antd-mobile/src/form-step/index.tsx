import type { VoidField } from '@silver-formily/core'
import type { IFormStep, IFormStepPaneProps, IFormStepProps } from './types'
import { observer, RecursionField, useField, useFieldSchema } from '@silver-formily/react'
import { Steps } from 'antd-mobile'
import cls from 'classnames'
import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { createFormStep, normalizeCurrent, parseSteps } from './utils'
import './style.less'

export type { IFormStep, IFormStepPaneProps, IFormStepProps, SchemaStep } from './types'

const FormStepContext = createContext<IFormStep | null>(null)

export function useFormStep(): IFormStep {
  const formStep = useContext(FormStepContext)
  if (!formStep)
    throw new Error('useFormStep 必须在 FormStep 组件内部使用')
  return formStep
}

const StepPane = ({ children }: IFormStepPaneProps) => <>{children}</>

export const FormStep = Object.assign(observer(({
  formStep: externalFormStep,
  current: controlledCurrent,
  hideSteps = false,
  children,
  className,
  ...props
}: IFormStepProps) => {
  const field = useField<VoidField>()
  const schema = useFieldSchema()
  const steps = useMemo(() => parseSteps(schema), [schema])
  const [internalFormStep] = useState(() => createFormStep())
  const formStep = externalFormStep ?? internalFormStep
  const modelCurrent = formStep.current
  const current = normalizeCurrent(controlledCurrent ?? modelCurrent, steps.length)
  useLayoutEffect(() => {
    formStep.connect(steps, field)
  }, [formStep, steps, field])
  useLayoutEffect(() => {
    if (controlledCurrent !== undefined)
      formStep.setCurrent(controlledCurrent)
  }, [formStep, controlledCurrent, steps, modelCurrent])
  const step = steps[current]
  return (
    <FormStepContext.Provider value={formStep}>
      <div className={cls('adm-formily-form-step', className)}>
        {!hideSteps && (
          <Steps {...props} className="adm-formily-form-step-steps" current={current}>
            {steps.map(({ name, props: stepProps }) => <Steps.Step key={name} {...stepProps} />)}
          </Steps>
        )}
        {step && <RecursionField key={step.name} name={step.name} schema={step.schema} />}
      </div>
    </FormStepContext.Provider>
  )
}), { StepPane, createFormStep, useFormStep })

export default FormStep

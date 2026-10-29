import type { VoidField } from '@silver-formily/core'
import type { Schema } from '@silver-formily/json-schema'
import type { IFormStep, SchemaStep } from './types'
import { action, markRaw, model, observable } from '@silver-formily/reactive'

export function normalizeCurrent(current: number, count: number) {
  if (!Number.isFinite(current))
    return 0
  return Math.min(Math.max(Math.trunc(current), 0), Math.max(count - 1, 0))
}

export function createFormStep(defaultCurrent = 0): IFormStep {
  const env = observable<{ steps: SchemaStep[], field: VoidField | null | undefined }>({ steps: [], field: null })
  let validating = false
  let formStep!: IFormStep
  const syncDisplay = action.bound(() => {
    const { field, steps } = env
    if (!field)
      return
    for (const [index, step] of steps.entries()) {
      field.form.query(field.address.concat(step.name)).take((pane) => {
        pane.setDisplay(index === formStep.current ? 'visible' : 'hidden')
      })
    }
  })
  formStep = model<IFormStep>({
    current: Number.isFinite(defaultCurrent) ? Math.max(Math.trunc(defaultCurrent), 0) : 0,
    connect(nextSteps, nextField) {
      env.steps = nextSteps
      env.field = nextField
      formStep.setCurrent(formStep.current)
    },
    setCurrent(current) {
      formStep.current = normalizeCurrent(current, env.steps.length)
      syncDisplay()
    },
    get allowNext() {
      return formStep.current < env.steps.length - 1
    },
    get allowBack() {
      return formStep.current > 0
    },
    async next() {
      const { field } = env
      if (!field || !formStep.allowNext || validating)
        return
      const current = formStep.current
      validating = true
      try {
        await field.form.validate()
        if (formStep.current === current)
          formStep.setCurrent(current + 1)
      }
      catch {}
      finally {
        validating = false
      }
    },
    back() {
      if (formStep.allowBack)
        formStep.setCurrent(formStep.current - 1)
    },
    async submit(onSubmit) {
      if (!env.field)
        throw new Error('FormStep 尚未连接表单')
      return env.field.form.submit(onSubmit)
    },
  })
  // Schema component props pass through toJS; retain the reactive controller identity.
  return markRaw(formStep)
}

export function parseSteps(schema: Schema) {
  const steps: SchemaStep[] = []
  schema.mapProperties((stepSchema, name) => {
    const component = stepSchema['x-component']
    if (typeof component === 'string' && component.split('.').at(-1) === 'StepPane') {
      steps.push({
        name,
        props: { title: stepSchema.title, ...stepSchema['x-component-props'] },
        schema: stepSchema,
      })
    }
  })
  return steps
}

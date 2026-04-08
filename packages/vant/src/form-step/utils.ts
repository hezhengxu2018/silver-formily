import type { Schema } from '@formily/json-schema'
import type { FormStepEnv, IFormStep, SchemaStep } from './types'
import { action, model, observable } from '@formily/reactive'

function normalizeCurrent(current: number, steps: SchemaStep[]) {
  if (!Number.isFinite(current))
    return 0

  if (!steps.length)
    return Math.max(Math.trunc(current), 0)

  return Math.min(Math.max(Math.trunc(current), 0), steps.length - 1)
}

export function createFormStep(defaultCurrent = 0): IFormStep {
  const env = observable<FormStepEnv>({
    form: null,
    field: null,
    steps: [],
  })
  let formStep!: IFormStep

  const syncDisplay = action.bound((target: number) => {
    if (!env.form || !env.field || !env.steps.length) {
      return
    }

    const nextIndex = normalizeCurrent(target, env.steps)
    const currentStep = env.steps[nextIndex]

    if (!currentStep) {
      return
    }

    for (const { name } of env.steps) {
      env.form.query(`${env.field.address}.${name}`).take((field) => {
        if (name === currentStep.name) {
          field.setDisplay('visible')
        }
        else {
          field.setDisplay('hidden')
        }
      })
    }
  })

  const next = action.bound(() => {
    if (!formStep.allowNext) {
      return
    }

    const nextCurrent = formStep.current + 1
    formStep.current = nextCurrent
    syncDisplay(nextCurrent)
  })

  const back = action.bound(() => {
    if (!formStep.allowBack) {
      return
    }

    const nextCurrent = formStep.current - 1
    formStep.current = nextCurrent
    syncDisplay(nextCurrent)
  })

  formStep = model({
    connect(steps, field) {
      env.steps = steps
      env.form = field?.form ?? null
      env.field = field ?? null
      formStep.current = normalizeCurrent(formStep.current, steps)
      syncDisplay(formStep.current)
    },
    current: Math.max(0, Math.trunc(defaultCurrent || 0)),
    setCurrent(key: number) {
      const nextCurrent = normalizeCurrent(key, env.steps)
      formStep.current = nextCurrent
      syncDisplay(nextCurrent)
    },
    get allowNext() {
      return formStep.current < env.steps.length - 1
    },
    get allowBack() {
      return formStep.current > 0
    },
    async next() {
      if (!env.form) {
        return
      }

      try {
        await env.form.validate()
        next()
      }
      catch {}
    },
    async back() {
      back()
    },
    async submit(onSubmit) {
      return env.form?.submit?.(onSubmit)
    },
  })

  return formStep
}

export function parseSteps(schema: Schema) {
  const steps: SchemaStep[] = []

  schema.mapProperties((stepSchema, name) => {
    if (stepSchema['x-component']?.includes('StepPane')) {
      steps.push({
        name,
        props: stepSchema['x-component-props'] ?? {},
        schema: stepSchema,
        slots: stepSchema['x-content'] as SchemaStep['slots'],
      })
    }
  })

  return steps
}

import type { Schema, SchemaKey } from '@formily/json-schema'
import type { Slots } from 'vue'
import type { FormStepEnv, IFormStep } from './types'
import { action, model, observable } from '@formily/reactive'

export interface SchemaStep {
  name: SchemaKey
  props: any
  schema: Schema
  slots: Slots
}

export function createFormStep(defaultCurrent = 0): IFormStep {
  const env: FormStepEnv = observable({
    form: null,
    field: null,
    steps: [],
  })

  const setDisplay = action.bound((target: number) => {
    const currentStep = env.steps[target]
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

  const formStep: IFormStep = model({
    connect(steps, field) {
      env.steps = steps
      env.form = field?.form
      env.field = field
    },
    current: defaultCurrent,
    setCurrent(key: number) {
      formStep.current = key
    },
    get allowNext() {
      return formStep.current < env.steps.length - 1
    },
    get allowBack() {
      return formStep.current > 0
    },
    async next() {
      try {
        await env.form.validate()
        // eslint-disable-next-line ts/no-use-before-define
        next()
      }
      catch {}
    },
    async back() {
      // eslint-disable-next-line ts/no-use-before-define
      back()
    },
    async submit(onSubmit) {
      return env.form?.submit?.(onSubmit)
    },
  })

  const next = action.bound(() => {
    /* istanbul ignore else -- @preserve */
    if (formStep.allowNext) {
      setDisplay(formStep.current + 1)
      formStep.setCurrent(formStep.current + 1)
    }
  })

  const back = action.bound(() => {
    /* istanbul ignore else -- @preserve */
    if (formStep.allowBack) {
      setDisplay(formStep.current - 1)
      formStep.setCurrent(formStep.current - 1)
    }
  })
  return formStep
}

export function parseSteps(schema: Schema) {
  const steps: SchemaStep[] = []
  schema.mapProperties((schema, name) => {
    /* istanbul ignore else -- @preserve */
    if (schema['x-component']?.indexOf('StepPane') > -1) {
      steps.push({
        name,
        props: schema['x-component-props'],
        schema,
        slots: schema['x-content'],
      })
    }
  })
  return steps
}

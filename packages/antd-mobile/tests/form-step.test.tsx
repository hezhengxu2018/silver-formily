import type { IFormStepProps } from '../src'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider, observer } from '@silver-formily/react'
import { useState } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { FormItem, FormStep, Input, useFormStep } from '../src'

afterEach(cleanup)

const Actions = observer(() => {
  const step = useFormStep()
  return (
    <>
      <button type="button" disabled={!step.allowBack} onClick={() => step.back()}>Back</button>
      <button type="button" disabled={!step.allowNext} onClick={() => step.next()}>Next</button>
    </>
  )
})
const SchemaField = createSchemaField({ components: { FormStep, FormItem, Input, Actions } })

function schema(props: IFormStepProps = {}) {
  return {
    type: 'object',
    properties: {
      steps: {
        'type': 'void',
        'x-component': 'FormStep',
        'x-component-props': props,
        'properties': Object.fromEntries(['first', 'second', 'third'].map(name => [name, {
          'type': 'void',
          'title': name,
          'x-component': 'FormStep.StepPane',
          'x-component-props': { description: `${name} description` },
          'properties': {
            [name]: { 'type': 'string', 'title': name, 'required': true, 'x-decorator': 'FormItem', 'x-component': 'Input', 'x-component-props': { placeholder: name } },
            actions: { 'type': 'void', 'x-component': 'Actions' },
          },
        }])),
      },
    },
  }
}

it('validates before advancing, preserves values and skips inactive panes during validation', async () => {
  const form = createForm()
  const step = FormStep.createFormStep()
  const { container, getByPlaceholder } = await render(<FormProvider form={form}><SchemaField schema={schema({ formStep: step })} /></FormProvider>)
  expect(container.querySelectorAll('input')).toHaveLength(1)
  expect(container.querySelectorAll('.adm-step')).toHaveLength(3)
  expect(step.allowBack).toBe(false)
  expect(step.allowNext).toBe(true)
  await step.next()
  expect(step.current).toBe(0)
  expect(form.errors).toHaveLength(1)
  await getByPlaceholder('first').fill('one')
  await step.next()
  await expect.element(getByPlaceholder('second')).toBeInTheDocument()
  await getByPlaceholder('second').fill('two')
  step.back()
  await expect.element(getByPlaceholder('first')).toHaveValue('one')
  expect(form.query('steps.second').take()?.display).toBe('hidden')
  await step.next()
  await expect.element(getByPlaceholder('second')).toHaveValue('two')
  await step.next()
  await expect.element(getByPlaceholder('third')).toBeInTheDocument()
  await getByPlaceholder('third').fill('three')
  expect(step.allowNext).toBe(false)
  const submit = vi.fn()
  await step.submit(submit)
  expect(submit).toHaveBeenCalledWith({ first: 'one', second: 'two', third: 'three' })
})

it('provides an internal controller and supports markup schemas', async () => {
  const { getByText, getByRole } = await render(
    <FormProvider form={createForm()}>
      <SchemaField>
        <SchemaField.Void name="steps" x-component="FormStep">
          <SchemaField.Void name="one" title="One" x-component="FormStep.StepPane">
            <SchemaField.Void name="actions" x-component="Actions" />
          </SchemaField.Void>
          <SchemaField.Void name="two" title="Two" x-component="FormStep.StepPane">
            <SchemaField.Void name="content" x-component={() => <span>Second pane</span>} />
            <SchemaField.Void name="actions" x-component="Actions" />
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>,
  )
  await getByRole('button', { name: 'Next' }).click()
  await expect.element(getByText('Second pane')).toBeInTheDocument()
  await expect.element(getByRole('button', { name: 'Next' })).toBeDisabled()
  await getByRole('button', { name: 'Back' }).click()
  await expect.element(getByText('Second pane')).not.toBeInTheDocument()
})

it('supports controlled current, hidden steps and native step content', async () => {
  const form = createForm()
  const step = FormStep.createFormStep(2)
  let update!: (props: IFormStepProps) => void
  function ControlledStep() {
    const [props, setProps] = useState<IFormStepProps>({ current: 1, direction: 'vertical' })
    update = setProps
    return <FormStep {...props} formStep={step} />
  }
  const ControlledSchema = createSchemaField({ components: { FormStep: Object.assign(ControlledStep, { StepPane: FormStep.StepPane }), FormItem, Input, Actions } })
  const { container, getByPlaceholder } = await render(<FormProvider form={form}><ControlledSchema schema={schema()} /></FormProvider>)
  expect(step.current).toBe(1)
  expect(container.querySelector('.adm-steps-vertical')).not.toBeNull()
  expect(container.textContent).toContain('first description')
  await expect.element(getByPlaceholder('second')).toBeInTheDocument()
  update({ current: 100, hideSteps: true })
  await vi.waitFor(() => expect(step.current).toBe(2))
  expect(step.current).toBe(2)
  expect(container.querySelector('.adm-steps')).toBeNull()
  await expect.element(getByPlaceholder('third')).toBeInTheDocument()
  update({ current: -1 })
  await vi.waitFor(() => expect(step.current).toBe(0))
  expect(step.current).toBe(0)
})

it('normalizes indices and ignores repeated next calls while validation is pending', async () => {
  const form = createForm()
  const step = FormStep.createFormStep(Number.NaN)
  await render(<FormProvider form={form}><SchemaField schema={schema({ formStep: step })} /></FormProvider>)
  let release!: () => void
  const validate = vi.spyOn(form, 'validate').mockImplementation(() => new Promise<void>((resolve) => {
    release = resolve
  }))
  const first = step.next()
  await step.next()
  expect(validate).toHaveBeenCalledOnce()
  release()
  await first
  expect(step.current).toBe(1)
  step.setCurrent(Number.POSITIVE_INFINITY)
  expect(step.current).toBe(0)
  step.setCurrent(100)
  expect(step.current).toBe(2)
  step.back()
  expect(step.current).toBe(1)
  validate.mockRestore()
})

it('handles an empty schema without allowing navigation', async () => {
  const step = FormStep.createFormStep(100)
  const form = createForm()
  await render(
    <FormProvider form={form}>
      <SchemaField schema={{
        type: 'object',
        properties: { steps: { 'type': 'void', 'x-component': 'FormStep', 'x-component-props': { formStep: step } } },
      }}
      />
    </FormProvider>,
  )
  expect(step.current).toBe(0)
  expect(step.allowNext).toBe(false)
  expect(step.allowBack).toBe(false)
  await step.next()
  step.back()
  expect(step.current).toBe(0)
})

import { createForm } from '@silver-formily/core'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Field, FormProvider } from '../src'

afterEach(cleanup)

it('更新字段值时只刷新 component，decorator 属性变化时仍刷新 decorator', async () => {
  const form = createForm({ values: { choice: 'first' } })

  const decoratorRender = vi.fn()
  const componentRender = vi.fn()

  function Decorator(props: { title?: string, children?: React.ReactNode }) {
    decoratorRender()
    return (
      <section data-testid="value-decorator" data-title={props.title}>
        {props.children}
      </section>
    )
  }

  function ValueInput(props: { value?: string, onChange?: (value: string) => void }) {
    componentRender()
    return (
      <button
        type="button"
        data-testid="value-input"
        onClick={() => {
          props.onChange?.('second')
        }}
      >
        {props.value}
      </button>
    )
  }

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <Field
        name="choice"
        decorator={[Decorator, { title: 'Initial' }]}
        component={[ValueInput]}
      />
    </FormProvider>,
  )

  await expect.element(getByTestId('value-input')).toHaveTextContent('first')
  const initialDecoratorRenders = decoratorRender.mock.calls.length
  const initialComponentRenders = componentRender.mock.calls.length

  // 只改字段值：component 重渲染，decorator 不重渲染
  await getByTestId('value-input').click()
  await expect.element(getByTestId('value-input')).toHaveTextContent('second')
  expect(componentRender.mock.calls.length).toBeGreaterThan(initialComponentRenders)
  expect(decoratorRender).toHaveBeenCalledTimes(initialDecoratorRenders)

  const componentRendersAfterValue = componentRender.mock.calls.length

  // 只改 decorator props：decorator 重渲染，component 不重渲染
  form.query('choice').take()?.setDecoratorProps({ title: 'Updated' })
  await expect
    .element(getByTestId('value-decorator'))
    .toHaveAttribute('data-title', 'Updated')
  expect(decoratorRender.mock.calls.length).toBeGreaterThan(initialDecoratorRenders)
  expect(componentRender).toHaveBeenCalledTimes(componentRendersAfterValue)
})

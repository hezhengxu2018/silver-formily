import type { ReactNode } from 'react'
import { createForm, onFieldInit, onFormValuesChange } from '@silver-formily/core'
import { StrictMode } from 'react'
import { createPortal } from 'react-dom'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Field, FormConsumer, FormProvider, useFormEffects } from '../src'

afterEach(cleanup)

it('renders zero from content and render props', async () => {
  const screen = await render(
    <FormProvider form={createForm()}>
      <Field name="content" content={0} />
      <Field name="children">{() => 0}</Field>
    </FormProvider>,
  )
  expect(screen.container.textContent).toBe('00')
})

it('renders arrays and portals as decorator content instead of prop maps', async () => {
  const portal = document.createElement('div')
  function Decorator({ content, children }: { content?: ReactNode, children?: ReactNode }) {
    return (
      <section>
        {content}
        {children}
      </section>
    )
  }
  const form = createForm()
  const screen = await render(
    <FormProvider form={form}>
      <Field name="array" decorator={[Decorator]} decoratorContent={['help', <span key="x">text</span>]} />
      <Field name="portal" decorator={[Decorator]} decoratorContent={createPortal('portal', portal)} />
    </FormProvider>,
  )
  expect(screen.container.textContent).toBe('helptext')
  expect(portal.textContent).toBe('portal')
  form.query('array').take()!.setDecoratorContent([0, <span key="y">updated</span>])
  await expect.element(screen.getByText('0updated')).toBeVisible()
  await screen.unmount()
  expect(portal.textContent).toBe('')
})

it('allows FormConsumer to return null or an array', async () => {
  const form = createForm()
  const screen = await render(<FormProvider form={form}><FormConsumer>{() => null}</FormConsumer></FormProvider>)
  expect(screen.container.textContent).toBe('')
  await screen.rerender(<FormProvider form={form}><FormConsumer>{() => [<span key="x">text</span>, 0]}</FormConsumer></FormProvider>)
  expect(screen.container.textContent).toBe('text0')
})

it('registers fresh effects when a new FormProvider is mounted and cleans up the old subtree', async () => {
  const first = createForm()
  const second = createForm()
  const changed = vi.fn()
  const initialized = vi.fn()
  const removeFirst = vi.spyOn(first, 'removeEffects')
  const removeSecond = vi.spyOn(second, 'removeEffects')
  function Effects() {
    useFormEffects(() => {
      onFormValuesChange(changed)
      onFieldInit('x', initialized)
    })
    return <Field name="x" />
  }
  const screen = await render(<StrictMode><FormProvider key={first.id} form={first}><Effects /></FormProvider></StrictMode>)
  expect(initialized).toHaveBeenCalledTimes(1)
  first.setValues({ x: 1 })
  expect(changed).toHaveBeenCalledTimes(1)
  await screen.rerender(<StrictMode><FormProvider key={second.id} form={second}><Effects /></FormProvider></StrictMode>)
  expect(initialized).toHaveBeenCalledTimes(2)
  expect(removeFirst).toHaveBeenCalled()
  changed.mockClear()
  second.setValues({ x: 2 })
  expect(changed).toHaveBeenCalledTimes(1)
  await screen.unmount()
  await vi.waitFor(() => expect(removeSecond).toHaveBeenCalled())
})

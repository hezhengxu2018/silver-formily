import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Switch } from '../src'

afterEach(cleanup)

it('waits for beforeChange before updating the field and ignores repeated clicks', async () => {
  let resolve!: () => void
  const beforeChange = vi.fn(() => new Promise<void>((done) => {
    resolve = done
  }))
  const onChange = vi.fn()
  const form = createForm({ initialValues: { enabled: false } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="enabled" component={[Switch, { beforeChange, onChange }]} />
    </FormProvider>,
  )
  const control = screen.getByRole('switch')
  await control.click()
  expect(beforeChange).toHaveBeenCalledWith(true)
  expect(form.values.enabled).toBe(false)
  expect(onChange).not.toHaveBeenCalled()
  expect(control.element().querySelector('.adm-switch-spin-icon')).not.toBeNull()
  // Use a DOM click because a loading switch intentionally blocks user interaction.
  ;(control.element() as HTMLElement).click()
  expect(beforeChange).toHaveBeenCalledTimes(1)
  resolve()
  await expect.poll(() => form.values.enabled).toBe(true)
  expect(onChange).toHaveBeenCalledTimes(1)
})

it.each(['false', 'reject'] as const)('keeps the field value when beforeChange returns %s', async (result) => {
  const onChange = vi.fn()
  const beforeChange = vi.fn(async () => {
    if (result === 'reject')
      throw new Error('Request failed')
    return false
  })
  const form = createForm({ initialValues: { enabled: true } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="enabled" component={[Switch, { beforeChange, onChange }]} />
    </FormProvider>,
  )
  await screen.getByRole('switch').click()
  await expect.poll(() => beforeChange.mock.settledResults[0]?.type).toBe(result === 'reject' ? 'rejected' : 'fulfilled')
  expect(form.values.enabled).toBe(true)
  expect(onChange).not.toHaveBeenCalled()
  await screen.getByRole('switch').click()
  expect(beforeChange).toHaveBeenCalledTimes(2)
})

it('updates synchronously without beforeChange', async () => {
  const form = createForm({ initialValues: { enabled: false } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="enabled" component={[Switch]} />
    </FormProvider>,
  )
  await screen.getByRole('switch').click()
  expect(form.values.enabled).toBe(true)
})

import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Radio } from '../src'

afterEach(cleanup)

it('uses dataSource before options and updates a scalar numeric value', async () => {
  const form = createForm({ initialValues: { choice: 0 } })
  const screen = await render(
    <FormProvider form={form}>
      <Field
        name="choice"
        dataSource={[{ label: '零', value: 0 }, { label: '一', value: 1 }]}
        component={[Radio.Group, { options: ['忽略'] }]}
      />
    </FormProvider>,
  )
  await expect.element(screen.getByText('零').element().closest('label')!.querySelector('input')!).toBeChecked()
  await expect.element(screen.getByText('忽略')).not.toBeInTheDocument()
  await screen.getByText('一').click()
  expect(form.values.choice).toBe(1)
  await expect.element(screen.getByText('零').element().closest('label')!.querySelector('input')!).not.toBeChecked()
  await screen.getByText('一').click()
  expect(form.values.choice).toBe(1)
})

it('supports string options and option and field disabled states', async () => {
  const form = createForm()
  const screen = await render(
    <FormProvider form={form}>
      <Field
        name="choice"
        component={[Radio.Group, {
          options: ['可选', { label: '禁选', value: 'disabled', disabled: true }],
        }]}
      />
      <Field name="frozen" disabled component={[Radio.Group, { options: ['冻结'] }]} />
    </FormProvider>,
  )
  await expect.element(screen.getByText('禁选').element().closest('label')!.querySelector('input')!).toBeDisabled()
  await expect.element(screen.getByText('冻结').element().closest('label')!.querySelector('input')!).toBeDisabled()
  await screen.getByText('可选').click()
  expect(form.values.choice).toBe('可选')
})

it('supports custom Radio children and standalone boolean fields', async () => {
  const form = createForm({ initialValues: { agreed: false, choice: '' } })
  const screen = await render(
    <FormProvider form={form}>
      <Field
        name="choice"
        component={[Radio.Group, {
          children: [<Radio key="a" value="a">甲</Radio>, <Radio key="b" value="b">乙</Radio>],
        }]}
      />
      <Field name="agreed" component={[Radio, { children: '同意' }]} />
    </FormProvider>,
  )
  await screen.getByText('甲').click()
  expect(form.values.choice).toBe('a')
  await screen.getByText('乙').click()
  expect(form.values.choice).toBe('b')
  await screen.getByText('同意').click()
  expect(form.values.agreed).toBe(true)
})

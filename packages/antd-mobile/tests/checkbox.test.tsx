import { createForm } from '@silver-formily/core'
import { ArrayField, Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Checkbox, Switch } from '../src'

afterEach(cleanup)

it('renders checkbox options from field dataSource', async () => {
  const form = createForm()
  const { getByText } = await render(
    <FormProvider form={form}>
      <Field
        name="city"
        title="城市"
        dataSource={[
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
        ]}
        component={[Checkbox.Group]}
      />
    </FormProvider>,
  )

  await expect.element(getByText('北京')).toBeInTheDocument()
  await expect.element(getByText('上海')).toBeInTheDocument()
})

it('checkbox group selection updates array values', async () => {
  const form = createForm()
  const { getByText } = await render(
    <FormProvider form={form}>
      <ArrayField
        name="city"
        dataSource={[
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
        ]}
        component={[Checkbox.Group]}
      />
    </FormProvider>,
  )

  await getByText('北京').click()
  await getByText('上海').click()
  expect(form.values.city).toEqual(['beijing', 'shanghai'])

  await getByText('北京').click()
  expect(form.values.city).toEqual(['shanghai'])
})

it('binds boolean switch values in both directions', async () => {
  const form = createForm({ initialValues: { enabled: true } })
  const { getByRole } = await render(
    <FormProvider form={form}>
      <Field name="enabled" component={[Switch]} />
    </FormProvider>,
  )

  const switchEl = getByRole('switch')
  await expect.element(switchEl).toHaveClass('adm-switch-checked')

  await switchEl.click()
  expect(form.values.enabled).toBe(false)
  await expect.element(switchEl).not.toHaveClass('adm-switch-checked')

  await switchEl.click()
  expect(form.values.enabled).toBe(true)
  await expect.element(switchEl).toHaveClass('adm-switch-checked')
})

it('binds a standalone checkbox boolean and resets its checked state', async () => {
  const form = createForm({ initialValues: { agree: false } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="agree" title="同意协议" component={[Checkbox]} />
    </FormProvider>,
  )
  await screen.getByText('同意协议').click()
  expect(form.values.agree).toBe(true)
  await expect.element(screen.getByText('同意协议').element().closest('label')!.querySelector('input')!).toBeChecked()
  await form.reset()
  await expect.element(screen.getByText('同意协议').element().closest('label')!.querySelector('input')!).not.toBeChecked()
})

it('renders fragment and custom group children without nested checkboxes', async () => {
  const form = createForm({ initialValues: { city: [] as string[] } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="city" component={[Checkbox.Group]}>
        <>
          <Checkbox value="beijing">北京</Checkbox>
          <Checkbox value="shanghai">上海</Checkbox>
        </>
      </Field>
    </FormProvider>,
  )
  expect(document.querySelectorAll('input[type="checkbox"]')).toHaveLength(2)
  expect(document.querySelector('label label')).toBeNull()
  await screen.getByText('北京').click()
  await screen.getByText('上海').click()
  expect(form.values.city).toEqual(['beijing', 'shanghai'])
})

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
        component={[Checkbox]}
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

it('maps numeric switch value to checked state', async () => {
  const form = createForm({ initialValues: { enabled: 1 } })
  const { getByRole } = await render(
    <FormProvider form={form}>
      <Field name="enabled" component={[Switch]} />
    </FormProvider>,
  )

  const switchEl = getByRole('switch')
  await expect.element(switchEl).toHaveClass('adm-switch-checked')

  await switchEl.click()
  expect(form.values.enabled).toBe(false)
})

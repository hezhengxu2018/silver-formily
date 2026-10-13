import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Selector } from '../src'
import { PreviewText } from '../src/preview-text'

afterEach(cleanup)

it('read pretty input renders plain text', async () => {
  const { getByText } = await render(<PreviewText.Input value="silver-formily" />)

  await expect.element(getByText('silver-formily')).toBeInTheDocument()
})

it('read pretty input shows placeholder for empty value', async () => {
  const { getByText } = await render(<PreviewText.Input value="" />)

  await expect.element(getByText('N/A')).toBeInTheDocument()
})

it('read pretty selector maps values to labels from dataSource', async () => {
  const form = createForm({ initialValues: { city: ['beijing', 'shanghai'] } })
  const { getByText } = await render(
    <FormProvider form={form}>
      <Field
        name="city"
        dataSource={[
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '深圳', value: 'shenzhen' },
        ]}
        component={[Selector]}
        pattern="readPretty"
      />
    </FormProvider>,
  )

  await expect.element(getByText('北京')).toBeInTheDocument()
  await expect.element(getByText('上海')).toBeInTheDocument()
})

it('selector renders options in editable mode', async () => {
  const form = createForm()
  const { getByText } = await render(
    <FormProvider form={form}>
      <Field
        name="city"
        dataSource={[
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
        ]}
        component={[Selector]}
      />
    </FormProvider>,
  )

  await getByText('北京').click()
  expect(form.values.city).toEqual(['beijing'])
})

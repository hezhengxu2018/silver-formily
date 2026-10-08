import type React from 'react'
import { createForm } from '@silver-formily/core'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Field, FormConsumer, FormProvider, ObjectField, VoidField } from '../src'
import { useParentForm } from '../src/hooks'

afterEach(cleanup)

it('render form', async () => {
  const form = createForm()
  await render(
    <FormProvider form={form}>
      <FormConsumer>{form => `${form.mounted}`}</FormConsumer>
      <FormConsumer />
    </FormProvider>,
  )
  expect(form.mounted).toBeTruthy()
})

const DisplayParentForm: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = (props) => {
  return <div {...props}>{useParentForm()?.displayName}</div>
}

it('useParentForm', async () => {
  const form = createForm()
  const screen = await render(
    <FormProvider form={form}>
      <ObjectField name="aa">
        <Field name="bb">
          <DisplayParentForm data-testid="111" />
        </Field>
      </ObjectField>
      <VoidField name="cc">
        <Field name="dd">
          <DisplayParentForm data-testid="222" />
        </Field>
      </VoidField>
      <DisplayParentForm data-testid="333" />
    </FormProvider>,
  )

  await expect.element(screen.getByTestId('111')).toHaveTextContent('ObjectField')
  await expect.element(screen.getByTestId('222')).toHaveTextContent('Form')
  await expect.element(screen.getByTestId('333')).toHaveTextContent('Form')
})

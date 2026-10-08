import type { Field as FieldType } from '@silver-formily/core'
import { createForm } from '@silver-formily/core'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import {
  createSchemaField,
  ExpressionScope,
  Field,
  FormProvider,
  useField,
} from '../src'

afterEach(cleanup)

it('expression scope', async () => {
  const Container = (props: any) => {
    return (
      <ExpressionScope value={{ $innerScope: 'this is inner scope value' }}>
        {props.children}
      </ExpressionScope>
    )
  }
  const Input = (props: any) => <div data-testid="test-input">{props.value}</div>
  const SchemaField = createSchemaField({
    components: {
      Container,
      Input,
    },
  })
  const form = createForm()
  const { getByTestId } = await render(
    <FormProvider form={form}>
      <SchemaField scope={{ $outerScope: 'this is outer scope value' }}>
        <SchemaField.Void x-component="Container">
          <SchemaField.String
            name="input"
            x-component="Input"
            x-value="{{$innerScope + ' ' + $outerScope}}"
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>,
  )

  await expect
    .element(getByTestId('test-input'))
    .toHaveTextContent('this is inner scope value this is outer scope value')
})

it('x-compile-omitted', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Input: (props: any) => (
        <div data-testid="input">
          {props.aa}
          {useField().title}
          {props.extra}
        </div>
      ),
    },
  })

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="target"
          x-compile-omitted={['x-component-props']}
          title="{{123 + '321'}}"
          x-component-props={{
            aa: '{{fake}}',
            extra: 'extra',
          }}
          x-component="Input"
        />
        <SchemaField.String name="btn" x-component="Button" />
      </SchemaField>
    </FormProvider>,
  )
  await expect
    .element(getByTestId('input'))
    .toHaveTextContent('{{fake}}123321extra')
})

it('field hidden & visible', async () => {
  const form = createForm({ initialValues: { empty: null } })
  const { getByTestId } = await render(
    <FormProvider form={form}>
      <div data-testid="testid">
        <Field name="empty" component={['input']} />
      </div>
    </FormProvider>,
  )
  await getByTestId('testid').element()
  //
  const empty = form.fields.empty as FieldType
  expect(empty.hidden).toBe(false)
  expect(empty.value).toBe(null)
  empty.hidden = true
  expect(empty.hidden).toBe(true)
  expect(empty.value).toBe(null)
  empty.hidden = false
  expect(empty.hidden).toBe(false)
  expect(empty.value).toBe(null)
  //
  expect(empty.visible).toBe(true)
  expect(empty.value).toBe(null)
  empty.visible = false
  expect(empty.visible).toBe(false)
  expect(empty.value).toBe(undefined)
  empty.visible = true
  expect(empty.visible).toBe(true)
  expect(empty.value).toBe(null)
})

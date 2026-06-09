import type { Form } from '@silver-formily/core'
import { createForm } from '@silver-formily/core'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent } from 'vue'
import { Field, FormConsumer, FormProvider, ObjectField, VoidField } from '../components'
import { useField, useParentForm } from '../hooks'

const TestInput = defineComponent({
  name: 'TestInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const field = useField()

    return () => (
      <input
        {...attrs}
        value={props.modelValue}
        data-testid={field.value?.path?.toString()}
        onInput={(event: Event) => {
          emit('update:modelValue', (event.target as HTMLInputElement).value)
        }}
      />
    )
  },
})

const DisplayParentForm = defineComponent({
  name: 'DisplayParentForm',
  setup(_, { attrs }) {
    const parentForm = useParentForm()

    return () => <div {...attrs}>{parentForm.value?.displayName ?? ''}</div>
  },
})

describe('vue runtime', () => {
  it('应该在 FormProvider 中挂载 form 实例', async () => {
    const form = createForm()

    const screen = await render(() => (
      <FormProvider form={form}>
        <FormConsumer
          v-slots={{
            default: ({ form }: { form: Form }) => `${form.mounted}`,
          }}
        />
      </FormProvider>
    ))

    expect(form.mounted).toBeTruthy()
    await expect.element(screen.getByText('true')).toBeInTheDocument()
  })

  it('应该让 useParentForm 返回最近的对象级父级', async () => {
    const form = createForm()

    const screen = await render(() => (
      <FormProvider form={form}>
        <ObjectField name="aa">
          <Field name="bb">
            <DisplayParentForm data-testid="object-parent" />
          </Field>
        </ObjectField>
        <VoidField name="cc">
          <Field name="dd">
            <DisplayParentForm data-testid="void-parent" />
          </Field>
        </VoidField>
        <DisplayParentForm data-testid="form-parent" />
      </FormProvider>
    ))

    await expect
      .element(screen.getByTestId('object-parent'))
      .toHaveTextContent('ObjectField')
    await expect
      .element(screen.getByTestId('void-parent'))
      .toHaveTextContent('Form')
    await expect
      .element(screen.getByTestId('form-parent'))
      .toHaveTextContent('Form')
  })

  it('应该在嵌套 FormProvider 时清理上层 field 注入', async () => {
    const form = createForm()

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field name="parent">
          <FormProvider form={form}>
            <Field name="inner" component={[TestInput]} />
          </FormProvider>
          <Field name="outer" component={[TestInput]} />
        </Field>
      </FormProvider>
    ))

    expect(form.query('inner').take()?.mounted).toBeTruthy()
    expect(form.query('parent.outer').take()?.mounted).toBeTruthy()
    expect(form.query('parent.inner').take()).toBeUndefined()

    await screen.getByTestId('parent.outer').fill('123')
    await screen.getByTestId('inner').fill('456')

    expect(form.getValuesIn('parent.outer')).toBe('123')
    expect(form.getValuesIn('inner')).toBe('456')
  })

  it('应该让 FormConsumer 跟随表单值变化重新渲染', async () => {
    const form = createForm({
      values: {
        a: 'abc',
      },
    })

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field name="a" component={[TestInput]} />
        <FormConsumer
          v-slots={{
            default: ({ form }: { form: Form }) => (
              <div data-testid="consumer">{JSON.stringify(form.values)}</div>
            ),
          }}
        />
      </FormProvider>
    ))

    await expect
      .element(screen.getByTestId('consumer'))
      .toHaveTextContent('{"a":"abc"}')

    await screen.getByTestId('a').fill('123')

    await expect
      .element(screen.getByTestId('consumer'))
      .toHaveTextContent('{"a":"123"}')
  })
})

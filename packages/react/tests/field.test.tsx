import type { Field as FieldType } from '@silver-formily/core'
import type React from 'react'
import { createForm, isArrayField, isField, isVoidField, onFieldChange, onFieldUnmount } from '@silver-formily/core'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import {
  ArrayField,
  connect,
  Field,
  FormProvider,
  mapProps,
  mapReadPretty,
  ObjectField,
  observer,
  useField,
  useFormEffects,
  VoidField,
} from '../src'
import { ReactiveField } from '../src/components/ReactiveField'
import { expectThrowError } from './shared'

afterEach(cleanup)

type InputProps = {
  value?: string
  onChange?: (...args: any) => void
}

type CustomProps = {
  list?: string[]
}

const Decorator = (props: any) => <div>{props.children}</div>
const Input: React.FC<React.PropsWithChildren<InputProps>> = props => (
  <input
    {...props}
    value={props.value || ''}
    data-testid={useField().path.toString()}
  />
)

const Normal = () => <div></div>

it('render field', async () => {
  const form = createForm()
  const onChange = vi.fn()
  const { getByTestId, unmount } = await render(
    <FormProvider form={form}>
      <Field
        name="aa"
        decorator={[Decorator]}
        component={[Input, { onChange }]}
      />
      <ArrayField name="bb" decorator={[Decorator]}>
        <div data-testid="bb-children"></div>
      </ArrayField>
      <ObjectField name="cc" decorator={[Decorator]}>
        <Field name="mm" decorator={[Decorator]} component={[Input]} />
        <ObjectField name="pp" decorator={[Decorator]} />
        <ArrayField name="tt" decorator={[Decorator]} />
        <VoidField name="ww" />
      </ObjectField>
      <VoidField name="dd" decorator={[Decorator]}>
        {() => (
          <div data-testid="dd-children">
            <Field name="oo" decorator={[Decorator]} component={[Input]} />
          </div>
        )}
      </VoidField>
      <VoidField name="xx" decorator={[Decorator]} component={[Normal]} />
      <Field
        name="ee"
        visible={false}
        decorator={[Decorator]}
        component={[Input]}
      />
      <Field name="ff" decorator={[]} component={[]} />
      <Field name="gg" decorator={null as any} component={null as any} />
      <Field name="hh" decorator={[null as any]} component={[null as any, null as any]} />
      <Field
        name="kk"
        decorator={[Decorator]}
        component={[Input, { onChange: null }]}
      />
    </FormProvider>,
  )
  expect(form.mounted).toBeTruthy()
  expect(form.query('aa').take()?.mounted).toBeTruthy()
  expect(form.query('bb').take()?.mounted).toBeTruthy()
  expect(form.query('cc').take()?.mounted).toBeTruthy()
  expect(form.query('dd').take()?.mounted).toBeTruthy()
  await getByTestId('aa').fill('123')
  await getByTestId('kk').fill('123')
  expect(onChange).toBeCalledTimes(1)
  await expect.element(getByTestId('bb-children')).toBeInTheDocument()
  await expect.element(getByTestId('dd-children')).toBeInTheDocument()
  await expect.element(getByTestId('ee')).not.toBeInTheDocument()
  expect(form.query('aa').get('value')).toEqual('123')
  expect(form.query('kk').get('value')).toEqual('123')
  await unmount()
})

it('render field no context', async () => {
  await expectThrowError(() => {
    return (
      <>
        <Field name="aa">{() => <div></div>}</Field>
        <ArrayField name="bb">
          <div></div>
        </ArrayField>
        <ObjectField name="cc" />
        <VoidField name="dd" />
      </>
    )
  })
})

it('reactiveField', async () => {
  await render(<ReactiveField field={null as any} />)
  await render(<ReactiveField field={null as any}>{() => <div></div>}</ReactiveField>)
})

it('useAttach basic', async () => {
  const form = createForm()
  const MyComponent = (props: any) => {
    return (
      <FormProvider form={form}>
        <Field name={props.name} decorator={[Decorator]} component={[Input]} />
      </FormProvider>
    )
  }
  const { rerender } = await render(<MyComponent name="aa" />)
  expect(form.query('aa').take()?.mounted).toBeTruthy()
  await rerender(<MyComponent name="bb" />)
  await vi.waitFor(() => {
    expect(form.query('aa').take()?.mounted).toBeFalsy()
    expect(form.query('bb').take()?.mounted).toBeTruthy()
  })
})

it('useAttach with array field', async () => {
  const form = createForm()
  const MyComponent = () => {
    return (
      <FormProvider form={form}>
        <ArrayField
          name="array"
          initialValue={[{ input: '11' }, { input: '22' }]}
        >
          {(field) => {
            return field.value.map((val, index) => {
              return (
                <Field
                  key={index}
                  name={`${index}.input`}
                  decorator={[Decorator]}
                  component={[Input]}
                />
              )
            })
          }}
        </ArrayField>
      </FormProvider>
    )
  }
  await render(<MyComponent />)
  await vi.waitFor(() => {
    expect(form.query('array.0.input').take()?.mounted).toBeTruthy()
    expect(form.query('array.1.input').take()?.mounted).toBeTruthy()
  })
  form.query('array').take((field) => {
    if (isArrayField(field)) {
      field.moveDown(0)
    }
  })
  await vi.waitFor(() => {
    expect(form.query('array.0.input').take()?.mounted).toBeTruthy()
    expect(form.query('array.1.input').take()?.mounted).toBeTruthy()
  })
})

it('useFormEffects', async () => {
  const form = createForm()
  const CustomField = observer(() => {
    const field = useField<FieldType>()
    useFormEffects(() => {
      onFieldChange('aa', ['value'], (target) => {
        if (isVoidField(target))
          return
        field.setValue(target.value)
      })
    })
    return <div data-testid="custom-value">{field.value}</div>
  })
  const { getByTestId, rerender } = await render(
    <FormProvider form={form}>
      <Field name="aa" decorator={[Decorator]} component={[Input]} />
      <Field name="bb" component={[CustomField, { tag: 'xxx' }]} />
    </FormProvider>,
  )

  await expect.element(getByTestId('custom-value')).toHaveTextContent('')
  form.query('aa').take((aa) => {
    if (isField(aa)) {
      aa.setValue('123')
    }
  })
  await expect.element(getByTestId('custom-value')).toHaveTextContent('123')
  await rerender(
    <FormProvider form={form}>
      <Field name="aa" decorator={[Decorator]} component={[Input]} />
      <Field name="bb" component={[CustomField, { tag: 'yyy' }]} />
    </FormProvider>,
  )
})

it('connect', async () => {
  const CustomField = connect(
    (props: CustomProps) => {
      return <div>{props.list}</div>
    },
    mapProps({ value: 'list', loading: true }, (props, field) => {
      return {
        ...props,
        mounted: field.mounted ? 1 : 2,
      }
    }),
    mapReadPretty(() => <div>read pretty</div>),
  )
  const BaseComponent = (props: any) => {
    return <div>{props.value}</div>
  }
  BaseComponent.displayName = 'BaseComponent'
  const CustomField2 = connect(
    BaseComponent,
    mapProps({ value: true, loading: true }),
    mapReadPretty(() => <div>read pretty</div>),
  )
  const form = createForm()
  const MyComponent = () => {
    return (
      <FormProvider form={form}>
        <Field name="aa" decorator={[Decorator]} component={[CustomField]} />
        <Field name="bb" decorator={[Decorator]} component={[CustomField2]} />
      </FormProvider>
    )
  }
  const { getByText } = await render(<MyComponent />)
  form.query('aa').take((field) => {
    field.setState((state) => {
      state.value = '123'
    })
  })
  await expect.element(getByText('123')).toBeVisible()

  form.query('aa').take((field) => {
    if (!isField(field))
      return
    field.readPretty = true
  })
  await expect.element(getByText('123')).not.toBeInTheDocument()
  await expect.element(getByText('read pretty')).toBeVisible()
})

it('fields unmount and validate', async () => {
  const fn = vi.fn()
  const form = createForm({
    initialValues: {
      parent: {
        type: 'mounted',
      },
    },
    effects: () => {
      onFieldUnmount('parent.child', () => {
        fn()
      })
    },
  })
  const Parent = observer(() => {
    const field = useField<FieldType>()
    if (field.value.type === 'mounted') {
      return (
        <Field
          name="child"
          component={[Input]}
          validator={{ required: true }}
        />
      )
    }
    return <div data-testid="unmounted"></div>
  })

  const MyComponent = () => {
    return (
      <FormProvider form={form}>
        <Field name="parent" component={[Parent]} />
      </FormProvider>
    )
  }
  await render(<MyComponent />)

  try {
    await form.validate()
  }
  catch {}

  expect(form.invalid).toBeTruthy()

  form.query('parent').take((field) => {
    field.setState((state) => {
      state.value.type = 'unmounted'
    })
  })

  await vi.waitFor(() => {
    expect(fn.mock.calls.length).toBe(1)
  })

  try {
    await form.validate()
  }
  catch {}
  expect(form.invalid).toBeTruthy()
})

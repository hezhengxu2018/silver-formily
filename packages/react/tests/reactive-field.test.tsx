import type { Field as FieldType } from '@silver-formily/core'
import { createForm } from '@silver-formily/core'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Field, FormProvider, observer, useField, VoidField } from '../src'

afterEach(cleanup)

it('更新字段值时只刷新 component，decorator 属性变化时仍刷新 decorator', async () => {
  const form = createForm({ values: { choice: 'first' } })

  const decoratorRender = vi.fn()
  const componentRender = vi.fn()

  function Decorator(props: { title?: string, children?: React.ReactNode }) {
    decoratorRender()
    return (
      <section data-testid="value-decorator" data-title={props.title}>
        {props.children}
      </section>
    )
  }

  function ValueInput(props: { value?: string, onChange?: (value: string) => void }) {
    componentRender()
    return (
      <button
        type="button"
        data-testid="value-input"
        onClick={() => {
          props.onChange?.('second')
        }}
      >
        {props.value}
      </button>
    )
  }

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <Field
        name="choice"
        decorator={[Decorator, { title: 'Initial' }]}
        component={[ValueInput]}
      />
    </FormProvider>,
  )

  await expect.element(getByTestId('value-input')).toHaveTextContent('first')
  const initialDecoratorRenders = decoratorRender.mock.calls.length
  const initialComponentRenders = componentRender.mock.calls.length

  // 只改字段值：component 重渲染，decorator 不重渲染
  await getByTestId('value-input').click()
  await expect.element(getByTestId('value-input')).toHaveTextContent('second')
  expect(componentRender.mock.calls.length).toBeGreaterThan(initialComponentRenders)
  expect(decoratorRender).toHaveBeenCalledTimes(initialDecoratorRenders)

  const componentRendersAfterValue = componentRender.mock.calls.length

  // 只改 decorator props：decorator 重渲染，component 不重渲染
  form.query('choice').take()?.setDecoratorProps({ title: 'Updated' })
  await expect
    .element(getByTestId('value-decorator'))
    .toHaveAttribute('data-title', 'Updated')
  expect(decoratorRender.mock.calls.length).toBeGreaterThan(initialDecoratorRenders)
  expect(componentRender).toHaveBeenCalledTimes(componentRendersAfterValue)
})

it('decorator 通过 useField 消费字段状态时，reactions 切换 required 仍会刷新 decorator', async () => {
  const form = createForm()

  // formily 官方 FormItem 的模式：decorator 自身是 observer，
  // 内部 useField 读取字段状态，刷新不依赖渲染层
  const FormItem = observer((props: { children?: React.ReactNode }) => {
    const field = useField<FieldType>()
    return (
      <section data-testid="required-item" data-required={String(!!field?.required)}>
        {props.children}
      </section>
    )
  })

  function Input(props: { value?: string, onChange?: (value: string) => void }) {
    return (
      <input
        data-testid="required-input"
        value={props.value ?? ''}
        onChange={(event) => {
          props.onChange?.(event.target.value)
        }}
      />
    )
  }

  function Toggle(props: { value?: boolean, onChange?: (value: boolean) => void }) {
    return (
      <input
        type="checkbox"
        data-testid="required-toggle"
        checked={!!props.value}
        onChange={(event) => {
          props.onChange?.(event.target.checked)
        }}
      />
    )
  }

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <Field name="toggle" component={[Toggle]} />
      <Field
        name="input"
        decorator={[FormItem]}
        component={[Input]}
        reactions={(field) => {
          const toggle = field.query('.toggle').get('value')
          ;(field as FieldType).required = !!toggle
        }}
      />
    </FormProvider>,
  )

  await expect
    .element(getByTestId('required-item'))
    .toHaveAttribute('data-required', 'false')

  await getByTestId('required-toggle').click()
  await expect
    .element(getByTestId('required-item'))
    .toHaveAttribute('data-required', 'true')

  await getByTestId('required-toggle').click()
  await expect
    .element(getByTestId('required-item'))
    .toHaveAttribute('data-required', 'false')
})

it('decoratorContent 的字符串内容作为约定 prop content 传给装饰器，setDecoratorContent 更新后自动刷新', async () => {
  const form = createForm()

  function Decorator(props: { content?: React.ReactNode, children?: React.ReactNode }) {
    return (
      <section data-testid="content-decorator">
        <span data-testid="decorator-content">{props.content}</span>
        {props.children}
      </section>
    )
  }

  function Input(props: { value?: string, onChange?: (value: string) => void }) {
    return (
      <input
        data-testid="content-input"
        value={props.value ?? ''}
        onChange={(event) => {
          props.onChange?.(event.target.value)
        }}
      />
    )
  }

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <Field
        name="input"
        decorator={[Decorator]}
        component={[Input]}
        decoratorContent="帮助文案"
      />
    </FormProvider>,
  )

  await expect.element(getByTestId('decorator-content')).toHaveTextContent('帮助文案')

  form.query('input').take()?.setDecoratorContent('更新后的文案')
  await expect.element(getByTestId('decorator-content')).toHaveTextContent('更新后的文案')
})

it('decoratorContent 的对象映射展开为装饰器 props，与 x-decorator-props 同名时优先', async () => {
  const form = createForm()

  function Decorator(props: {
    addon?: React.ReactNode
    extra?: string
    title?: string
    children?: React.ReactNode
  }) {
    return (
      <section
        data-testid="mapped-decorator"
        data-addon={typeof props.addon === 'string' ? props.addon : undefined}
        data-extra={props.extra}
        data-title={props.title}
      >
        {props.children}
      </section>
    )
  }

  function Input(props: { value?: string, onChange?: (value: string) => void }) {
    return (
      <input
        data-testid="mapped-input"
        value={props.value ?? ''}
        onChange={(event) => {
          props.onChange?.(event.target.value)
        }}
      />
    )
  }

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <Field
        name="input"
        decorator={[Decorator, { title: '来自 decoratorProps', extra: '被内容覆盖' }]}
        component={[Input]}
        decoratorContent={{ addon: '附加内容', extra: '来自 decoratorContent' }}
      />
    </FormProvider>,
  )

  await expect.element(getByTestId('mapped-decorator')).toHaveAttribute('data-addon', '附加内容')
  // decoratorProps 未涉及的 prop 原样保留
  await expect.element(getByTestId('mapped-decorator')).toHaveAttribute('data-title', '来自 decoratorProps')
  // 同名时 decoratorContent 优先
  await expect.element(getByTestId('mapped-decorator')).toHaveAttribute('data-extra', '来自 decoratorContent')
})


it('field events update the model before invoking the latest component callback', async () => {
  const form = createForm()
  type Events = {
    onChange?: (...args: any[]) => void
    onFocus?: (...args: any[]) => void
    onBlur?: (...args: any[]) => void
  }
  let handlers: Events = {}
  function Input(props: Events) {
    handlers = props
    return null
  }
  const changes: unknown[] = []
  const focusStates: (boolean | undefined)[] = []
  await render(
    <FormProvider form={form}>
      <Field
        name="input"
        component={[Input, {
          onChange: () => changes.push('old'),
          onFocus: () => focusStates.push(form.query('input').get('active')),
          onBlur: () => focusStates.push(form.query('input').get('active')),
        }]}
      />
    </FormProvider>,
  )
  const field = form.query('input').take()!
  // A handler retained by the input must read current props, not a stale closure.
  const change = handlers.onChange!
  field.setComponentProps({ onChange: (...args: unknown[]) => changes.push([form.values.input, ...args]) })
  change('updated', 'extra')
  expect(changes).toEqual([['updated', 'updated', 'extra']])
  handlers.onFocus!()
  handlers.onBlur!()
  expect(focusStates).toEqual([true, false])
})

it('void fields pass event callbacks through without adding value or pattern state', async () => {
  const onChange = vi.fn()
  const onFocus = vi.fn()
  const onBlur = vi.fn()
  let received: Record<string, unknown> = {}
  function Content(props: Record<string, unknown>) {
    received = props
    return null
  }
  await render(
    <FormProvider form={createForm()}>
      <VoidField name="layout" pattern="disabled" component={[Content, { onChange, onFocus, onBlur }]} />
    </FormProvider>,
  )
  expect(received.onChange).toBe(onChange)
  expect(received.onFocus).toBe(onFocus)
  expect(received.onBlur).toBe(onBlur)
  expect(received.value).toBeUndefined()
  expect(received.disabled).toBeUndefined()
  expect(received.readOnly).toBeUndefined()
})

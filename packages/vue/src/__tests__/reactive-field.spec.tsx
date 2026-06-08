import { createForm } from '@silver-formily/core'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, ref } from 'vue'
import ArrayField from '../components/ArrayField'
import Field from '../components/Field'
import FormProvider from '../components/FormProvider'
import ReactiveField from '../components/ReactiveField'

const ArrayProbe = defineComponent({
  name: 'ArrayProbe',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return () => (
      <div data-testid="array-probe">{`length:${props.modelValue.length}`}</div>
    )
  },
})

const Decorator = defineComponent({
  name: 'Decorator',
  setup(_, { slots }) {
    return () => <section data-testid="decorator">{slots.default?.()}</section>
  },
})

const SlotOutlet = defineComponent({
  name: 'SlotOutlet',
  setup(_, { slots }) {
    return () => (
      <div>
        <div data-testid="slot-default">{slots.default?.({ suffix: 'slot' })}</div>
        <div data-testid="slot-addon">{slots.addon?.({ suffix: 'picked', ignored: 'x' })}</div>
      </div>
    )
  },
})

const ScopedAddon = defineComponent({
  name: 'ScopedAddon',
  props: {
    suffix: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => <span data-testid="scoped-addon">{props.suffix}</span>
  },
})

const DecoratorWithAddon = defineComponent({
  name: 'DecoratorWithAddon',
  setup(_, { slots }) {
    return () => (
      <section data-testid="decorator-with-addon">
        <div data-testid="decorator-main">{slots.default?.()}</div>
        <div data-testid="decorator-addon">{slots.addon?.({ suffix: 'decorator' })}</div>
      </section>
    )
  },
})

const SwitchProbe = defineComponent({
  name: 'SwitchProbe',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => <div data-testid="switch-probe">{props.modelValue}</div>
  },
})

describe('reactive field branches', () => {
  it('应该在没有 field 实例时回退渲染默认插槽', async () => {
    const screen = await render(() => (
      <ReactiveField
        fieldType="Field"
        fieldProps={{}}
        v-slots={{
          default: () => <div data-testid="reactive-fallback">fallback</div>,
        }}
      />
    ))

    await expect
      .element(screen.getByTestId('reactive-fallback'))
      .toHaveTextContent('fallback')
  })

  it('应该在没有 component 时渲染默认插槽，并在隐藏时不渲染', async () => {
    const form = createForm()

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field name="plain">
          <div data-testid="plain-slot">plain slot</div>
        </Field>
        <Field name="hidden" display="none">
          <div data-testid="hidden-slot">hidden slot</div>
        </Field>
      </FormProvider>
    ))

    await expect
      .element(screen.getByTestId('plain-slot'))
      .toHaveTextContent('plain slot')
    expect(screen.container.querySelector('[data-testid="hidden-slot"]')).toBeNull()
  })

  it('应该让 ArrayField 走到数组字段组件分支', async () => {
    const form = createForm({
      values: {
        list: ['a', 'b'],
      },
    })

    const screen = await render(() => (
      <FormProvider form={form}>
        <ArrayField name="list" component={[ArrayProbe]} />
      </FormProvider>
    ))

    await expect
      .element(screen.getByTestId('array-probe'))
      .toHaveTextContent('length:2')
  })

  it('应该让 ReactiveField 通过 decorator 包裹组件内容', async () => {
    const form = createForm({
      values: {
        wrapped: 'hello',
      },
    })

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field
          name="wrapped"
          decorator={[Decorator]}
          component={[defineComponent({
            name: 'WrappedInput',
            props: {
              modelValue: {
                type: String,
                default: '',
              },
            },
            setup(props) {
              return () => <div data-testid="wrapped-input">{props.modelValue}</div>
            },
          })]}
        />
      </FormProvider>
    ))

    await expect.element(screen.getByTestId('decorator')).toBeInTheDocument()
    await expect
      .element(screen.getByTestId('wrapped-input'))
      .toHaveTextContent('hello')
  })

  it('应该通过真实字段渲染路径合并 content 的字符串和命名组件插槽', async () => {
    const form = createForm()

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field
          name="slotField"
          component={[SlotOutlet]}
          content={{
            default: 'extra text',
            addon: ScopedAddon,
          }}
        />
      </FormProvider>
    ))

    await expect
      .element(screen.getByTestId('slot-default'))
      .toHaveTextContent('extra text')
    await expect
      .element(screen.getByTestId('scoped-addon'))
      .toHaveTextContent('picked')
  })

  it('应该在没有组件时通过 content 文本渲染默认内容', async () => {
    const form = createForm()

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field name="contentOnly" content="tail text" />
      </FormProvider>
    ))

    expect(screen.container.textContent).toContain('tail text')
  })

  it('应该通过 decoratorContent 真实注入装饰器命名插槽', async () => {
    const form = createForm({
      values: {
        decorated: 'value',
      },
    })

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field
          name="decorated"
          decorator={[DecoratorWithAddon]}
          decoratorContent={{ addon: ScopedAddon }}
          component={[defineComponent({
            name: 'DecoratorContentInput',
            props: {
              modelValue: {
                type: String,
                default: '',
              },
            },
            setup(props) {
              return () => <span data-testid="decorator-content-input">{props.modelValue}</span>
            },
          })]}
        />
      </FormProvider>
    ))

    await expect
      .element(screen.getByTestId('decorator-main'))
      .toHaveTextContent('value')
    await expect
      .element(screen.getByTestId('decorator-addon'))
      .toHaveTextContent('decorator')
  })

  it('应该在字段配置变更时触发旧字段卸载并挂载新字段', async () => {
    const form = createForm()

    const screen = await render(defineComponent({
      setup() {
        const currentName = ref('first')
        return () => (
          <FormProvider form={form}>
            <button
              data-testid="swap-field"
              onClick={() => {
                currentName.value = 'second'
              }}
            >
              swap
            </button>
            <Field name={currentName.value} component={[SwitchProbe]} />
          </FormProvider>
        )
      },
    }))

    expect(form.query('first').take()?.mounted).toBeTruthy()

    await screen.getByTestId('swap-field').click()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(form.query('first').take()?.unmounted).toBeTruthy()
    expect(form.query('second').take()?.mounted).toBeTruthy()
  })
})

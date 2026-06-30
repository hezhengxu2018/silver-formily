import type { Form } from '@silver-formily/core'
import { createForm } from '@silver-formily/core'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, provide, ref } from 'vue'
import { createSchemaField, Field, FormProvider } from '../components'
import { useFieldSchema, useFormEffects } from '../hooks'
import { connect, mapProps, mapReadPretty } from '../shared/connect'
import { FormSymbol } from '../shared/context'
import { extractAttrsAndEvents } from '../utils/reactiveFieldHelpers'

const SchemaProbe = defineComponent({
  name: 'SchemaProbe',
  setup() {
    const schemaRef = useFieldSchema()
    return () => <div data-testid="schema-probe">{String(schemaRef.value?.name ?? '')}</div>
  },
})

const BaseInput = defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => (
      <div>
        <input
          data-testid="connected-input"
          value={props.modelValue}
          onInput={(event: Event) => {
            emit('update:modelValue', (event.target as HTMLInputElement).value)
          }}
        />
        <div data-testid="connected-meta">{`${props.text}|${props.label}|${props.extra}`}</div>
      </div>
    )
  },
})

const PrettyText = defineComponent({
  name: 'PrettyText',
  props: {
    text: {
      type: String,
      default: '',
    },
    preview: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <div data-testid="pretty-text">{`${props.text}|${props.preview}|${props.extra}`}</div>
    )
  },
})

const ConnectedInput = connect(
  BaseInput,
  mapReadPretty(PrettyText, { preview: 'pretty' }),
  mapProps(
    {
      value: 'text',
      title: 'label',
    },
    props => ({ ...props, extra: 'mapped' }),
  ),
)

const AnonymousConnected = connect(
  defineComponent({
    props: {
      label: {
        type: String,
        default: '',
      },
    },
    setup(props, { attrs }) {
      return () => (
        <button data-testid="anonymous-connected" {...attrs}>
          {props.label}
        </button>
      )
    },
  }),
  mapProps({
    title: 'label',
  }),
)

const AttrProbe = defineComponent({
  name: 'AttrProbe',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs }) {
    return () => (
      <button data-testid="attr-probe" {...attrs}>
        {props.label}
      </button>
    )
  },
})

const ConnectedAttrProbe = connect(
  AttrProbe,
  mapProps({
    title: 'label',
    required: true,
    validateStatus: true,
  }),
)

const AttrForwardWrapper = defineComponent({
  name: 'AttrForwardWrapper',
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () => (
      <button
        data-testid="attr-forward-wrapper"
        data-custom={String(attrs['data-custom'] ?? '')}
        data-feedback-text={String(attrs.feedbackText ?? '')}
        data-feedback-status={String(attrs.feedbackStatus ?? '')}
      >
        {String(attrs.label ?? '')}
      </button>
    )
  },
})

const ConnectedAttrForwardWrapper = connect(
  AttrForwardWrapper,
  mapProps(
    {
      title: 'label',
    },
    () => ({
      feedbackText: 'Mapped feedback',
      feedbackStatus: 'error',
    }),
  ),
)

const AttrBridgeTarget = defineComponent({
  name: 'AttrBridgeTarget',
  props: {
    label: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
    feedbackText: {
      type: String,
      default: '',
    },
    feedbackStatus: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <div data-testid="attr-bridge-target">
        {`${props.label}|${props.extra}|${props.feedbackText}|${props.feedbackStatus}`}
      </div>
    )
  },
})

const AttrBridgeWrapper = defineComponent({
  name: 'AttrBridgeWrapper',
  inheritAttrs: false,
  props: {
    mode: {
      type: String,
      default: 'default',
    },
  },
  setup(props, { attrs }) {
    return () => (
      <div data-testid="attr-bridge-wrapper" data-mode={props.mode}>
        <AttrBridgeTarget {...attrs} />
      </div>
    )
  },
})

const ConnectedAttrBridgeWrapper = connect(
  AttrBridgeWrapper,
  mapProps(
    {
      title: 'label',
      description: 'extra',
    },
    () => ({
      feedbackText: 'Bridge feedback',
      feedbackStatus: 'warning',
    }),
  ),
)

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    SchemaProbe,
  },
})

const EffectsConsumer = defineComponent({
  name: 'EffectsConsumer',
  props: {
    effects: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    useFormEffects(props.effects as (form: Form) => void)
    return () => <div data-testid="effects-consumer" />
  },
})

describe('runtime helpers', () => {
  it('应该保留普通 on* 属性而只提取真实事件', () => {
    const handleClick = vi.fn()
    const { attrs, events } = extractAttrsAndEvents({
      'online': true,
      'onboard': 'plain-text-prop',
      'onClick': handleClick,
      '@focus': handleClick,
    })

    expect(attrs.online).toBe(true)
    expect(attrs.onboard).toBe('plain-text-prop')
    expect(events.click).toBe(handleClick)
    expect(events.focus).toBe(handleClick)
  })

  it('应该展开旧式 attrs/on 并避免 attrs 或 on 作为 DOM 属性透传', () => {
    const handleClick = vi.fn()
    const handleFocus = vi.fn()
    const { attrs, events } = extractAttrsAndEvents({
      attrs: {
        'id': 'legacy-id',
        'data-testid': 'legacy-probe',
      },
      on: {
        'click': handleClick,
        '@focus': handleFocus,
      },
    })

    expect(attrs).toEqual({
      'id': 'legacy-id',
      'data-testid': 'legacy-probe',
    })
    expect(events.click).toBe(handleClick)
    expect(events.focus).toBe(handleFocus)
  })

  it('应该让 useFieldSchema 读取当前字段 schema', async () => {
    const form = createForm()

    const screen = await render(() => (
      <FormProvider form={form}>
        <SchemaField>
          <SchemaStringField name="username" x-component="SchemaProbe" />
        </SchemaField>
      </FormProvider>
    ))

    await expect.element(screen.getByTestId('schema-probe')).toHaveTextContent('username')
  })

  it('应该让 useFormEffects 注册并在卸载时清理 effects', async () => {
    const addEffects = vi.fn()
    const removeEffects = vi.fn()
    const fakeForm = {
      addEffects,
      removeEffects,
    } as unknown as Form
    const effect = vi.fn()

    const screen = await render(
      defineComponent({
        setup() {
          provide(FormSymbol, ref(fakeForm) as any)
          return () => <EffectsConsumer effects={effect} />
        },
      }),
    )

    expect(addEffects).toHaveBeenCalledTimes(1)
    expect(addEffects).toHaveBeenCalledWith(expect.any(String), effect)

    screen.unmount()

    expect(removeEffects).toHaveBeenCalledTimes(1)
    expect(removeEffects).toHaveBeenCalledWith(addEffects.mock.calls[0][0])
  })

  it('应该支持 connect 的属性映射和 readPretty 切换', async () => {
    const form = createForm({
      values: {
        editable: 'abc',
        preview: 'xyz',
      },
    })

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field name="editable" title="Editable" component={[ConnectedInput]} />
        <Field
          name="preview"
          title="Preview"
          pattern="readPretty"
          component={[ConnectedInput]}
        />
      </FormProvider>
    ))

    await expect
      .element(screen.getByTestId('connected-meta'))
      .toHaveTextContent('abc|Editable|mapped')
    await expect
      .element(screen.getByTestId('pretty-text'))
      .toHaveTextContent('xyz|pretty|mapped')

    await screen.getByTestId('connected-input').fill('updated')

    expect(form.getValuesIn('editable')).toBe('updated')
  })

  it('应该在真实渲染中保留 connect 的原始 attrs 和匿名组件 fallback', async () => {
    const handleClick = vi.fn()

    const screen = await render(
      defineComponent({
        setup() {
          return () =>
            h(AnonymousConnected as any, {
              label: 'plain label',
              class: 'plain-class',
              onClick: handleClick,
            })
        },
      }),
    )

    await screen.getByTestId('anonymous-connected').click()

    expect(handleClick).toHaveBeenCalled()
    await expect
      .element(screen.getByTestId('anonymous-connected'))
      .toHaveTextContent('plain label')
    expect(screen.container.querySelector('.plain-class')).toBeTruthy()
  })

  it('应该在字段值缺失时保留 connect 传入的原始属性', async () => {
    const form = createForm({
      values: {
        plain: 'value only',
      },
    })

    const screen = await render(
      defineComponent({
        setup() {
          return () => (
            <FormProvider form={form}>
              {h(Field as any, {
                name: 'plain',
                label: 'manual label',
                component: [connect(
                  BaseInput,
                  mapProps({
                    value: 'text',
                    title: 'label',
                  }),
                )],
              })}
            </FormProvider>
          )
        },
      }),
    )

    await expect
      .element(screen.getByTestId('connected-meta'))
      .toHaveTextContent('value only|manual label|')
  })

  it('应该过滤 mapProps 新增但目标组件未声明的 props，同时保留原始 attrs', async () => {
    const form = createForm()

    const screen = await render(
      defineComponent({
        setup() {
          return () => (
            <FormProvider form={form}>
              <Field
                name="probe"
                title="Mapped Label"
                required
                component={[ConnectedAttrProbe, {
                  'class': 'kept-class',
                  'data-custom': 'kept',
                }]}
              />
            </FormProvider>
          )
        },
      }),
    )

    const probe = screen.getByTestId('attr-probe').element()

    await expect.element(screen.getByTestId('attr-probe')).toHaveTextContent('Mapped Label')
    expect(probe.classList.contains('kept-class')).toBe(true)
    expect(probe.getAttribute('data-custom')).toBe('kept')
    expect(probe.hasAttribute('required')).toBe(false)
    expect(probe.hasAttribute('validateStatus')).toBe(false)
    expect(probe.hasAttribute('validate-status')).toBe(false)
  })

  it('应该保留 inheritAttrs false 组件新增的 mapProps attrs 以支持继续透传', async () => {
    const form = createForm()

    const screen = await render(
      defineComponent({
        setup() {
          return () => (
            <FormProvider form={form}>
              <Field
                name="probe"
                title="Mapped Label"
                component={[ConnectedAttrForwardWrapper, {
                  'data-custom': 'kept',
                }]}
              />
            </FormProvider>
          )
        },
      }),
    )

    const probe = screen.getByTestId('attr-forward-wrapper').element()

    await expect.element(screen.getByTestId('attr-forward-wrapper')).toHaveTextContent('Mapped Label')
    expect(probe.getAttribute('data-custom')).toBe('kept')
    expect(probe.getAttribute('data-feedback-text')).toBe('Mapped feedback')
    expect(probe.getAttribute('data-feedback-status')).toBe('error')
  })

  it('应该支持中间包装组件消费自身 props 并继续透传 mapProps 字段', async () => {
    const form = createForm()

    const screen = await render(
      defineComponent({
        setup() {
          return () => (
            <FormProvider form={form}>
              <Field
                name="bridge"
                title="Bridge Label"
                description="Bridge Extra"
                component={[ConnectedAttrBridgeWrapper, {
                  mode: 'advanced',
                }]}
              />
            </FormProvider>
          )
        },
      }),
    )

    await expect.element(screen.getByTestId('attr-bridge-wrapper')).toHaveAttribute('data-mode', 'advanced')
    await expect.element(screen.getByTestId('attr-bridge-target')).toHaveTextContent(
      'Bridge Label|Bridge Extra|Bridge feedback|warning',
    )
  })
})

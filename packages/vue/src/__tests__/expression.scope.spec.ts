import { createForm } from '@silver-formily/core'
import { Schema } from '@silver-formily/json-schema'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h } from 'vue'
import { createSchemaField, ExpressionScope, FormProvider } from '../components'

const Container = defineComponent({
  name: 'ExpressionScopeContainer',
  inheritAttrs: false,
  setup(_, { slots }) {
    return () =>
      h(ExpressionScope, { value: { $innerScope: 'inner scope value' } }, slots)
  },
})

const Input = defineComponent({
  name: 'ExpressionScopeInput',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => h('div', { 'data-testid': 'expression-scope-input' }, props.text)
  },
})

const { SchemaField, SchemaStringField, SchemaVoidField } = createSchemaField({
  components: {
    Container,
    Input,
  },
})

describe('expression scope', () => {
  it('应该支持基础 markup schema 渲染', async () => {
    const form = createForm()
    const schema = new Schema({
      type: 'object',
    })

    const screen = await render(
      defineComponent({
        setup() {
          return () =>
            h(FormProvider, { form }, {
              default: () => [
                h(SchemaField, { schema }, {
                  default: () => [
                    h(SchemaStringField, {
                      'name': 'basicInput',
                      'x-component': 'Input',
                    }),
                  ],
                }),
              ],
            })
        },
      }),
    )

    expect(schema.properties?.basicInput).toBeDefined()
    expect(schema.properties?.basicInput?.['x-component']).toBe('Input')

    await expect
      .element(screen.getByTestId('expression-scope-input'))
      .toHaveTextContent('')
  })

  it('应该合并内外层 schema 作用域表达式', async () => {
    const form = createForm()

    const screen = await render(
      defineComponent({
        setup() {
          return () =>
            h(FormProvider, { form }, {
              default: () => [
                h(SchemaField, {
                  scope: { $outerScope: 'outer scope value' },
                }, {
                  default: () => [
                    h(SchemaVoidField, { 'name': 'container', 'x-component': 'Container' }, {
                      default: () => [
                        h(SchemaStringField, {
                          'name': 'content',
                          'x-component': 'Input',
                          'x-component-props': {
                            text: '{{$innerScope + $outerScope}}',
                          },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
        },
      }),
    )

    await expect
      .element(screen.getByTestId('expression-scope-input'))
      .toHaveTextContent('inner scope valueouter scope value')
  })
})

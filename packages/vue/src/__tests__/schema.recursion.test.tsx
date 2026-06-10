import type { Component, PropType } from 'vue'
import { createForm } from '@silver-formily/core'
import { Schema } from '@silver-formily/json-schema'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, markRaw, provide, ref, shallowRef } from 'vue'
import { createSchemaField, Field, FormProvider, RecursionField } from '../components'
import { SchemaExpressionScopeSymbol, SchemaOptionsSymbol } from '../shared'

const Input = defineComponent({
  name: 'SchemaRecursionInput',
  setup() {
    return () => <div data-testid="schema-recursion-input">input</div>
  },
})

const AltInput = defineComponent({
  name: 'SchemaRecursionAltInput',
  setup() {
    return () => <div data-testid="schema-recursion-alt-input">alt-input</div>
  },
})

const RecursionHarness = defineComponent({
  name: 'RecursionHarness',
  props: {
    schema: {
      type: Object as PropType<any>,
      required: true,
    },
    name: {
      type: String,
      default: undefined,
    },
    onlyRenderProperties: {
      type: Boolean,
      default: false,
    },
    onlyRenderSelf: {
      type: Boolean,
      default: false,
    },
    mapProperties: {
      type: Function as PropType<any>,
      default: undefined,
    },
    filterProperties: {
      type: Function as PropType<any>,
      default: undefined,
    },
    basePath: {
      type: String,
      default: undefined,
    },
    componentsMap: {
      type: Object as PropType<Record<string, Component>>,
      default: () => ({}),
    },
  },
  setup(props) {
    provide(SchemaOptionsSymbol, shallowRef({ components: markRaw(props.componentsMap) }) as any)
    provide(SchemaExpressionScopeSymbol, ref({}))

    return () => (
      <RecursionField
        schema={props.schema}
        name={props.name}
        onlyRenderProperties={props.onlyRenderProperties}
        onlyRenderSelf={props.onlyRenderSelf}
        mapProperties={props.mapProperties}
        filterProperties={props.filterProperties}
        basePath={props.basePath}
      />
    )
  },
})

describe('schema and recursion combinations', () => {
  it('应该在脱离 SchemaField 时拒绝渲染 RecursionField', async () => {
    expect(() => render(() => <RecursionField schema={{ type: 'string' }} />))
      .toThrow('RecursionField must be used under SchemaField.')
  })

  it('应该支持 RecursionField 的 onlyRenderProperties、mapProperties 和 filterProperties 组合', async () => {
    const form = createForm()
    const schema = new Schema({
      type: 'void',
      properties: {
        keep: {
          'type': 'string',
          'x-component': 'Input',
        },
        drop: {
          'type': 'string',
          'x-component': 'Input',
        },
      },
    })

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field name="host">
          <RecursionHarness
            name="section"
            schema={schema}
            onlyRenderProperties
            componentsMap={{ Input, AltInput }}
            mapProperties={(item: Schema, name: string) =>
              name === 'keep'
                ? new Schema({
                    ...item.toJSON(),
                    'x-component': 'AltInput',
                  })
                : item}
            filterProperties={(_item: Schema, name: string) => name !== 'drop'}
          />
        </Field>
      </FormProvider>
    ))

    await expect
      .element(screen.getByTestId('schema-recursion-alt-input'))
      .toBeInTheDocument()
    expect(screen.container.querySelector('[data-testid="schema-recursion-input"]')).toBeNull()
    expect(form.query('host.section.keep').take()?.mounted).toBeTruthy()
    expect(form.query('host.section.drop').take()).toBeUndefined()
  })

  it('应该在 onlyRenderSelf 时跳过属性渲染', async () => {
    const form = createForm()

    const screen = await render(() => (
      <FormProvider form={form}>
        <Field name="host">
          <RecursionHarness
            schema={{
              type: 'object',
              properties: {
                hidden: {
                  'type': 'string',
                  'x-component': 'Input',
                },
              },
            }}
            onlyRenderSelf
            componentsMap={{ Input }}
          />
        </Field>
      </FormProvider>
    ))

    expect(screen.container.textContent).toBe('')
    expect(form.query('host.hidden').take()).toBeUndefined()
  })

  it('应该支持 SchemaField 的数组 markup 组合', async () => {
    const form = createForm()
    const schema = new Schema({
      type: 'object',
    })
    const { SchemaField, SchemaArrayField, SchemaStringField } = createSchemaField()

    await render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema}>
          <SchemaArrayField name="list">
            <SchemaStringField name="itemValue" />
          </SchemaArrayField>
        </SchemaField>
      </FormProvider>
    ))

    const listSchema = schema.properties?.list
    expect(listSchema?.type).toBe('array')
    expect(Array.isArray(listSchema?.items)).toBe(false)
    expect((listSchema?.items as Schema | undefined)?.type).toBe('string')
    expect((listSchema?.items as Schema | undefined)?.name).toBe('itemValue')
  })

  it('应该为未命名的 markup 字段生成默认名称', async () => {
    const form = createForm()
    const schema = new Schema({
      type: 'object',
    })
    const { SchemaField, SchemaStringField } = createSchemaField()

    await render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema}>
          <SchemaStringField />
        </SchemaField>
      </FormProvider>
    ))

    const generatedKey = Object.keys(schema.properties ?? {}).find(key =>
      key.startsWith('NO_NAME_FIELD_$'))
    expect(generatedKey).toBeTruthy()
    expect(schema.properties?.[generatedKey!]?.type).toBe('string')
  })

  it('应该在 markup props 变化时同步更新 schema', async () => {
    const form = createForm()
    const schema = new Schema({
      type: 'object',
    })
    const { SchemaField, SchemaStringField } = createSchemaField()

    const screen = await render(defineComponent({
      setup() {
        const title = ref('first title')
        return () => (
          <FormProvider form={form}>
            <button
              data-testid="update-markup-title"
              onClick={() => {
                title.value = 'second title'
              }}
            >
              update
            </button>
            <SchemaField schema={schema}>
              <SchemaStringField name="username" title={title.value} />
            </SchemaField>
          </FormProvider>
        )
      },
    }))

    expect(schema.properties?.username?.title).toBe('first title')

    await screen.getByTestId('update-markup-title').click()

    expect(schema.properties?.username?.title).toBe('second title')
  })

  it('应该在父级重渲染后为新增未命名字段保持唯一名称', async () => {
    const form = createForm()
    const schema = new Schema({
      type: 'object',
    })
    const { SchemaField, SchemaStringField } = createSchemaField()

    const screen = await render(defineComponent({
      setup() {
        const showExtra = ref(false)
        return () => (
          <FormProvider form={form}>
            <button
              data-testid="toggle-anonymous"
              onClick={() => {
                showExtra.value = true
              }}
            >
              toggle
            </button>
            <SchemaField schema={schema}>
              <SchemaStringField />
              {showExtra.value ? <SchemaStringField /> : null}
            </SchemaField>
          </FormProvider>
        )
      },
    }))

    expect(Object.keys(schema.properties ?? {})).toHaveLength(1)

    await screen.getByTestId('toggle-anonymous').click()

    const generatedKeys = Object.keys(schema.properties ?? {})
    expect(generatedKeys).toHaveLength(2)
    expect(new Set(generatedKeys).size).toBe(2)
  })

  it('应该允许独立的 markup 字段在没有父 schema 时静默返回空', async () => {
    const { SchemaStringField } = createSchemaField()

    const screen = await render(() => <SchemaStringField name="standalone" />)

    expect(screen.container.textContent).toBe('')
  })
})

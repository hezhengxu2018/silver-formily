import type { ISchema } from '@formily/json-schema'
import type { QueryFormVisibleContext } from '../types'
import { createForm } from '@formily/core'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h } from 'vue'
import { QueryForm } from '../../index'
import 'element-plus/theme-chalk/index.css'

function createInputSchema(count = 2): ISchema {
  const properties: Record<string, ISchema> = {}
  for (let i = 1; i <= count; i++) {
    const name = `field${i}`
    properties[name] = {
      'type': 'string',
      'title': `Field ${i}`,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    }
  }
  return {
    type: 'object',
    properties,
  }
}

describe('queryForm', () => {
  it('should render schema fields and default actions', async () => {
    const form = createForm()
    const { container, getByRole } = render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(2)}
        submitText="Search"
        resetText="Reset"
      />
    ))

    await expect.element(getByRole('button', { name: 'Search' })).toBeInTheDocument()
    await expect.element(getByRole('button', { name: 'Reset' })).toBeInTheDocument()
    expect(container.querySelectorAll('input')).toHaveLength(2)
  })

  it('should render default slot content with higher priority than schema', async () => {
    const form = createForm()
    const { container } = render(() => (
      <QueryForm form={form} schema={createInputSchema(2)}>
        <div data-testid="custom-content">custom-content</div>
      </QueryForm>
    ))

    await vi.waitFor(() => {
      expect(container.querySelector('[data-testid="custom-content"]')).not.toBeNull()
    })
    expect(container.querySelectorAll('input')).toHaveLength(0)
  })

  it('should support disabling default submit and reset buttons', async () => {
    const form = createForm()
    const { container } = render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(2)}
        showSubmit={false}
        showReset={false}
        submitText="Search"
        resetText="Reset"
      />
    ))

    expect(container.textContent ?? '').not.toContain('Search')
    expect(container.textContent ?? '').not.toContain('Reset')
  })

  it('should toggle collapse and expand for multi-row schema', async () => {
    const form = createForm()
    const { getByText } = render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(12)}
        expandText="More"
        collapseText="Less"
        gridProps={{ maxColumns: 2, maxWidth: 160 }}
      />
    ))

    await expect.element(getByText('More')).toBeInTheDocument()

    await getByText('More').click()
    await expect.element(getByText('Less')).toBeInTheDocument()
    await getByText('Less').click()
    await expect.element(getByText('More')).toBeInTheDocument()
  })

  it('should support custom actions slot content', async () => {
    const form = createForm()
    const { container, getByText } = render(() => (
      <QueryForm form={form} schema={createInputSchema(2)} submitText="Search" resetText="Reset">
        {{
          actions: () => <button type="button">Custom Action</button>,
        }}
      </QueryForm>
    ))

    await expect.element(getByText('Custom Action')).toBeInTheDocument()
    expect(container.textContent ?? '').not.toContain('Search')
    expect(container.textContent ?? '').not.toContain('Reset')
  })

  it('should support custom collapse slot content', async () => {
    const form = createForm()
    const { container, getByText } = render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(12)}
        expandText="Default Expand"
        collapseText="Default Collapse"
        gridProps={{ maxColumns: 2, maxWidth: 160 }}
      >
        {{
          collapse: ({ expanded, toggle }) => <button type="button" onClick={toggle}>{expanded ? 'Custom Less' : 'Custom More'}</button>,
        }}
      </QueryForm>
    ))

    await expect.element(getByText('Custom More')).toBeInTheDocument()
    expect(container.textContent ?? '').not.toContain('Default Expand')

    await getByText('Custom More').click()
    await expect.element(getByText('Custom Less')).toBeInTheDocument()
    expect(container.textContent ?? '').not.toContain('Default Collapse')
  })

  it('should render collapse text by default when defaultExpanded is enabled', async () => {
    const form = createForm()
    const { container, getByText } = render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(12)}
        expandText="More"
        collapseText="Less"
        gridProps={{ maxColumns: 2, maxWidth: 160 }}
        defaultExpanded={true}
      />
    ))

    await expect.element(getByText('Less')).toBeInTheDocument()
    expect(container.textContent ?? '').not.toContain('More')
  })

  it('should hide toggle and render all fields when showToggle is false', async () => {
    const form = createForm()
    const { container } = render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(12)}
        showToggle={false}
        expandText="More"
        collapseText="Less"
        gridProps={{ maxColumns: 2, maxWidth: 160 }}
      />
    ))

    await vi.waitFor(() => {
      expect(container.querySelectorAll('input')).toHaveLength(12)
    })
    expect(container.textContent ?? '').not.toContain('More')
    expect(container.textContent ?? '').not.toContain('Less')
  })

  it('should apply row-end class when actionsAtRowEnd is enabled', async () => {
    const form = createForm()
    const { container } = render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(2)}
        actionsAtRowEnd={true}
      />
    ))

    await vi.waitFor(() => {
      expect(container.querySelector('.formily-element-plus-query-form__actions--row-end')).not.toBeNull()
    })
  })

  it('should fallback to index-based actions node detection when node.element is missing', async () => {
    const form = createForm()
    let mutated = false
    const { getByText } = render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(12)}
        expandText="More"
        collapseText="Less"
        gridProps={{ maxColumns: 2, maxWidth: 160 }}
        visibleWhen={(context) => {
          if (!mutated) {
            for (const node of context.grid.children ?? []) {
              ;(node as any).element = undefined
            }
            mutated = true
          }
          if (!context.collapsed)
            return true
          return context.index === 0
        }}
      />
    ))

    await expect.element(getByText('More')).toBeInTheDocument()
    await getByText('More').click()
    await expect.element(getByText('Less')).toBeInTheDocument()
  })

  it('should render with custom schemaField', async () => {
    const form = createForm()
    const CustomSchemaField = defineComponent({
      name: 'CustomSchemaField',
      props: {
        schema: {
          type: Object,
          required: true,
        },
      },
      setup(props) {
        return () => h('div', { 'data-testid': 'custom-schema-field' }, Object.keys((props.schema as any).properties ?? {}).length)
      },
    })

    const { container } = render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(3)}
        schemaField={CustomSchemaField}
      />
    ))

    await vi.waitFor(() => {
      expect(container.querySelector('[data-testid="custom-schema-field"]')).not.toBeNull()
    })
  })

  it('should call visibleWhen with schema from mapProperties schema object', async () => {
    const form = createForm()
    const visibleWhen = vi.fn(() => true)
    const schemaWithMapProperties = {
      type: 'object',
      properties: {
        field1: {
          'type': 'string',
          'title': 'Field 1',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        field2: {
          'type': 'string',
          'title': 'Field 2',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
      mapProperties(callback: (childSchema: ISchema, name: string) => void) {
        for (const [name, childSchema] of Object.entries(this.properties)) {
          callback(childSchema as ISchema, name)
        }
      },
    } as unknown as ISchema

    render(() => (
      <QueryForm
        form={form}
        schema={schemaWithMapProperties}
        visibleWhen={visibleWhen}
      />
    ))

    await vi.waitFor(() => {
      expect(visibleWhen).toHaveBeenCalled()
    })
  })

  it('should not force default maxColumns when minColumns is provided', async () => {
    const form = createForm()
    const visibleWhen = vi.fn<(context: QueryFormVisibleContext) => boolean>(() => true)

    render(() => (
      <QueryForm
        form={form}
        schema={createInputSchema(2)}
        gridProps={{ minColumns: 2 }}
        visibleWhen={visibleWhen}
      />
    ))

    await vi.waitFor(() => {
      expect(visibleWhen).toHaveBeenCalled()
    })

    const [context] = visibleWhen.mock.calls[0]!
    expect(context.grid.minColumns).toBe(2)
    expect(context.grid.maxColumns).not.toBe(4)
  })

  it('should render without schema and without default slot', async () => {
    const form = createForm()
    const { container, getByRole } = render(() => (
      <QueryForm form={form} />
    ))

    await expect.element(getByRole('button', { name: '查询' })).toBeInTheDocument()
    await expect.element(getByRole('button', { name: '重置' })).toBeInTheDocument()
    expect(container.querySelectorAll('input')).toHaveLength(0)
  })

  it('should auto submit on value change in Light mode', async () => {
    const form = createForm()
    const onAutoSubmit = vi.fn()

    const { getByRole } = render(() => (
      <QueryForm.Light
        form={form}
        schema={createInputSchema(1)}
        throttleWait={0}
        onAutoSubmit={onAutoSubmit}
      />
    ))

    await getByRole('textbox').fill('hello')

    await vi.waitFor(() => {
      expect(onAutoSubmit).toHaveBeenCalled()
    })
    expect(onAutoSubmit.mock.calls.at(-1)?.[0]).toMatchObject({ field1: 'hello' })
  })

  it('should auto submit in Light mode when throttleWait is greater than 0', async () => {
    vi.useFakeTimers()
    const form = createForm()
    const onAutoSubmit = vi.fn()

    const { getByRole } = render(() => (
      <QueryForm.Light
        form={form}
        schema={createInputSchema(1)}
        throttleWait={120}
        onAutoSubmit={onAutoSubmit}
      />
    ))

    await getByRole('textbox').fill('delayed')
    expect(onAutoSubmit).not.toHaveBeenCalled()

    vi.advanceTimersByTime(130)
    await vi.waitFor(() => {
      expect(onAutoSubmit).toHaveBeenCalled()
    })
    vi.useRealTimers()
  })

  it('should trigger autoSubmitFailed in Light mode when form validation fails', async () => {
    const form = createForm()
    const onAutoSubmitFailed = vi.fn()

    const { getByRole } = render(() => (
      <QueryForm.Light
        form={form}
        schema={{
          type: 'object',
          properties: {
            field1: {
              'type': 'string',
              'title': 'Field 1',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        }}
        throttleWait={0}
        onAutoSubmitFailed={onAutoSubmitFailed}
      />
    ))

    const input = getByRole('textbox')
    await input.fill('hello')
    await input.fill('')

    await vi.waitFor(() => {
      expect(onAutoSubmitFailed).toHaveBeenCalled()
    })
  })

  it('should render default slot content in Light mode with higher priority than schema', async () => {
    const form = createForm()
    const { container } = render(() => (
      <QueryForm.Light form={form} schema={createInputSchema(2)}>
        <div data-testid="light-custom-content">light-custom-content</div>
      </QueryForm.Light>
    ))

    await vi.waitFor(() => {
      expect(container.querySelector('[data-testid="light-custom-content"]')).not.toBeNull()
    })
    expect(container.querySelectorAll('input')).toHaveLength(0)
  })

  it('should render with custom schemaField in Light mode', async () => {
    const form = createForm()
    const CustomSchemaField = defineComponent({
      name: 'CustomLightSchemaField',
      props: {
        schema: {
          type: Object,
          required: true,
        },
      },
      setup(props) {
        return () => h('div', { 'data-testid': 'custom-light-schema-field' }, Object.keys((props.schema as any).properties ?? {}).length)
      },
    })

    const { container } = render(() => (
      <QueryForm.Light
        form={form}
        schema={createInputSchema(3)}
        schemaField={CustomSchemaField}
      />
    ))

    await vi.waitFor(() => {
      expect(container.querySelector('[data-testid="custom-light-schema-field"]')).not.toBeNull()
    })
  })

  it('should render Light mode without schema', async () => {
    const form = createForm()
    const { container } = render(() => (
      <QueryForm.Light form={form} />
    ))

    expect(container.querySelectorAll('input')).toHaveLength(0)
  })

  it('should render Light mode safely without form instance', async () => {
    const onAutoSubmit = vi.fn()
    const { container } = render(() => (
      <QueryForm.Light
        schema={createInputSchema(1)}
        throttleWait={0}
        onAutoSubmit={onAutoSubmit}
      />
    ))

    expect(container.querySelectorAll('input')).toHaveLength(0)
    expect(onAutoSubmit).not.toHaveBeenCalled()
  })
})

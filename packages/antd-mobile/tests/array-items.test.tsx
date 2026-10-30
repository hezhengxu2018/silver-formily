import type { ISchema } from '@silver-formily/json-schema'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider, observer } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { ArrayItems, FormItem, FormLayout, Input } from '../src'

afterEach(cleanup)

const Header = observer(() => {
  return (
    <span>
      联系人
      {ArrayItems.useIndex() + 1}
      :
      {String((ArrayItems.useRecord() as { name?: string })?.name ?? '')}
    </span>
  )
})

function Operations() {
  return (
    <>
      <ArrayItems.MoveUp aria-label="上移" />
      <ArrayItems.MoveDown aria-label="下移" />
      <ArrayItems.Remove aria-label="删除" />
    </>
  )
}

const SchemaField = createSchemaField({ components: { ArrayItems, FormItem, Input } })
const itemLayout: ISchema = {
  'type': 'void',
  'x-component': 'ArrayItems.Item',
  'x-component-props': { title: <Header />, extra: <Operations /> },
  'properties': {
    name: { 'type': 'string', 'required': true, 'title': '姓名', 'x-decorator': 'FormItem', 'x-component': 'Input', 'x-component-props': { placeholder: '姓名' } },
  },
}

const objectItem: ISchema = { type: 'object', properties: { item: itemLayout } }

async function mount(options: { values?: unknown[], items?: ISchema | ISchema[], pattern?: 'editable' | 'disabled' | 'readOnly', props?: object } = {}) {
  const form = createForm({ initialValues: { contacts: options.values ?? [] }, pattern: options.pattern })
  const screen = await render(
    <FormProvider form={form}>
      <FormLayout layout="vertical" labelWidth={90}>
        <SchemaField schema={{
          type: 'object',
          properties: {
            contacts: {
              'type': 'array',
              'x-component': 'ArrayItems',
              'x-component-props': options.props,
              'items': options.items ?? objectItem,
              'properties': {
                add: { 'type': 'void', 'title': '新增', 'x-component': 'ArrayItems.Addition', 'x-component-props': { defaultValue: { name: '张三' } } },
              },
            },
          },
        }}
        />
      </FormLayout>
    </FormProvider>,
  )
  return { form, ...screen }
}

it('renders one addition for an empty array and independently clones defaults', async () => {
  const { form, getByRole, container } = await mount({ props: { 'data-testid': 'array', 'value': ['ignored'], 'onChange': vi.fn() } })
  expect(container.querySelectorAll('button')).toHaveLength(1)
  expect(container.querySelector('[data-testid="array"]')?.hasAttribute('value')).toBe(false)
  await getByRole('button', { name: '新增' }).click()
  await getByRole('button', { name: '新增' }).click()
  await getByRole('textbox').nth(0).fill('李四')
  expect(form.values.contacts).toEqual([{ name: '李四' }, { name: '张三' }])
  await expect.element(getByRole('button', { name: '新增' })).toBeVisible()
  expect(container.querySelectorAll('.adm-formily-array-items-header')).toHaveLength(2)
  expect(container.querySelectorAll('.adm-formily-item-layout-vertical')).toHaveLength(2)
})

it('moves and removes values and keeps subsequent edits at the correct index', async () => {
  const onMoveDown = vi.fn()
  const onMoveUp = vi.fn()
  const onRemove = vi.fn()
  const { form, getByLabelText, getByRole, getByText } = await mount({ values: [{ name: '甲' }, { name: '甲' }, { name: '乙' }], props: { onMoveDown, onMoveUp, onRemove } })
  await getByRole('textbox').nth(1).fill('丙')
  await getByLabelText('下移', { exact: true }).nth(1).click()
  expect(form.values.contacts).toEqual([{ name: '甲' }, { name: '乙' }, { name: '丙' }])
  await getByLabelText('上移', { exact: true }).nth(1).click()
  await getByLabelText('删除', { exact: true }).nth(0).click()
  await getByRole('textbox').nth(0).fill('丁')
  expect(form.values.contacts).toEqual([{ name: '丁' }, { name: '乙' }])
  await expect.element(getByText('联系人1:丁')).toBeVisible()
  expect(onMoveDown).toHaveBeenCalledWith(1)
  expect(onMoveUp).toHaveBeenCalledWith(2)
  expect(onRemove).toHaveBeenCalledWith(0)
})

it('supports primitive tuples with first-schema fallback and headerless default items', async () => {
  const primitive = (placeholder: string): ISchema => ({
    'type': 'void',
    'x-component': 'ArrayItems.Item',
    'x-component-props': { mode: 'default' },
    'properties': {
      input: {
        'type': 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': { placeholder },
      },
    },
  })
  const { container, getByPlaceholder, form } = await mount({ values: ['a', 'b', 'c'], items: [primitive('first'), primitive('second')] })
  expect(container.querySelectorAll('.adm-formily-array-items-item-default')).toHaveLength(3)
  expect(container.querySelectorAll('.adm-formily-array-items-header')).toHaveLength(0)
  await getByPlaceholder('first').nth(1).fill('changed')
  await getByPlaceholder('second').fill('two')
  expect(form.values.contacts).toEqual(['a', 'two', 'changed'])
})

it('validates required item fields and clears removed-field errors', async () => {
  const { form, getByLabelText } = await mount({ values: [{ name: '' }, { name: '有效' }] })
  await expect(form.validate()).rejects.toBeDefined()
  expect(form.errors).toHaveLength(1)
  await getByLabelText('删除', { exact: true }).nth(0).click()
  await expect(form.validate()).resolves.toBeUndefined()
  expect(form.errors).toHaveLength(0)
})

it('inherits disabled and readOnly patterns', async () => {
  const disabled = await mount({ values: [{ name: '甲' }], pattern: 'disabled' })
  await expect.element(disabled.getByRole('button', { name: '新增' })).toBeDisabled()
  expect(disabled.container.querySelector('[aria-label="删除"]')).toBeNull()
  await cleanup()
  const readonly = await mount({ values: [{ name: '甲' }], pattern: 'readOnly' })
  expect(readonly.container.querySelector('button')).toBeNull()
  expect(readonly.container.querySelector('[aria-label="删除"]')).toBeNull()
})

it('isolates nested array operations and record scopes', async () => {
  const nested: ISchema = {
    type: 'object',
    properties: {
      item: {
        ...itemLayout,
        properties: {
          ...(itemLayout.properties as Record<string, ISchema>),
          children: {
            'type': 'array',
            'x-component': 'ArrayItems',
            'items': objectItem,
            'properties': {
              add: { 'type': 'void', 'title': '添加子项', 'x-component': 'ArrayItems.Addition', 'x-component-props': { defaultValue: { name: '子' } } },
            },
          },
        },
      },
    },
  }
  const { form, getByRole, getByText, getByLabelText } = await mount({ values: [{ name: '父', children: [] }], items: nested })
  await getByRole('button', { name: '添加子项' }).click()
  await expect.element(getByText('联系人1:子')).toBeVisible()
  await expect.element(getByText('联系人1:父')).toBeVisible()
  await getByLabelText('删除', { exact: true }).nth(1).click()
  expect(form.values.contacts).toEqual([{ name: '父', children: [] }])
})

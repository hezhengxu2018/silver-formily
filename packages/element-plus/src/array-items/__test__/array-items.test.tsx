import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent } from 'vue'
import { ArrayItems, DatePicker, FormItem, Input, Select, Space } from '../../index'
import 'element-plus/theme-chalk/index.css'

// 字符串数组测试组件
export function ArrayItemsStringTestFactory(form = createForm()) {
  return defineComponent({
    name: 'ArrayItemsStringTest',
    setup() {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Space,
          Input,
          ArrayItems,
        },
      })

      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'x-component': 'ArrayItems',
            'x-decorator': 'FormItem',
            'title': '字符串数组',
            'items': {
              'type': 'void',
              'x-component': 'Space',
              'properties': {
                sort: {
                  'type': 'void',
                  'x-decorator': 'FormItem',
                  'x-component': 'ArrayItems.SortHandle',
                },
                input: {
                  'type': 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
                moveUp: {
                  'type': 'void',
                  'x-decorator': 'FormItem',
                  'x-component': 'ArrayItems.MoveUp',
                },
                moveDown: {
                  'type': 'void',
                  'x-decorator': 'FormItem',
                  'x-component': 'ArrayItems.MoveDown',
                },
                remove: {
                  'type': 'void',
                  'x-decorator': 'FormItem',
                  'x-component': 'ArrayItems.Remove',
                },
              },
            },
            'properties': {
              add: {
                'type': 'void',
                'title': '添加条目',
                'x-component': 'ArrayItems.Addition',
              },
            },
          },
        },
      }

      return () => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      )
    },
  })
}

function ArrayItemsWithArrayItemsTestFactory(form = createForm()) {
  return defineComponent({
    name: 'ArrayItemsWithArrayItemsTest',
    setup() {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Space,
          Input,
          Select,
          DatePicker,
          ArrayItems,
        },
      })

      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'x-component': 'ArrayItems',
            'x-decorator': 'FormItem',
            'title': '字符串数组',
            'items': [
              {
                'type': 'void',
                'x-component': 'Space',
                'properties': {
                  sort: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.SortHandle',
                  },
                  input: {
                    'type': 'string',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-component-props': {
                      placeholder: '输入字符串',
                    },
                  },
                  remove: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Remove',
                  },
                },
              },
              {
                'type': 'void',
                'x-component': 'Space',
                'properties': {
                  sort: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.SortHandle',
                  },
                  input: {
                    'type': 'string',
                    'x-decorator': 'FormItem',
                    'x-component': 'DatePicker',
                    'x-component-props': {
                      placeholder: '选择日期',
                    },
                  },
                  remove: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Remove',
                  },
                },
              },
            ],
            'properties': {
              add: {
                'type': 'void',
                'title': '添加条目',
                'x-component': 'ArrayItems.Addition',
              },
            },
          },
        },
      }

      return () => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      )
    },
  })
}

// 对象数组测试组件
export const ArrayItemsObjectTest = defineComponent({
  name: 'ArrayItemsObjectTest',
  setup() {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        Space,
        Input,
        Select,
        DatePicker,
        ArrayItems,
      },
    })

    const form = createForm()
    const schema = {
      type: 'object',
      properties: {
        array: {
          'type': 'array',
          'x-component': 'ArrayItems',
          'x-decorator': 'FormItem',
          'title': '对象数组',
          'items': {
            type: 'object',
            properties: {
              space: {
                'type': 'void',
                'x-component': 'Space',
                'properties': {
                  sort: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.SortHandle',
                  },
                  input: {
                    'type': 'string',
                    'title': '输入框',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                  moveUp: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.MoveUp',
                  },
                  moveDown: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.MoveDown',
                  },
                  remove: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Remove',
                  },
                },
              },
            },
          },
          'properties': {
            add: {
              'type': 'void',
              'title': '添加条目',
              'x-component': 'ArrayItems.Addition',
            },
          },
        },
      },
    }

    return () => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    )
  },
})

// 使用ArrayItems.Item的测试组件
export const ArrayItemsWithItemTest = defineComponent({
  name: 'ArrayItemsWithItemTest',
  setup() {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        Space,
        Input,
        ArrayItems,
      },
    })

    const form = createForm()
    const schema = {
      type: 'object',
      properties: {
        array2: {
          'type': 'array',
          'x-component': 'ArrayItems',
          'x-decorator': 'FormItem',
          'x-component-props': { style: { width: '600px' } },
          'title': '对象数组',
          'items': {
            'type': 'object',
            'x-decorator': 'ArrayItems.Item',
            'x-decorator-props': {
              type: 'card',
            },
            'properties': {
              space: {
                'type': 'void',
                'x-component': 'Space',
                'properties': {
                  sort: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.SortHandle',
                  },
                  input: {
                    'type': 'string',
                    'title': '输入框',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                  remove: {
                    'type': 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Remove',
                  },
                },
              },
            },
          },
          'properties': {
            add: {
              'type': 'void',
              'title': '添加条目',
              'x-component': 'ArrayItems.Addition',
            },
          },
        },
      },
    }

    return () => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    )
  },
})

describe('arrayItems', async () => {
  it('应该支持字符串数组渲染', async () => {
    const screen = render(ArrayItemsStringTestFactory())
    await expect.element(screen.getByText('字符串数组')).toBeInTheDocument()
    await expect.element(screen.getByText('添加条目')).toBeInTheDocument()
  })

  it('应该支持对象数组渲染', async () => {
    const screen = render(ArrayItemsObjectTest)
    await expect.element(screen.getByText('对象数组')).toBeInTheDocument()
    await expect.element(screen.getByText('添加条目')).toBeInTheDocument()
  })

  it('应该支持使用ArrayItems.Item渲染', async () => {
    const screen = render(ArrayItemsWithItemTest)
    await expect.element(screen.getByText('对象数组')).toBeInTheDocument()
    await expect.element(screen.getByText('添加条目')).toBeInTheDocument()
  })

  it('应该按顺序渲染不同控件，在items为数组时', async () => {
    const form = createForm({
      initialValues: {
        string_array: ['', ''],
      },
    })
    const screen = render(ArrayItemsWithArrayItemsTestFactory(form))

    await expect.element(screen.getByPlaceholder('输入字符串')).toBeInTheDocument()
    await expect.element(screen.getByPlaceholder('选择日期')).toBeInTheDocument()
    await screen.getByText('添加条目').click()
    expect(screen.getByPlaceholder('输入字符串').elements()).toHaveLength(2)
  })

  it('应该支持添加条目功能', async () => {
    const screen = render(ArrayItemsStringTestFactory())
    await screen.getByText('添加条目').click()
    // 添加后应该有一个输入框
    await expect.element(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('应该支持添加多个条目', async () => {
    const screen = render(ArrayItemsObjectTest)
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    // 检查是否有3个输入框
    const inputs = screen.getByRole('textbox')
    expect(inputs.elements()).toHaveLength(3)
  })

  it('应该支持删除条目功能', async () => {
    const screen = render(ArrayItemsStringTestFactory())
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    // 应该有2个输入框
    let inputs = screen.getByRole('textbox')
    expect(inputs.elements()).toHaveLength(2)

    // 点击第一个删除按钮
    const removeButtons = screen.getByRole('button', { name: /移除条目/ })
    await removeButtons.nth(0).click()

    // 应该只剩1个输入框
    inputs = screen.getByRole('textbox')
    expect(inputs.elements()).toHaveLength(1)
  })

  it('应该支持对象的上移下移功能', async () => {
    const screen = render(ArrayItemsObjectTest)
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    // 在第一个输入框中输入值
    const inputs = screen.getByRole('textbox')
    await inputs.nth(0).fill('第一项')
    await inputs.nth(1).fill('第二项')

    // 点击下移按钮
    const moveDownButtons = screen.getByRole('button', { name: /下移/ })
    await moveDownButtons.nth(0).click()

    // 验证顺序已经改变
    const updatedInputs = screen.getByRole('textbox')
    await expect.element(updatedInputs.nth(0)).toHaveValue('第二项')
    await expect.element(updatedInputs.nth(1)).toHaveValue('第一项')

    // 点击上移按钮
    const moveUpButtons = screen.getByRole('button', { name: /上移/ })
    await moveUpButtons.nth(1).click()

    const inputs2 = screen.getByRole('textbox')
    await inputs2.nth(0).fill('第一项')
    await inputs2.nth(1).fill('第二项')
  })

  it('应该支持数组的上移下移功能', async () => {
    const screen = render(ArrayItemsStringTestFactory())
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    // 在第一个输入框中输入值
    const inputs = screen.getByRole('textbox')
    await inputs.nth(0).fill('第一项')
    await inputs.nth(1).fill('第二项')

    // 点击下移按钮
    const moveDownButtons = screen.getByRole('button', { name: /下移/ })
    await moveDownButtons.nth(0).click()

    // 验证顺序已经改变
    const updatedInputs = screen.getByRole('textbox')
    await expect.element(updatedInputs.nth(0)).toHaveValue('第二项')
    await expect.element(updatedInputs.nth(1)).toHaveValue('第一项')

    // 点击上移按钮
    const moveUpButtons = screen.getByRole('button', { name: /上移/ })
    await moveUpButtons.nth(1).click()

    const inputs2 = screen.getByRole('textbox')
    await inputs2.nth(0).fill('第一项')
    await inputs2.nth(1).fill('第二项')
  })

  it('应该支持拖拽功能', async () => {
    const form = createForm({
      initialValues: {
        string_array: ['第一项', '第二项', '第三项'],
      },
    })
    const screen = render(ArrayItemsStringTestFactory(form))

    await vi.waitFor(() => {
      expect(form.values.string_array).toEqual(['第一项', '第二项', '第三项'])
    })
    const moveBottons = screen.getByLabelText('拖拽排序')

    await moveBottons.nth(0).dropTo(moveBottons.nth(2))

    // 验证拖拽后数据顺序是否正确
    expect(form.values.string_array).toEqual(['第二项', '第三项', '第一项'])

    await vi.waitFor(() => {
      expect(form.values.string_array).toEqual(['第二项', '第三项', '第一项'])
    })
  })

  it('应该支持不同类型的ArrayItems.Item渲染', async () => {
    const screen = render(ArrayItemsWithItemTest)
    await screen.getByText('添加条目').click()
    const cardItem = screen.container.querySelector('.formily-element-plus-array-items-card')
    expect(cardItem).toBeInTheDocument()
  })
})
